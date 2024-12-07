from django.urls import path
from . import consumers

websocket_urlpatterns = [
  path('ws/nc/',consumers.NotificationConsumer.as_asgi())
]