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

from .models import Event, EventMedia, EventInterest
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
        interests = user.userprofile.areas_of_interest  # Corrected field name
        print("Interests:", interests)
        events = Event.objects.filter(event_domain__in=interests)  # Use __in for list filtering
    elif filter_type == "upcoming":
        start_of_week = now().date()
        end_of_week = start_of_week + timedelta(days=7)
        print("Start of week:", start_of_week, "End of week:", end_of_week)
        events = Event.objects.filter(event_date__range=(start_of_week, end_of_week))
        
    else:
        events = Event.objects.all()  # Default behavior if no filter provided

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



# class EventListCreateView(generics.ListCreateAPIView):
#     serializer_class = EventSerializer
#     permission_classes = [permissions.IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]

#     def get_queryset(self):
#         # Exclude events where user is the request user
#         return Event.objects.exclude(user=self.request.user)

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)



# class UserEventsListView(generics.ListAPIView):
#     serializer_class = EventSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return Event.objects.filter(user=self.request.user)
#         # return Event.objects.filter(Q(user=self.request.user) | Q(tagged_users=self.request.user)).distinct()


# class SpecificUserEventsListView(generics.ListAPIView):
#     serializer_class = EventSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         user_id = self.kwargs.get('userId')  # Extracting userId from URL parameters
#         user = User.objects.get(id=user_id)
#         # return Event.objects.filter(Q(user=user) | Q(tagged_users=user)).distinct()
#         return Event.objects.filter(user_id=user_id)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_user_events(request):
#     # print("Request user:")
#     # print(request.user)
#     events = Event.objects.filter(user=request.user)
#     # events = Event.objects.filter(Q(user=request.user) | Q(tagged_users=request.user)).distinct()
#     # print(posts)
#     serializer = EventSerializer(events,many=True,context={'request': request})
#     print("User Events")
#     print(serializer.data)
#     return Response(serializer.data)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_other_user_events(request, userId):
#     # print("Request user:")
#     # print(request.user)
#     user = User.objects.get(id=userId)
#     events = Event.objects.filter(user=user)
#     # events = Event.objects.filter(Q(user=user) | Q(tagged_users=user)).distinct()
#     # print(posts)
#     serializer = EventSerializer(events,many=True,context={'request': request})
#     print("Other User Events")
#     print(serializer.data)
#     return Response(serializer.data)


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

