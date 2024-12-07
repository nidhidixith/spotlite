from django.contrib.auth.models import User
from django.db.models import Q
from django.shortcuts import render
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import CreateAPIView
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .models import Notification
from .serializers import NotificationsSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notifications(request):
    # print("Request user:")
    # print(request.user)
    notifications = Notification.objects.filter(user=request.user)
    # print(notifications)
    serializer = NotificationsSerializer(notifications,many=True,context={'request': request})
    # print("2")
    print(serializer)
    return Response(serializer.data)





# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# @parser_classes([MultiPartParser, FormParser])
# def add_post(request):
#     print(request.data)
#     print(request.user)
#     if request.method == 'POST':
#         serializer = PostsSerializer(data=request.data, context={'request': request}, partial=True)
#         print("1")
#         print(serializer)
#         if serializer.is_valid():
#             print("Validated data")
#             print(serializer.validated_data)
#             serializer.save(user=request.user)
#             print("2")
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         print(serializer.errors)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





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





