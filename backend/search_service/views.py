from django.shortcuts import render
from appusers.models import UserProfile
from .serializers import UserSerializer
from events.serializers import EventSerializer
from events.models import Event
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
import re
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def search_view(request):
#     query = request.query_params.get('q', '').strip()
#     if not query:
#         return Response({"error": "Query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

#     # Search for users
#     users = UserProfile.objects.filter(display_name__icontains=query)
#     serializer = UserSerializer(users, many=True, context={'request': request})
#     print("User Serializer: ",serializer)

#     return Response(serializer.data, status=status.HTTP_200_OK)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def search_view(request):
#     query = request.query_params.get('q', '').strip()
#     if not query:
#         return Response({"error": "Query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

#     # Prepare regex for optional spaces
#     regex_query = r'\s*'.join(map(re.escape, query))

#     # Search for users with regex
#     users = UserProfile.objects.filter(display_name__iregex=regex_query)
#     serializer = UserSerializer(users, many=True, context={'request': request})

#     return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def search_view(request):
    query = request.query_params.get('q', '').strip()
    if not query:
        return Response({"error": "Query parameter is required."}, status=status.HTTP_400_BAD_REQUEST)

    search_query = SearchQuery(query)
    results = []

    # Search Users
    # user_search_vector = SearchVector('display_name', weight='A')
    # users = UserProfile.objects.annotate(
    #     rank=SearchRank(user_search_vector, search_query)
    # ).filter(rank__gte=0.1).order_by('-rank')
    #     # Prepare regex for optional spaces
    
    regex_query = r'\s*'.join(map(re.escape, query))

    # Search for users with regex
    users = UserProfile.objects.filter(display_name__iregex=regex_query)
    
    for user in users:
        user_data = UserSerializer(user, context={'request': request}).data
        user_data['type'] = 'user'  # Add 'type' field for identification
        results.append(user_data)

    # Search Events
    event_search_vector = SearchVector('event_title', weight='A') + \
                          SearchVector('event_domain', weight='B') + \
                          SearchVector('event_description', weight='C')
    events = Event.objects.annotate(
        rank=SearchRank(event_search_vector, search_query)
    ).filter(rank__gte=0.1).order_by('-rank')
    
    for event in events:
        event_data = EventSerializer(event, context={'request': request}).data
        event_data['type'] = 'event'  # Add 'type' field for identification
        results.append(event_data)

    # Sort Combined Results by Rank (if required)
    results = sorted(results, key=lambda x: x.get('rank', 0), reverse=True)

    return Response(results, status=status.HTTP_200_OK)