from django.db import models
from django.contrib.auth.models import User
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.postgres.fields import ArrayField

def upload_to(instance, filename):
    if instance.media_file:
        # Customize the upload path based on file type (photo or video)
        if filename.endswith(('.jpg', '.png', '.jpeg', '.webp')):
            return f'user_events/photos/{filename}'
        elif filename.endswith(('.mp4', '.mov', '.avi','.webm', '.mkv')):
            return f'user_events/videos/{filename}'
        elif filename.endswith(('.mp3', '.wav', '.flac', '.aac', '.ogg')):
            return f'user_events/audios/{filename}'
        else:
            # Raise an error for unsupported file types
            raise ValueError('Unsupported file type')
    else:
        # If media_file is not provided, handle accordingly (e.g., store in a generic folder)
        return None


class Event(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
  
  event_title = models.TextField(max_length=100, blank=True) 
  event_domain = models.CharField(max_length=100, blank=True, null=True)
  event_description = models.TextField(max_length=5000, blank=True) 

  event_date = models.DateField(null=True, blank=True)
  event_time = models.TimeField(null=True, blank=True)
  
  event_location = models.URLField(max_length=200,null=True, blank=True)
  event_link = models.URLField(blank=True, null=True)

#   interested_count = models.IntegerField(default=0, null=True, blank=True)

  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
      return f"{self.user} - {self.id}"


class EventMedia(models.Model):
    event = models.ForeignKey(Event, related_name='media_files', on_delete=models.CASCADE,null=True, blank=True)
    media_file = models.FileField(upload_to=upload_to, null=True, blank=True)


class EventInterest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        unique_together = ('user', 'event')

    