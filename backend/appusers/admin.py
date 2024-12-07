from django.contrib import admin
from .models import UserProfile, UserRelationships

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(UserRelationships)
