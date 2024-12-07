from django.db import models
from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    display_name = models.CharField(max_length=65, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    location = models.URLField(max_length=200, null=True, blank=True)
    primary_interest = models.CharField(max_length=100, blank=True)
    bio = models.TextField(max_length=500, blank=True)

    instagram_link = models.URLField(max_length=200,null=True, blank=True)
    facebook_link = models.URLField(max_length=200,null=True, blank=True)
    youtube_link = models.URLField(max_length=200,null=True, blank=True)
    tiktok_link = models.URLField(max_length=200,null=True, blank=True)
    pinterest_link = models.URLField(max_length=200,null=True, blank=True)
    twitter_link = models.URLField(max_length=200,null=True, blank=True)
    threads_link = models.URLField(max_length=200, null=True,blank=True)
    linkedin_link = models.URLField(max_length=200,null=True, blank=True)

    additional_links = ArrayField(models.URLField(max_length=200), null=True, blank=True, default=list)

    areas_of_interest = ArrayField(models.CharField(max_length=100), blank=True, default=list)

    # Modify upload_to and default parameters
    profile_pic = models.ImageField(default='def.webp', upload_to='profile_pics', null=True, blank=True)


    def __str__(self):
        return f'{self.user.username} Profile'

    def save(self, *args, **kwargs):
        if not self.profile_pic:
            self.profile_pic = 'def.webp'
        super().save(*args, **kwargs)


class UserRelationships(models.Model):
    follower = models.ForeignKey(User, related_name='followers', on_delete=models.CASCADE)
    following = models.ForeignKey(User, related_name='following', on_delete=models.CASCADE)
    follower_count = models.IntegerField(default=0)
    following_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)