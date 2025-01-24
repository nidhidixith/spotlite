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
from rest_framework.pagination import PageNumberPagination

class StandardResultsPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 50

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notifications(request):
    
    notifications = Notification.objects.filter(user=request.user).order_by('-created_at')

    paginator = StandardResultsPagination()
    paginated_notifications = paginator.paginate_queryset(notifications, request)

    serializer = NotificationsSerializer(paginated_notifications,many=True,context={'request': request})
    
    return paginator.get_paginated_response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def save_push_token(request):
    token = request.data.get('pushToken')
    if token:
        PushToken.objects.update_or_create(user=request.user, defaults={'expo_token': token})
        return Response({'message': 'Token saved successfully!'}, status=status.HTTP_200_OK)

    return Response({'error': 'Token not provided'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def unregister_push_token(request):
    print("Unregister push token view called")
    token = request.data.get('pushToken')
    if not token:
        return Response({"error": "Push token is required"}, status=400)

    PushToken.objects.filter(expo_token=token).delete()
    return Response({"message": "Push token unregistered successfully"})

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def mark_as_read(request, notificationId):
    try:
        notification = Notification.objects.get(id=notificationId, user=request.user)
    except Notification.DoesNotExist:
        return Response({'detail': 'Notification not found.'}, status=status.HTTP_404_NOT_FOUND)

    if notification.is_read:
        return Response({'detail': 'Notification is already marked as read.'}, status=status.HTTP_400_BAD_REQUEST)
        
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


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def undelivered_notifications_count(request):
    """
    Endpoint to get the count of undelivered notifications for the logged-in user.
    """
    user = request.user  # Get the logged-in user
    undelivered_notifications = Notification.objects.filter(user=user, is_delivered=False)
    
    # Get the count of undelivered notifications
    count = undelivered_notifications.count()

    # Mark all undelivered notifications as delivered
    undelivered_notifications.update(is_delivered=True)    
    return Response({"undelivered_notifications_count": count}, status=200)


