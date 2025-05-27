from django.urls import path
from . import views

urlpatterns = [
    path('', views.post_list_create_view, name='post_list_create'),                          # GET, POST
    path('latest/<int:userId>/', views.get_latest_post, name='latest_post'),                 # GET
    path('<int:postId>/', views.post_detail_view, name='post_detail'),                      # GET, DELETE
    path('user/', views.get_user_posts, name='user_posts'),                                  # GET
    path('user/<int:userId>/', views.get_other_user_posts, name='other_user_posts'),        # GET
    path('<int:postId>/like/', views.like_post, name='like_post'),                          # POST, DELETE
    path('<int:postId>/likes/', views.get_likes, name='get_likes'),                         # GET
    path('<int:postId>/comments/', views.post_comments_view, name='post_comments'),         # GET, POST
    path('<int:postId>/comments/<int:commentId>/', views.delete_post_comment, name='delete_post_comment'),    # DELETE
    # path('comments/delete/', views.delete_post_comment, name='delete_post_comment'),    # DELETE
]

# urlpatterns=[
#   path('get-posts/',views.get_posts,name="get-posts"),  D
#   path('get-post/<int:postId>/',views.get_post,name="get-post"),  D
#   path('get-user-posts/',views.get_user_posts,name="get-user-posts"), D
#   path('get-other-user-posts/<int:userId>/',views.get_other_user_posts,name="get-other-user-posts"), D
#   path('latest-post/<int:userId>/',views.get_latest_post,name="get-latest-post"),  D

#   path('add-post/',views.add_post,name="add-post"),  D
#   path('delete-post/<int:postId>/',views.delete_post,name="delete-post"),  D
  
#   path('like-post/<int:postId>/',views.like_post,name="like-post"),  D
#   path('add-comment/<int:postId>/',views.add_comment,name="add-comment"),  D

#   path('get-likes/<int:postId>/', views.get_likes, name='get-likes'),  D
#   path('get-comments/<int:postId>/', views.get_comments, name='get-comments'),  D
#   path('delete-post-comment/', views.delete_post_comment, name='delete_post_comment'), D

# ]