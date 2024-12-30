from django.contrib.auth.models import User
from django.db.models import Q
from django.shortcuts import render
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .models import Post, Likes, Comments,  PostMedia
from connections.models import UserRelation
from notifications.models import Notification
from notifications.models import PushToken
from .serializers import PostsSerializer, LikeSerializer, CommentSerializer,  PostMediaSerializer
from .utils import send_push_notification

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_posts(request):
    current_user = request.user
    # print("Request user:")
    # print(request.user)
    followees = UserRelation.objects.filter(follower=current_user).values_list('following', flat=True)
    posts = Post.objects.filter(user__id__in=followees)
    # posts = Post.objects.exclude(user=request.user)
    # print(posts)
    serializer = PostsSerializer(posts,many=True,context={'request': request})
    # print("2")
    print(serializer)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_posts(request):
    # print("Request user:")
    # print(request.user)
    posts = Post.objects.filter(user=request.user)
    # posts = Post.objects.filter(Q(user=request.user) | Q(tagged_users=request.user)).distinct()
    # print(posts)
    serializer = PostsSerializer(posts,many=True,context={'request': request})
    # print("2")
    print(serializer)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_other_user_posts(request, userId):
    # print("Request user:")
    # print(request.user)
    user = User.objects.get(id=userId)
    posts = Post.objects.filter(user=user)
    # posts = Post.objects.filter(Q(user=user) | Q(tagged_users=user)).distinct()
    # print(posts)
    serializer = PostsSerializer(posts,many=True,context={'request': request})
    # print("2")
    print(serializer)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def add_post(request):
    print(request.data)
    print(request.user)
    if request.method == 'POST':
        serializer = PostsSerializer(data=request.data, context={'request': request}, partial=True)
        print("1")
        print(serializer)
        if serializer.is_valid():
            print("Validated data")
            print(serializer.validated_data)
            serializer.save(user=request.user)
            print("2")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def like_post(request, postId):
    current_user = request.user

    try:
        post = Post.objects.get(id=postId)
    except Post.DoesNotExist:
        return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        # Check if the user already liked the post
        if Likes.objects.filter(user=current_user, post=post).exists():
            return Response({"error": "Post already liked."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create a new like
        Likes.objects.create(user=current_user, post=post)
        serializer = PostsSerializer(post, context={'request': request})


        # Create notification only if the user is not the post owner
        if current_user != post.user:
            notification = Notification.objects.create(
                user=post.user,
                sender=current_user,
                # message=f"{current_user.userprofile.display_name} liked your post",
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
    
    try:
        print("1")
        post = Post.objects.get(id=postId)
        print("2")
    except Post.DoesNotExist:
        return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)
    print("2")
    likes = Likes.objects.filter(post=post)
    print("3")
    
    if likes is not None:    
        print("8")
        serializer = LikeSerializer(likes, many=True ,context={'request': request})
        print("9")
        print(serializer.data)
        print("10")
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response({"error": "Error fetching likes."},status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_comment(request, postId):
    current_user = request.user
    data=request.data
    try:
        print("1")
        post = Post.objects.get(id=postId)
        print("2")
    except Post.DoesNotExist:
        return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':
        serializer = CommentSerializer(data=data, partial=True,context={'request': request})
        print("Serializer initialized")
        if serializer.is_valid():
            print("Serializer is valid")
            try:
                serializer.save(user=current_user, post=post)
                print("Comment saved")
                post_serializer = PostsSerializer(post, context={'request': request})
                print("Post serialized")

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
                print(f"Error saving comment: {e}")
                return Response({"error": "Failed to save comment."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            print("Serializer errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({"error": "Invalid request method."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_comments(request, postId):
    comments = None
    try:
        print("1")
        post = Post.objects.get(id=postId)
        print("2")
    except Post.DoesNotExist:
        return Response({"error": "Post not found."}, status=status.HTTP_404_NOT_FOUND)
    print("2")
    comments = Comments.objects.filter(post=post)
    print("3")
    if comments:    
        print("4")
        serializer = CommentSerializer(comments, many=True,context={'request': request})
        print("5")
        print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response({"error": "Error fetching comments."},status=status.HTTP_400_BAD_REQUEST)



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