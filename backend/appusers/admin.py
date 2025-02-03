from django.contrib import admin
from .models import UserProfile, SocialLink, AdditionalLink,  Question, Answer

# Register your models here.
admin.site.register(UserProfile)
admin.site.register(SocialLink)
admin.site.register(AdditionalLink)
admin.site.register(Question)
admin.site.register(Answer)
