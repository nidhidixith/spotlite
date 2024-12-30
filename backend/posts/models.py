from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User

def upload_to(instance, filename):
    if instance.media_file:
        # Customize the upload path based on file type (photo or video)
        if filename.endswith(('.jpg', '.png', '.jpeg', '.webp')):
            return f'user_posts/photos/{filename}'
        elif filename.endswith(('.mp4', '.mov', '.avi','.webm', '.mkv')):
            return f'user_posts/videos/{filename}'
        elif filename.endswith(('.mp3', '.wav', '.flac', '.aac', '.ogg')):
            return f'user_posts/audios/{filename}'
        else:
            # Raise an error for unsupported file types
            raise ValueError('Unsupported file type')
    else:
        # If media_file is not provided, handle accordingly (e.g., store in a generic folder)
        return None

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    text = models.TextField(max_length=5000, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.id}"


class PostMedia(models.Model):
    post = models.ForeignKey(Post, related_name='media_files', on_delete=models.CASCADE)
    media_file = models.FileField(upload_to=upload_to, null=True, blank=True)


class Likes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    post_media = models.ForeignKey(PostMedia, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


class Comments(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    post_media = models.ForeignKey(PostMedia, on_delete=models.CASCADE, null=True, blank=True)
    text = models.TextField(max_length=500)
    created_at = models.DateTimeField(auto_now_add=True)


