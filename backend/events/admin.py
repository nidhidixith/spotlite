from django.contrib import admin
from .models import Event,EventMedia,EventInterest

# Register your models here.
admin.site.register(Event)
admin.site.register(EventMedia)
admin.site.register(EventInterest)

