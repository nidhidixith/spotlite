from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns=[
  path('register/', views.register_user, name='register_user'),
  path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('logout/', views.logout_user, name='logout_user'),

  path('complete-profile/', views.complete_user_profile, name='complete_user_profile'),
  path('get-user-profile/', views.get_user_profile, name='get_user_profile'),
  path('get-other-user-profile/<int:userId>/', views.get_other_user_profile, name='get_other_user_profile'),
  path('edit-profile/', views.edit_profile, name='edit_profile'),

  path('follow/<int:user_id>/', views.follow_user, name='follow_user'),
  path('unfollow/<int:user_id>/', views.unfollow_user, name='unfollow_user'),
  
  path('get-followers-following/<int:user_id>/', views.followers_following_count, name='followers_following_count'),
  path('get-followers-list/', views.get_followers_list, name='get_followers_list'),
  path('get-following-list/', views.get_following_list, name='get_following_list'),

  path('',views.success,name="success"),
]