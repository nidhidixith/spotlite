from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.db.models import F

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import UserRelation
from notifications.models import Notification
from .serializers import FollowerSerializer, FollowingSerializer


# Create your views here.
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def follow_user(request, user_id):
    follower = request.user

    try:
        following = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    if follower.id == following.id:
        return Response({"error": "User cannot follow themselves."}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if the relationship already exists
    if UserRelation.objects.filter(follower=follower, following=following).exists():
        return Response({"error": "Already following this user."}, status=status.HTTP_400_BAD_REQUEST)
    
    # Create the relationship
    user_relation = UserRelation.objects.create(follower=follower, following=following)

    notification = Notification.objects.create(
        user=following,
        sender=follower,
        message="started following you",
        type="follow",
        follower_id=follower.id,
    )
    
    return Response({"message": "Successfully followed"}, status=status.HTTP_201_CREATED)
    
    

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def unfollow_user(request, user_id):
    follower = request.user

    try:
        following = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    if follower.id == following.id:
        return Response({"error": "User cannot unfollow themselves."}, status=status.HTTP_400_BAD_REQUEST)
    

    user_relation = UserRelation.objects.filter(follower=follower, following=following).first()
    if user_relation:
        # Delete the relationship
        user_relation.delete()

    return Response({"message": "Unfollowed"}, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_follower(request, user_id):
    following = request.user

    try:
        follower = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    if following.id == follower.id:
        return Response({"error": "You cannot remove yourself from your followers."}, status=status.HTTP_400_BAD_REQUEST)
    

    user_relation = UserRelation.objects.filter(follower=follower, following=following).first()

    if not user_relation:
        return Response({"error": "This user is not your follower."}, status=status.HTTP_400_BAD_REQUEST)

    # Delete the relationship
    user_relation.delete()
    return Response({"message": "Follower removed"}, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_followers_list(request):
    user = request.user
    
    user_relation = UserRelation.objects.filter(following=user)
    serializer = FollowerSerializer(user_relation, many=True,context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_following_list(request):
    user = request.user
    
    user_relation = UserRelation.objects.filter(follower=user)
    serializer = FollowingSerializer(user_relation, many=True,context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


# For Other users
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_others_followers_list(request, user_id):
    # user = User.objects.get(id=user_id)
    user = get_object_or_404(User, id=user_id)

    user_relation = UserRelation.objects.filter(following=user)
    serializer = FollowerSerializer(user_relation, many=True,context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_others_following_list(request, user_id):
    user = get_object_or_404(User, id=user_id)
    
    user_relation = UserRelation.objects.filter(follower=user)
    serializer = FollowingSerializer(user_relation, many=True,context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)