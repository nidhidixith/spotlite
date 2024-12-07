from django.contrib.auth.models import User
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .models import UserProfile, UserRelationships
from .serializers import UserProfileSerializer, FollowersSerializer, FollowingSerializer
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db.models import F

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    print("1")
    # Extract username,password from request data
    username = request.data.get('username')
    password = request.data.get('password')

    print("2")
    # Check if username already exists
    if User.objects.filter(username=username).exists():
      print('Username already exists')
      return Response({'error':'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    print("3")
    # Create user with hashed password
    user = User.objects.create_user(username=username, password=password)

    user = authenticate(username=username, password=password)

    print("4")

    token_obtain_pair_view = TokenObtainPairView.as_view()
    print(token_obtain_pair_view(request._request))
    return token_obtain_pair_view(request._request)
    
    
@api_view(['POST'])
def logout_user(request):
    if 'refresh_token' not in request.data:
        return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)
    print("1 logout")
    refresh_token = request.data['refresh_token']
    
    try:
        print("2 logout")
        token = RefreshToken(refresh_token)
        print("3 logout")
        token.blacklist()  # Blacklist the refresh token
        print("4 logout")
        return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
    except Exception as e:
        print("5 logout")
        print('Error',str(e))
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_user_profile(request):
    print("Request received in complete_user_profile view.")
    user = request.user
    user_profile, created = UserProfile.objects.get_or_create(user=user)

    # Use the serializer to update the user profile fields
    serializer = UserProfileSerializer(user_profile, data=request.data, partial=True,context={'request': request})
    print("Serializer is")
    print(serializer)
    # Validate and save the serializer
    if serializer.is_valid():
        serializer.save()
        print("Profile completion successful")
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        print("Error in Profile completion")
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    user_profile = UserProfile.objects.get(user=request.user)
    # user_profile = get_object_or_404(UserProfile, user__id=userId)
    print(user_profile)
    serializer = UserProfileSerializer(user_profile,context={'request': request})
    print(serializer)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_other_user_profile(request, userId):
    user_profile = get_object_or_404(UserProfile, user__id=userId)
    print(user_profile)
    serializer = UserProfileSerializer(user_profile,context={'request': request})
    print(serializer)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_profile(request):
    user = request.user
    data = request.data
    user_profile = UserProfile.objects.get(user=user)

    remove_profile_pic = data.get('remove_profile_pic', False)
    serializer = UserProfileSerializer(user_profile, data=data, partial=True,context={'request': request})

    if remove_profile_pic:
        if user_profile.profile_pic:
            user_profile.profile_pic = None
            user_profile.save()
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
    if UserRelationships.objects.filter(follower=follower, following=following).exists():
        return Response({"error": "Already following this user."}, status=status.HTTP_400_BAD_REQUEST)
    
    # Create the relationship
    user_relationship = UserRelationships.objects.create(follower=follower, following=following)
    
    # serializer = UserRelationshipsSerializer(user_relationship)
    # return Response(serializer.data, status=status.HTTP_201_CREATED)
    follower_count = UserRelationships.objects.filter(following=following).count()
    following_count = UserRelationships.objects.filter(follower=following).count()
    is_following = UserRelationships.objects.filter(follower=follower, following=following).exists()
    data = {
        "id": user_id,
        "user": user_id,
        "follower_count": follower_count,
        "following_count": following_count,
        "is_following": is_following
    }

    return Response(data, status=status.HTTP_201_CREATED)


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
    
    # # Check if the relationship already exists
    # if UserRelationships.objects.filter(follower=follower, following=following).exists():
    #     return Response({"error": "Already following this user."}, status=status.HTTP_400_BAD_REQUEST)
    

    relationship = UserRelationships.objects.filter(follower=follower, following=following).first()
    if relationship:
        # Delete the relationship
        relationship.delete()

    follower_count = UserRelationships.objects.filter(following=following).count()
    following_count = UserRelationships.objects.filter(follower=following).count()
    is_following = UserRelationships.objects.filter(follower=follower, following=following).exists()
    data = {
        "id": user_id,
        "user": user_id,
        "follower_count": follower_count,
        "following_count": following_count,
        "is_following": is_following
    }

    return Response(data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def followers_following_count(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)
    
    follower_count = UserRelationships.objects.filter(following=user).count()
    following_count = UserRelationships.objects.filter(follower=user).count()
    is_following = UserRelationships.objects.filter(follower=request.user, following=user).exists()
    data = {
        "id": user_id,
        "user": user_id,
        "follower_count": follower_count,
        "following_count": following_count,
        "is_following": is_following,
    }
    
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_followers_list(request):
    user = request.user
    
    user_relationship = UserRelationships.objects.filter(following=user)
    print(user_relationship)
    # followers = followers_query.select_related('follower__userdetails')
    serializer = FollowersSerializer(user_relationship, many=True,context={'request': request})
    print(serializer.data)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_following_list(request):
    user = request.user
    
    user_relationship = UserRelationships.objects.filter(follower=user)
    print(user_relationship)
    # followers = followers_query.select_related('follower__userdetails')
    serializer = FollowingSerializer(user_relationship, many=True,context={'request': request})
    print(serializer.data)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def success(request):
   return JsonResponse('Success',safe=False)