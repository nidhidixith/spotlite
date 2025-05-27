from django.db import models
from django.contrib.auth.models import User
from posts.models import Post
from events.models import Event
from connections.models import UserRelation

class Notification(models.Model):
    class NotificationType(models.TextChoices):
        POST_LIKE = 'post_like', 'Post Like'
        POST_COMMENT = 'post_comment', 'Post Comment'
        USER_FOLLOW = 'user_follow', 'User Follow'
        EVENT_INTEREST = 'event_interest', 'Event Interest'
        EVENT_COMMENT = 'event_comment', 'Event Comment'
        GENERAL = 'general', 'General'

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications",db_index=True)
    sender = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="sent_notifications",db_index=True)
    message = models.TextField(null=True, blank=True)
    post = models.ForeignKey('posts.Post', on_delete=models.CASCADE, null=True, blank=True)
    event = models.ForeignKey('events.Event', on_delete=models.CASCADE, null=True, blank=True)
    follower_id = models.IntegerField(null=True, blank=True)  # Storing the ID of the follower explicitly

    is_read = models.BooleanField(default=False, null=True, blank=True)
    is_delivered = models.BooleanField(default=False, null=True, blank=True)
    type = models.CharField(max_length=50, choices=NotificationType.choices, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True,db_index=True)

    def __str__(self):
        return f"Notification for {self.user.username} - {self.message[:20]}"


# class Notification(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications",db_index=True)
#     sender = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name="sent_notifications",db_index=True)
#     message = models.TextField(null=True, blank=True)
#     post = models.ForeignKey('posts.Post', on_delete=models.CASCADE, null=True, blank=True)
#     event = models.ForeignKey('events.Event', on_delete=models.CASCADE, null=True, blank=True)
#     follower_id = models.IntegerField(null=True, blank=True)  # Storing the ID of the follower explicitly

#     is_read = models.BooleanField(default=False, null=True, blank=True)
#     is_delivered = models.BooleanField(default=False, null=True, blank=True)
#     type = models.CharField(max_length=50, null=True, blank=True)
#     created_at = models.DateTimeField(auto_now_add=True,db_index=True)

#     def __str__(self):
#         return f"Notification for {self.user.username} - {self.message[:20]}"



class PushToken(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="push_token")
    expo_token = models.CharField(max_length=255, null=True, blank=True)