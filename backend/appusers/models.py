from django.db import models
from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=10, blank=True)
    last_name = models.CharField(max_length=10, blank=True)
    display_name = models.CharField(max_length=20, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
    location = models.CharField(max_length=200, null=True, blank=True)
    primary_interest = models.CharField(max_length=50, blank=True)
    bio = models.TextField(max_length=500, blank=True)
    areas_of_interest = ArrayField(models.CharField(max_length=100), blank=True, default=list)
    profile_pic = models.ImageField(default='def.webp', upload_to='profile_pics', null=True, blank=True)
    is_primary_profile_complete = models.BooleanField(default=False)
    is_full_profile_complete = models.BooleanField(default=False)


    def __str__(self):
        return f'{self.user.username} Profile'

    # def save(self, *args, **kwargs):
    #     if not self.profile_pic:
    #         self.profile_pic = 'def.webp'
    #     super().save(*args, **kwargs)

    def check_primary_profile_completion(self):
        """Checks if all the required fields are filled out."""
        required_fields = [
            self.first_name,
            self.last_name,
            self.display_name,
            self.date_of_birth,
            self.primary_interest,
            self.bio,
            self.areas_of_interest,
        ]
        # Check if all required fields are not empty or null
        return all(bool(field) for field in required_fields)

    def check_full_profile_completion(self):
        """Checks if all the required fields are filled out."""
        required_fields = [
            self.first_name,
            self.last_name,
            self.display_name,
            self.date_of_birth,
            self.primary_interest,
            self.bio,
            self.areas_of_interest,
            self.location,
        ]
        # Check if all required fields are not empty or null
        return all(bool(field) for field in required_fields)

    def save(self, *args, **kwargs):
        """Override the save method to update is_profile_complete."""
        if not self.profile_pic:
            self.profile_pic = 'def.webp'
        self.is_primary_profile_complete = self.check_primary_profile_completion()
        self.is_full_profile_complete = self.check_full_profile_completion()
        super().save(*args, **kwargs)


class SocialLink(models.Model):
    SOCIAL_PLATFORM_CHOICES = [
        ('instagram', 'Instagram'),
        ('facebook', 'Facebook'),
        ('youtube', 'YouTube'),
        ('tiktok', 'TikTok'),
        ('pinterest', 'Pinterest'),
        ('twitter', 'Twitter'),
        ('threads', 'Threads'),
        ('linkedin', 'LinkedIn'),
        ('portfolio', 'Portfolio'),
    ]
    user_profile = models.ForeignKey(
        'UserProfile', 
        on_delete=models.CASCADE, 
        related_name='social_links'
    )
    platform = models.CharField(max_length=50, choices=SOCIAL_PLATFORM_CHOICES)
    url = models.URLField(max_length=200)

    class Meta:
        unique_together = ('user_profile', 'platform')  # Ensure each platform has one link per user.

    def __str__(self):
        return f"{self.platform} link for {self.user_profile.user.username}"


class AdditionalLink(models.Model):
    user_profile = models.ForeignKey(
        'UserProfile', 
        on_delete=models.CASCADE, 
        related_name='additional_links'
    )
    url = models.URLField(max_length=200)
    description = models.CharField(max_length=100, blank=True, null=True)  # Optional description for the link.

    def __str__(self):
        return f"Additional link for {self.user_profile.user.username}"


class Question(models.Model):
    text = models.CharField(max_length=255)

    def __str__(self):
        return f'{self.text}'

class Answer(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    answer = models.TextField()

    def __str__(self):
        return f'{self.user_profile.display_name}-{self.question}'

