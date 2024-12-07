from django.urls import path
from .views import add_event,get_events, get_user_events,get_other_user_events, interested_in_event, get_event_interests

urlpatterns = [
    # path('events-posts/', EventListCreateView.as_view(), name='event-list-create'),
    # path('user-events/', UserEventsListView.as_view(), name='user-events-list'),
    # path('other-user-events/<int:userId>/', SpecificUserEventsListView.as_view(), name='specific-user-events-list'),

    path('add-event/', add_event, name='add-event'),
    
    path('get-events/',get_events,name="get-events"),
    path('get-user-events/',get_user_events,name="get-user-events"),
    path('get-other-user-events/<int:userId>/',get_other_user_events,name="get-other-user-events"),

    path('interested-in-event/<int:eventId>/',interested_in_event,name="interested-in-event"),
    path('get-event-interests/<int:eventId>/', get_event_interests, name='get-event-interests'),

]
