from django.urls import path
from . import views


urlpatterns=[
  path('follow/<int:user_id>/', views.follow_user, name='follow-user'),
  path('unfollow/<int:user_id>/', views.unfollow_user, name='unfollow-user'),
  
  path('get-followers-list/', views.get_followers_list, name='get-followers-list'),
  path('get-following-list/', views.get_following_list, name='get-following-list'),

  path('get-others-followers-list/<int:user_id>/', views.get_others_followers_list, name='get-others-followers-list'),
  path('get-others-following-list/<int:user_id>/', views.get_others_following_list, name='get-others-following-list'),
]