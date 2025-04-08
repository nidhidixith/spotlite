from django.urls import path
from .views import add_event,get_events, get_event, get_user_events,get_other_user_events, interested_in_event, get_event_interests, delete_event, get_user_interested_events, get_latest_event

urlpatterns = [

    path('add-event/', add_event, name='add-event'),
    
    path('get-events/',get_events,name="get-events"),
    path('get-event/<int:eventId>/',get_event,name="get-event"),
    path('get-user-events/',get_user_events,name="get-user-events"),
    path('get-other-user-events/<int:userId>/',get_other_user_events,name="get-other-user-events"),
    path('get-user-interested-events/',get_user_interested_events,name="get-user-interested-events"),

    path('latest-event/<int:userId>/',get_latest_event,name="get-latest-event"),


    path('interested-in-event/<int:eventId>/',interested_in_event,name="interested-in-event"),
    path('get-event-interests/<int:eventId>/', get_event_interests, name='get-event-interests'),

    path('delete-event/<int:eventId>/',delete_event,name="delete-event"),

]
