from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.db.models import F

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .models import UserProfile
from .serializers import UserProfileSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    # Extract username,password from request data
    username = request.data.get('username')
    password = request.data.get('password')

    # Check if username already exists
    if User.objects.filter(username=username).exists():
      print('Username already exists')
      return Response({'error':'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    # Create user with hashed password
    user = User.objects.create_user(username=username, password=password)

    # Authenticate the user using built-in method
    user = authenticate(username=username, password=password)

    # Get the token pair (access and refresh token)
    token_obtain_pair_view = TokenObtainPairView.as_view()
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


