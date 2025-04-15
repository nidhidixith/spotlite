from django.contrib.auth.models import User
from django.db.models import Q
from django.shortcuts import render
from django.shortcuts import get_object_or_404

from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError


from .models import Post, Likes, Comments,  PostMedia
from connections.models import UserRelation
from notifications.models import Notification
from notifications.models import PushToken
from .serializers import PostsSerializer, LikeSerializer, CommentSerializer,  PostMediaSerializer, PostsSerializerWeb
from .utils import send_push_notification
from rest_framework.pagination import PageNumberPagination

class StandardResultsPagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'page_size'
    max_page_size = 50

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_posts(request):
    current_user = request.user
    
    # Get the posts of followings of the current_user 
    try:
        followees = UserRelation.objects.filter(follower=current_user).values_list('following', flat=True)
        # posts = Post.objects.filter(user__id__in=followees)

        #Need to implement showing only latest posts i.e posts from within a week
        posts = Post.objects.filter(user__id__in=followees).order_by('-created_at')


        paginator = StandardResultsPagination()
        paginated_posts = paginator.paginate_queryset(posts, request)
        print("Paginated posts: ",paginated_posts)
        p_serializer = PostsSerializer(paginated_posts, many=True, context={'request': request})
        paginated_response = paginator.get_paginated_response(p_serializer.data)
    
        # Print the paginated response (for debugging purposes)
        print("Paginated response data:", paginated_response.data)
        
        serializer = PostsSerializer(posts,many=True,context={'request': request})

        return paginator.get_paginated_response(p_serializer.data)
    except Exception as e:
        return Response({"error": "An unexpected error occurred."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_posts(request):

    # Get the posts of current_user
    posts = Post.objects.filter(user=request.user).order_by('-created_at')
    paginator = StandardResultsPagination()
    paginated_posts = paginator.paginate_queryset(posts, request)

    serializer = PostsSerializer(paginated_posts,many=True,context={'request': request})
    return paginator.get_paginated_response(serializer.data)
    # return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_other_user_posts(request, userId):

    # Get the posts of any user
    # user = User.objects.get(id=userId)
    # Retrieve the user or return a 404 error if not found
    user = get_object_or_404(User, id=userId)
    # posts = Post.objects.filter(user=user)
    posts = Post.objects.filter(user=user).select_related('user').order_by('-created_at')  # Example of select_related for optimizing queries

    paginator = StandardResultsPagination()
    paginated_posts = paginator.paginate_queryset(posts, request)
    serializer = PostsSerializer(paginated_posts,many=True,context={'request': request})
    return paginator.get_paginated_response(serializer.data)
    # return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_latest_post(request, userId):
    user = get_object_or_404(User, id=userId)
    
    # Get the latest post by ordering in descending order of created_at
    latest_post = Post.objects.filter(user=user).select_related('user').order_by('-created_at').first()

    if latest_post:
        serializer = PostsSerializerWeb(latest_post, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'No posts found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def add_post(request):
    if request.method == 'POST':
        serializer = PostsSerializer(data=request.data, context={'request': request}, partial=True)
        
        # Check if the serializer is valid
        if serializer.is_valid():
            try:
                # Save the post instance, associating it with the authenticated user
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except ValidationError as e:
                # Return any validation errors that occur during saving
                return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # Return serializer validation errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def like_post(request, postId):
    current_user = request.user

    # Get the post to which like needs to be created
    try:
        post = Post.objects.get(id=postId)
    except Post.DoesNotExist:
        return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        # Check if the user already liked the post
        if Likes.objects.filter(user=current_user, post=post).exists():
            return Response({"error": "Post already liked."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create a new like
        try:
            Likes.objects.create(user=current_user, post=post)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Serialize post data for response
        serializer = PostsSerializer(post, context={'request': request})


        # Create notification only if the user is not the post owner
        if current_user != post.user:
            notification = Notification.objects.create(
                user=post.user,
                sender=current_user,
                message="liked your post",
                type="like",
                post=post,
            )
        
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    elif request.method == 'DELETE':
        # Check if the like exists
        like = Likes.objects.filter(user=current_user, post=post).first()
        if like:
            like.delete()
        else:
            return Response({"error": "Like not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = PostsSerializer(post, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response({"error": "Invalid request method."}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_likes(request, postId):
    likes = None  # Initialize likes variable
    
    # Get the post
    try:
        post = Post.objects.get(id=postId)
    except Post.DoesNotExist:
        return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

    likes = Likes.objects.filter(post=post)
    
    if likes is not None:    
        serializer = LikeSerializer(likes, many=True ,context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response({"error": "Error fetching likes."},status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request, postId):
    current_user = request.user
    data=request.data

    # Get the post
    try:
        post = Post.objects.get(id=postId)
    except Post.DoesNotExist:
        return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

    # Add comment to the post using serializer
    if request.method == 'POST':
        serializer = CommentSerializer(data=data, partial=True,context={'request': request})
        if serializer.is_valid():
            try:
                serializer.save(user=current_user, post=post)
                post_serializer = PostsSerializer(post, context={'request': request})

                 # Create notification only if the user is not the post owner
                if current_user != post.user:
                    notification = Notification.objects.create(
                        user=post.user,
                        sender=current_user,
                        # message=f"{current_user.userprofile.display_name} liked your post",
                        message="commented on your post",
                        type="comment",
                        post=post,
                    )
                return Response(post_serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"error": "Failed to save comment."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({"error": "Invalid request method."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_comments(request, postId):
    comments = None

    try:
        post = Post.objects.get(id=postId)
    except Post.DoesNotExist:
        return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

    comments = Comments.objects.filter(post=post).order_by('-created_at')
    
    if comments:    
        serializer = CommentSerializer(comments, many=True,context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response({"error": "Error fetching comments."},status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_post(request, postId):
    try:
        post = Post.objects.get(id=postId)
    except Post.DoesNotExist:
        return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = PostsSerializer(post, context={'request': request})
    print(serializer.data)
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_post(request, postId):
    try:
        # Fetch the post
        post = Post.objects.get(id=postId)
    except Post.DoesNotExist:
        # Return 404 if the post does not exist
        return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)
    
    # Ensure that the authenticated user is the owner of the post
    if post.user != request.user:
        return Response({"error": "You do not have permission to delete this post."}, status=status.HTTP_403_FORBIDDEN)
    
    # Delete the post
    post.delete()
    return Response({"message": "Post deleted successfully."}, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_post_comment(request):
    postId = request.query_params.get('postId')
    commentId = request.query_params.get('commentId')
    try:
        # Fetch the post to ensure it exists
        post = Post.objects.get(id=postId)
    except Post.DoesNotExist:
        return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        # Fetch the comment to ensure it exists
        comment = Comments.objects.get(id=commentId, post=post)
    except Comment.DoesNotExist:
        return Response({"error": "Comment not found."}, status=status.HTTP_404_NOT_FOUND)
    
    # Ensure the authenticated user is the owner of the comment or the post
    if comment.user != request.user and post.user != request.user:
        return Response({"error": "You do not have permission to delete this comment."}, status=status.HTTP_403_FORBIDDEN)
    
    # Delete the comment
    comment.delete()
    return Response({"message": "Comment deleted successfully."}, status=status.HTTP_200_OK)


