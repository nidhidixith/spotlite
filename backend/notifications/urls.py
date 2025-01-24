from django.urls import path
from . import views

urlpatterns=[
  path('get-notifications/',views.get_notifications,name="get-notifications"),
  path('save-push-token/',views.save_push_token,name="save-push-token"),
  path('unregister-push-token/',views.unregister_push_token,name="unregister-push-token"),
  path('mark-as-read/<int:notificationId>/',views.mark_as_read,name="mark-as-read"),
  path('undelivered-notifications-count/', views.undelivered_notifications_count, name='undelivered_notifications_count'),
]