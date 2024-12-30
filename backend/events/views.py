from rest_framework import permissions,generics
from django.contrib.auth.models import User
from django.utils.timezone import now
from datetime import timedelta

from rest_framework import status
from django.db.models import Q
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.postgres.search import SearchQuery, SearchVector

from .models import Event, EventMedia, EventInterest
from connections.models import UserRelation
from notifications.models import Notification
from appusers.models import UserProfile
from .serializers import EventSerializer, EventMediaSerializer, EventInterestSerializer

@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def add_event(request):
    print(request.data)
    print(request.user)
    if request.method == 'POST':
        serializer = EventSerializer(data=request.data, partial=True)
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


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_events(request):
#     # print("Request user:")
#     # print(request.user)
#     events = Event.objects.exclude(user=request.user)
#     # print(posts)
#     serializer = EventSerializer(events,many=True,context={'request': request})
#     # print("2")
#     print(serializer)
#     return Response(serializer.data)


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
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_events(request):
    # print("Request user:")
    # print(request.user)
    events = Event.objects.filter(user=request.user)
    # posts = Post.objects.filter(Q(user=request.user) | Q(tagged_users=request.user)).distinct()
    # print(posts)
    serializer = EventSerializer(events,many=True,context={'request': request})
    # print("2")
    print(serializer)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_other_user_events(request, userId):
    # print("Request user:")
    # print(request.user)
    user = User.objects.get(id=userId)
    events = Event.objects.filter(user=user)
    # posts = Post.objects.filter(Q(user=user) | Q(tagged_users=user)).distinct()
    # print(posts)
    serializer = EventSerializer(events,many=True,context={'request': request})
    # print("2")
    print(serializer)
    return Response(serializer.data)


#Interested

@api_view(['POST','DELETE'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def interested_in_event(request,eventId):
    current_user = request.user
    
    try:
        print("1")
        event = Event.objects.get(id=eventId)
        print("2")
    except Event.DoesNotExist:
        return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'POST':
        interested = EventInterest.objects.create(user=current_user, event=event)
        print("3")
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
        print("4")
        serializer = EventSerializer(event, context={'request': request})
        return Response(serializer.data, status=status.HTTP_201_CREATED) 
      
    print("12")
    # print(serializer.data)
    print("13")
    return Response({"error": "Invalid post type."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_event_interests(request, eventId):
    interests = None  # Initialize likes variable
    try:
        print("1")
        event = Event.objects.get(id=eventId)
        print("2")
    except Event.DoesNotExist:
        return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)
    print("2")
    interests = EventInterest.objects.filter(event=event)
    print("3")
    
    if interests is not None:    
        print("8")
        serializer = EventInterestSerializer(interests, many=True ,context={'request': request})
        print("9")
        print(serializer.data)
        print("10")
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response({"error": "Invalid event type."},status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_event(request, eventId):
    try:
        event = Event.objects.get(id=eventId)
    except Event.DoesNotExist:
        # Return 404 if the post does not exist
        return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)
    
    # Ensure that the authenticated user is the owner of the post
    if event.user != request.user:
        return Response({"error": "You do not have permission to delete this event."}, status=status.HTTP_403_FORBIDDEN)
    
    # Delete the post
    event.delete()
    return Response({"message": "Event deleted successfully."}, status=status.HTTP_200_OK)