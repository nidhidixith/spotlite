import json
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import AnonymousUser

class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        # Reject connection if user is not authenticated
        # if self.scope["user"] == AnonymousUser():
        #     await self.close()
        #     return

        # Group name based on user ID
        # self.group_name = f"user_{self.scope['user'].id}"
        
        # Add user to group
        # await self.channel_layer.group_add(
        #     self.group_name,
        #     self.channel_name
        # )
        print("Connected...")
        await self.accept()

    async def disconnect(self, close_code):
        # Remove user from group
        # await self.channel_layer.group_discard(
        #     self.group_name,
        #     self.channel_name
        # )
        print("Disconnected...")

    # async def send_notification(self, event):
    #     # Send notification data to WebSocket
    #     await self.send(text_data=json.dumps(event['content']))
