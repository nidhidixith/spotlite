from django.contrib.auth.models import User
from django.db.models import Q
from django.shortcuts import render
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import CreateAPIView
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .models import Notification, PushToken
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


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_push_token(request):
    token = request.data.get('pushToken')
    print("Push token: ",token)
    if token:
        PushToken.objects.update_or_create(user=request.user, defaults={'expo_token': token})
        return Response({'message': 'Token saved successfully!'})
    return Response({'error': 'Token not provided'}, status=400)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def mark_as_read(request, notificationId):
    try:
        notification = Notification.objects.get(id=notificationId, user=request.user)
    except Notification.DoesNotExist:
        return Response({'detail': 'Notification not found.'}, status=status.HTTP_404_NOT_FOUND)

    # Update the 'is_read' field
    notification.is_read = True
    notification.save()

    return Response({'detail': 'Notification marked as read.'}, status=status.HTTP_200_OK)


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def mark_all_as_read(request):
    notifications = Notification.objects.filter(user=request.user, is_read=False)
    notifications.update(is_read=True)
    
    return Response({'detail': 'All notifications marked as read.'}, status=status.HTTP_200_OK)

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





