from rest_framework import permissions
from django.contrib.auth.models import User
from django.utils.timezone import now
from datetime import timedelta
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.contrib.postgres.search import SearchQuery, SearchVector

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Event, EventMedia, EventInterest
from connections.models import UserRelation
from notifications.models import Notification
from appusers.models import UserProfile
from .serializers import EventSerializer, EventMediaSerializer, EventInterestSerializer, EventSerializerWeb

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def add_event(request):
    
    if request.method == 'POST':
        serializer = EventSerializer(data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_events(request):
    user = request.user
    filter_type = request.query_params.get('filter', None)

    print("Filter:", filter)

    if filter_type == "for-you":
        # If areas_of_interest is already a list, no need to split it
        interests = user.userprofile.areas_of_interest  # Assuming it's a list like ['singing', 'dance']
        print("Interests:", interests)
    
        if len(interests) == 1 and ',' in interests[0]:
            interests = interests[0].split(',')
            
        query = Q()
        for area in interests:
            query |= (Q(event_domain__icontains=area) | 
                      Q(event_description__icontains=area) | 
                      Q(event_title__icontains=area))
        print("Final Query:", query)
        events = Event.objects.filter(query)
    
    elif filter_type == "upcoming":
        start_of_week = now().date()
        end_of_week = start_of_week + timedelta(days=7)
        print("Start of week:", start_of_week, "End of week:", end_of_week)
        events = Event.objects.filter(event_date__range=(start_of_week, end_of_week))

    elif filter_type == "by-followers":
        followers = UserRelation.objects.filter(following=user).values_list('follower', flat=True)
        events = Event.objects.filter(user__id__in=followers)

    elif filter_type == "by-following":
        following = UserRelation.objects.filter(follower=user).values_list('following', flat=True)
        events = Event.objects.filter(user__id__in=following)
        # events = Event.objects.all()

    elif filter_type == "nearby":
        current_user_location = UserProfile.objects.get(user=user).location
        search_query = SearchQuery(current_user_location)
        events = Event.objects.annotate(search=SearchVector('event_location')).filter(search=search_query)
        # events = Event.objects.filter(event_location=current_user_location)
        
    else:
        events = Event.objects.none()  # Default behavior if no filter provided

    print("Events:", events)
    serializer = EventSerializer(events, many=True, context={'request': request})
    print("Event filter Serializer: ", serializer.data)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_events(request):
    events = Event.objects.filter(user=request.user).order_by('-created_at')
    serializer = EventSerializer(events,many=True,context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_other_user_events(request, userId):
    user = get_object_or_404(User, id=userId)

    events = Event.objects.filter(user=user).order_by('-created_at')
    serializer = EventSerializer(events,many=True,context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_latest_event(request, userId):
    user = get_object_or_404(User, id=userId)
    
    # Get the latest post by ordering in descending order of created_at
    latest_event = Event.objects.filter(user=user).select_related('user').order_by('-created_at').first()

    if latest_event:
        serializer = EventSerializerWeb(latest_event, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'No events found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_interested_events(request):
    user = request.user
    interested_event_ids = EventInterest.objects.filter(user=user).values_list('event_id', flat=True)
    events = Event.objects.filter(id__in=interested_event_ids).select_related('user').order_by('-created_at')

    serializer = EventSerializer(events,many=True,context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)

#Interested

@api_view(['POST','DELETE'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def interested_in_event(request,eventId):
    current_user = request.user
    
    try:
        event = Event.objects.get(id=eventId)
    except Event.DoesNotExist:
        return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'POST':

        # Check if the interest already exists
        if EventInterest.objects.filter(user=current_user, event=event).exists():
            return Response({"error": "Interest already exists."}, status=status.HTTP_400_BAD_REQUEST)
        
        # Create a new interest
        try:
            interested = EventInterest.objects.create(user=current_user, event=event)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        # Serialize event data for response
        serializer = EventSerializer(event, context={'request': request})

        
        # Create notification only if the user is not the post owner
        if current_user != event.user:
            notification = Notification.objects.create(
                user=event.user,
                sender=current_user,
                # message=f"{current_user.userprofile.display_name} liked your post",
                message="is interested in your event",
                type="interested",
                event=event,
            )
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    elif request.method == 'DELETE':
        interested = EventInterest.objects.filter(user=current_user, event=event).first()
        if interested:
            interested.delete()
        else:
            return Response({"error": "Interest not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = EventSerializer(event, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response({"error": "Invalid request method."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_event_interests(request, eventId):
    interests = None  # Initialize likes variable
    try:
        event = Event.objects.get(id=eventId)
    except Event.DoesNotExist:
        return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)
    
    interests = EventInterest.objects.filter(event=event)
    
    if interests is not None:    
        serializer = EventInterestSerializer(interests, many=True ,context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response({"error": "Error fetching interests"},status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_event(request, eventId):
    try:
        event = Event.objects.get(id=eventId)
    except Event.DoesNotExist:
        return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = EventSerializer(event, context={'request': request})
    print(serializer.data)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_event(request, eventId):
    try:
        event = Event.objects.get(id=eventId)
    except Event.DoesNotExist:
        return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)
    
    # Ensure that the authenticated user is the owner of the post
    if event.user != request.user:
        return Response({"error": "You do not have permission to delete this event."}, status=status.HTTP_403_FORBIDDEN)
    
    # Delete the event
    event.delete()
    return Response({"message": "Event deleted successfully."}, status=status.HTTP_200_OK)