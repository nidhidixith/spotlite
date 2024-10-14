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
# from .models import UserProfile, UserRelationships
# from .serializers import UserProfileSerializer, FollowersSerializer, FollowingSerializer
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def success(request):
   return JsonResponse('Success',safe=False)