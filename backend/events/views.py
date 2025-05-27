from rest_framework import permissions
from django.contrib.auth.models import User
from django.utils.timezone import now
from datetime import timedelta
from django.db.models import Q
from django.shortcuts import get_object_or_404
from django.contrib.postgres.search import SearchVector, SearchQuery, TrigramSimilarity
from django.db.models import Q

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser

from .models import Event, EventMedia, EventInterest, EventComments
from connections.models import UserRelation
from notifications.models import Notification
from appusers.models import UserProfile
from .serializers import EventSerializer, EventMediaSerializer, EventInterestSerializer, EventSerializerWeb, EventCommentSerializer
from math import radians, sin, cos, sqrt, atan2
from rapidfuzz import fuzz

def is_similar_address(event_address, user_address, threshold=50):
    # print("Ratio of event ",event_address,"and ",user_address,"is ",fuzz.token_sort_ratio(event_address.lower(), user_address.lower()))
    return fuzz.token_sort_ratio(event_address.lower(), user_address.lower()) >= threshold

# Function to calculate distance between two points (lat1, lon1) and (lat2, lon2) in kilometers
def calculate_distance(lat1, lon1, lat2, lon2):
    # Radius of Earth in kilometers
    R = 6371.0
    
    # Convert latitude and longitude from degrees to radians
    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)
    
    # Difference in coordinates
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    
    # Haversine formula
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    
    # Distance in kilometers
    distance = R * c
    return distance

# @api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def add_event(request):
    
    if request.method == 'POST':
        serializer = EventSerializer(data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# @api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_events(request):
    user = request.user
    filter_type = request.query_params.get('filter', None)
    max_distance_km = 10

    print("Filter:", filter_type)

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
        lat = request.query_params.get("lat")
        lon = request.query_params.get("lon")
        full_address = request.query_params.get("full_address")
        print("Lat:", lat, "Lon:", lon, "Full address:", full_address)

        if lat and lon:
            try:
                user_lat = float(lat)
                user_lon = float(lon)
                max_distance_km = 10  # or your defined max radius

                nearby_events = []

                # Step 1: Events with coordinates
                events_with_coords = Event.objects.filter(
                    event_location_latitude__isnull=False,
                    event_location_longitude__isnull=False
                )
                print("Event with co-ords: ", events_with_coords)
                for event in events_with_coords:
                    distance = calculate_distance(
                        user_lat, user_lon,
                        event.event_location_latitude,
                        event.event_location_longitude
                    )
                    # print("Co-ords: ",user_lat, user_lon,
                    #     event.event_location_latitude,
                    #     event.event_location_longitude)
                    # print("Distances: ",distance)
                    if distance <= max_distance_km:
                        nearby_events.append(event)
                # print("1. Nearby events: ", nearby_events)

                # Step 2: Events without coordinates but with a location string
                if full_address:
                    normalized_full_address = full_address.replace('null', '').strip()
                    print("Normalized Full address: ",normalized_full_address)
                    # text_matched_events = Event.objects.filter(
                    #     event_location_latitude__isnull=True,
                    #     event_location_longitude__isnull=True,
                    #     event_location__isnull=False
                    # ).annotate(
                    #     search=SearchVector('event_location')
                    # ).filter(
                    #     Q(search=SearchQuery(normalized_full_address)) |
                    #     Q(event_location__icontains=normalized_full_address)
                    # )

                    for event in Event.objects.all():
                    # Add unique ones only
                        if event.event_location:
                            if is_similar_address(event.event_location, normalized_full_address) and event not in nearby_events:
                                print("Am i printing 3...")
                                print("Event location: ",event.event_location)
                                nearby_events.append(event)
                
                # print("2. Nearby events: ", nearby_events)

                events = nearby_events

            except ValueError:
                events = Event.objects.none()
                print("Invalid lat/lon format")
        else:
            events = Event.objects.none()

    # elif filter_type == "nearby":
    #     lat = request.query_params.get("lat")
    #     lon = request.query_params.get("lon")
    #     full_address = request.query_params.get("full_address")
    #     print("Lat:", lat, "Lon:", lon, "Full address:", full_address)

    #     if lat and lon:
    #         try:
    #             user_lat = float(lat)
    #             user_lon = float(lon)
    #             events = Event.objects.all()
    #             nearby_events = []

    #             for event in events:
    #                 if event.event_location_latitude is not None and event.event_location_longitude is not None:
    #                     distance = calculate_distance(user_lat, user_lon, event.event_location_latitude, event.event_location_longitude)
    #                     if distance <= max_distance_km:
    #                         nearby_events.append(event)
    #                 elif event.event_location:
    #                     # current_user_location = UserProfile.objects.get(user=user).location
    #                     search_query = SearchQuery(full_address)
    #                     events = Event.objects.annotate(search=SearchVector('event_location')).filter(search=search_query)
    #                     nearby_events.append(event)
    #             events = nearby_events
    #         except ValueError:
    #             events = Event.objects.none()
    #             print("Invalid lat/lon format")
    #     else:
    #         events = Event.objects.none()
        
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
        # if current_user != event.user:
        #     notification = Notification.objects.create(
        #         user=event.user,
        #         sender=current_user,
        #         # message=f"{current_user.userprofile.display_name} liked your post",
        #         message="is interested in your event",
        #         type="interested",
        #         event=event,
        #     )
        if current_user != event.user:
            notification = Notification.objects.create(
                user=event.user,
                sender=current_user,
                message="is interested in your event",
                type=Notification.NotificationType.EVENT_INTEREST,
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


# @api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_event_comment(request, eventId):
    current_user = request.user
    data=request.data

    # Get the event
    try:
        event = Event.objects.get(id=eventId)
    except Event.DoesNotExist:
        return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

    # Add comment to the post using serializer
    if request.method == 'POST':
        serializer = EventCommentSerializer(data=data, partial=True,context={'request': request})
        if serializer.is_valid():
            try:
                serializer.save(user=current_user, event=event)
                event_serializer = EventSerializer(event, context={'request': request})

                 # Create notification only if the user is not the post owner
                # if current_user != event.user:
                #     notification = Notification.objects.create(
                #         user=event.user,
                #         sender=current_user,
                #         # message=f"{current_user.userprofile.display_name} liked your post",
                #         message="commented on your event",
                #         type="event_comment",
                #         event=event,
                #     )
                if current_user != event.user:
                    notification = Notification.objects.create(
                        user=event.user,
                        sender=current_user,
                        message="commented on your event",
                        type=Notification.NotificationType.EVENT_COMMENT,
                        event=event,
                    )
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"error": "Failed to save event comment."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({"error": "Invalid request method."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

# @api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_event_comments(request, eventId):
    try:
        event = Event.objects.get(id=eventId)
    except Event.DoesNotExist:
        return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

    comments = EventComments.objects.filter(event=event).order_by('-created_at')
    serializer = EventCommentSerializer(comments, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)
    
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_event_comments(request, eventId):
#     comments = None

#     try:
#         event = Event.objects.get(id=eventId)
#     except Event.DoesNotExist:
#         return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

#     comments = EventComments.objects.filter(event=event).order_by('-created_at')
#     print("1")
#     if comments:    
#         print("2")
#         serializer = EventCommentSerializer(comments, many=True,context={'request': request})
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     print("3")
#     return Response({"error": "Error fetching event comments."},status=status.HTTP_400_BAD_REQUEST)


# @api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_event(request, eventId):
    try:
        event = Event.objects.get(id=eventId)
    except Event.DoesNotExist:
        return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = EventSerializer(event, context={'request': request})
    print(serializer.data)
    return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(['DELETE'])
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


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_event_comment(request, eventId, commentId):
    # eventId = request.query_params.get('eventId')
    # commentId = request.query_params.get('commentId')
    try:
        # Fetch the post to ensure it exists
        event = Event.objects.get(id=eventId)
    except Event.DoesNotExist:
        return Response({"error": "Event not found."}, status=status.HTTP_404_NOT_FOUND)
    
    try:
        # Fetch the comment to ensure it exists
        comment = EventComments.objects.get(id=commentId, event=event)
    except Comment.DoesNotExist:
        return Response({"error": "Event Comment not found."}, status=status.HTTP_404_NOT_FOUND)
    
    # Ensure the authenticated user is the owner of the comment or the post
    if comment.user != request.user and event.user != request.user:
        return Response({"error": "You do not have permission to delete this comment."}, status=status.HTTP_403_FORBIDDEN)
    
    # Delete the comment
    comment.delete()
    return Response({"message": "Event Comment deleted successfully."}, status=status.HTTP_200_OK)


# Grouping the views to follow RESTful practices.

@api_view(['GET', 'POST'])
def event_list_create_view(request):
    if request.method == 'GET':
        return get_events(request)
    elif request.method == 'POST':
        return add_event(request)

@api_view(['GET', 'DELETE'])
def event_detail_view(request, eventId):
    if request.method == 'GET':
        return get_event(request, eventId)
    elif request.method == 'DELETE':
        return delete_event(request, eventId)

@api_view(['GET', 'POST'])
def event_comments_view(request, eventId):
    if request.method == 'GET':
        return get_event_comments(request, eventId)
    elif request.method == 'POST':
        return add_event_comment(request, eventId)