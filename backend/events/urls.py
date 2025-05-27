from django.urls import path
from . import views

from .views import add_event,get_events, get_event, get_user_events,get_other_user_events, interested_in_event, get_event_interests, delete_event, get_user_interested_events, get_latest_event, add_event_comment, get_event_comments, delete_event_comment


urlpatterns = [
    path('', views.event_list_create_view, name='event_list_create'),                          # GET, POST
    path('latest/<int:userId>/', views.get_latest_event, name='latest_event'),                 # GET
    path('<int:eventId>/', views.event_detail_view, name='event_detail'),                      # GET, DELETE
    path('user/', views.get_user_events, name='user_events'),                                  # GET
    path('user/<int:userId>/', views.get_other_user_events, name='other_user_events'),        # GET
    path('user/interested/',views.get_user_interested_events,name="user_interested_events"),
    path('<int:eventId>/interest/', views.interested_in_event, name='interested_in_event'),                          # POST, DELETE
    path('<int:eventId>/interests/', views.get_event_interests, name='get_event_interests'),                         # GET
    path('<int:eventId>/comments/', views.event_comments_view, name='event_comments'),         # GET, POST
    path('<int:eventId>/comments/<int:commentId>/', views.delete_event_comment, name='delete_event_comment'),    # DELETE
    # path('comments/delete/', views.delete_event_comment, name='delete_event_comment'),    # DELETE
]


# urlpatterns = [
#     path('add-event/', add_event, name='add-event'),  D
#     path('get-events/',get_events,name="get-events"), D
#     path('get-event/<int:eventId>/',get_event,name="get-event"), D
#     path('get-user-events/',get_user_events,name="get-user-events"), D
#     path('get-other-user-events/<int:userId>/',get_other_user_events,name="get-other-user-events"), D
#     path('get-user-interested-events/',get_user_interested_events,name="get-user-interested-events"),
#     path('latest-event/<int:userId>/',get_latest_event,name="get-latest-event"),  D
#     path('interested-in-event/<int:eventId>/',interested_in_event,name="interested-in-event"), D
#     path('get-event-interests/<int:eventId>/', get_event_interests, name='get-event-interests'), D
#     path('add-event-comment/<int:eventId>/',add_event_comment,name="add-event-comment"), D
#     path('get-event-comments/<int:eventId>/', get_event_comments, name='get-event-comments'), D
#     path('delete-event/<int:eventId>/',delete_event,name="delete-event"), D
#     path('delete-event-comment/', delete_event_comment, name='delete_event_comment'), D


# ]
