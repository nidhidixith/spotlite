from django.urls import path
from . import views

urlpatterns=[
  path('get-notifications/',views.get_notifications,name="get-notifications"),
  path('save-push-token/',views.save_push_token,name="save-push-token"),
  path('mark-as-read/<int:notificationId>/',views.mark_as_read,name="mark-as-read"),

  # path('add-post/',views.add_post,name="add-post"),
  
  # path('like-post/<int:postId>/',views.like_post,name="like-post"),

  # path('get-likes/<int:postId>/', views.get_likes, name='get-likes'),
]