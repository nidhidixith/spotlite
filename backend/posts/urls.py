from django.urls import path
from . import views

urlpatterns=[
  path('get-posts/',views.get_posts,name="get-posts"),
  path('get-post/<int:postId>/',views.get_post,name="get-post"),
  path('get-user-posts/',views.get_user_posts,name="get-user-posts"),
  path('get-other-user-posts/<int:userId>/',views.get_other_user_posts,name="get-other-user-posts"),
  path('latest-post/<int:userId>/',views.get_latest_post,name="get-latest-post"),

  path('add-post/',views.add_post,name="add-post"),
  path('delete-post/<int:postId>/',views.delete_post,name="delete-post"),
  
  path('like-post/<int:postId>/',views.like_post,name="like-post"),
  path('add-comment/<int:postId>/',views.add_comment,name="add-comment"),

  path('get-likes/<int:postId>/', views.get_likes, name='get-likes'),
  path('get-comments/<int:postId>/', views.get_comments, name='get-comments'),
  path('delete-post-comment/', views.delete_post_comment, name='delete_post_comment'),

  

]