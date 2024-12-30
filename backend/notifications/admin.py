from django.contrib import admin
from .models import Notification,PushToken

# Register your models here.
admin.site.register(Notification)
admin.site.register(PushToken)


