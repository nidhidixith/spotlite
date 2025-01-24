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
  path('get-questions/', views.question_list, name='question-list'),
  path('create-or-update-answers/', views.create_or_update_answers, name='create_or_update_answers'),
  


  path('get-user-profile/', views.get_user_profile, name='get_user_profile'),
  path('get-other-user-profile/<int:userId>/', views.get_other_user_profile, name='get_other_user_profile'),
  path('edit-profile/', views.edit_profile, name='edit_profile'),

  path('delete-user/', views.delete_user, name='delete_user'),

]