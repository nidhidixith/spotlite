from django.urls import path
from . import views


urlpatterns=[
  # path('follow/<int:user_id>/', views.follow_user, name='follow-user'),
  path('users/<int:user_id>/follow/', views.follow_user, name='follow-user'),

  # path('unfollow/<int:user_id>/', views.unfollow_user, name='unfollow-user'),
  path('users/<int:user_id>/unfollow/', views.unfollow_user, name='unfollow-user'),

  # path('remove-follower/<int:user_id>/', views.remove_follower, name='remove-follower'),
  path('users/<int:user_id>/remove-follower/', views.remove_follower, name='remove-follower'),
  
  # path('get-followers-list/', views.get_followers_list, name='get-followers-list'),
  path('users/me/followers/', views.get_followers_list, name='get-followers-list'),

  # path('get-following-list/', views.get_following_list, name='get-following-list'),
  path('users/me/following/', views.get_following_list, name='get-following-list'),

  # path('get-others-followers-list/<int:user_id>/', views.get_others_followers_list, name='get-others-followers-list'),
  path('users/<int:user_id>/followers/', views.get_others_followers_list, name='get-others-followers-list'),

  # path('get-others-following-list/<int:user_id>/', views.get_others_following_list, name='get-others-following-list'),
  path('users/<int:user_id>/following/', views.get_others_following_list, name='get-others-following-list'),
]