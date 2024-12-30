from django.urls import path
from . import views

urlpatterns=[
  path('search/',views.search_view,name="search"),
  # path('get-other-user-posts/<int:userId>/',views.get_other_user_posts,name="get-other-user-posts"),

]