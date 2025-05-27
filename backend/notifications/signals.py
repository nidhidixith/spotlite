from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Notification
from posts.utils import send_push_notification  # Import your notification sending function
from django.conf import settings
from urllib.parse import urljoin

@receiver(post_save, sender=Notification)
def send_push_notification_on_creation(sender, instance, created, **kwargs):
    if created:
        # Fetch the push token for the recipient user
        token = instance.user.push_token  # Assuming `push_tokens` is a related name for PushToken model
        print("Signal created: ")
        print("Instance user:", instance.user.push_token.expo_token)

        # Construct the absolute URL for the sender's profile picture
        profile_pic_url = None
        if instance.sender and instance.sender.userprofile.profile_pic:
            profile_pic_url = urljoin(
                settings.SITE_URL, instance.sender.userprofile.profile_pic.url
            )

        if token:
            data = {
                "id": instance.id,
                "sender_name": instance.sender.userprofile.display_name,
                "message": instance.message,
                "created_at": instance.created_at.isoformat(),  # Convert datetime to string
                "sender_profile_pic": profile_pic_url,
                "type": instance.type,
            }

            # Customize data and notification message based on type
            if instance.type == 'post_like':
                data["post"] = instance.post.id
                title = "New like"
                body = f'{instance.sender.userprofile.display_name} liked your post'
            elif instance.type == 'post_comment':
                data["post"] = instance.post.id
                title = "New Comment"
                body = f'{instance.sender.userprofile.display_name} commented on your post'
            elif instance.type == 'event_interest':
                data["event"] = instance.event.id
                title = "New Interest"
                body = f'{instance.sender.userprofile.display_name} is interested in your event'
            elif instance.type == 'event_comment':
                data["event"] = instance.event.id
                title = "New Comment"
                body = f'{instance.sender.userprofile.display_name} commented on your event'
            elif instance.type == 'user_follow':
                data["follower_id"] = instance.follower_id
                title = "New Follower"
                body = f'{instance.sender.userprofile.display_name} started following you'
            else:
                # If the type doesn't match, skip sending the notification
                return

            # Send the push notification
            try:
                send_push_notification(
                    expo_token=token.expo_token,
                    title=title,
                    body=body,
                    data=data,
                )
                # Mark as delivered if the notification was sent successfully
                instance.is_delivered = True
                instance.save(update_fields=['is_delivered'])
                print(f"Notification delivered: {title}")
            except Exception as e:
                print(f"Failed to send notification: {e}")



# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from .models import Notification
# from posts.utils import send_push_notification  # Import your notification sending function
# from django.conf import settings
# from urllib.parse import urljoin

# @receiver(post_save, sender=Notification)
# def send_push_notification_on_creation(sender, instance, created, **kwargs):
#     if created:
#         # Fetch the push token for the recipient user
#         token = instance.user.push_token  # Assuming `push_tokens` is a related name for PushToken model
#         print("Signal created: ")
#         print("Instance user:", instance.user.push_token.expo_token)
#         # print("Token: ",token)

#          # Construct the absolute URL for the sender's profile picture
#         profile_pic_url = None
#         if instance.sender and instance.sender.userprofile.profile_pic:
#           profile_pic_url = urljoin(
#             settings.SITE_URL, instance.sender.userprofile.profile_pic.url
#         )

#         if token:
#           if instance.type == 'like':
#             data = {
#               "id":instance.id,
#               "post": instance.post.id,
#               "sender_name": instance.sender.userprofile.display_name,
#               "message": instance.message,
#               "created_at": instance.created_at.isoformat(),  # Convert datetime to string
#               "sender_profile_pic": profile_pic_url,
#               "type": instance.type,
#             }
#             send_push_notification(
#                 expo_token=token.expo_token,
#                 title="New like",
#                 body=f'{instance.sender.userprofile.display_name} liked your post',
#                 data=data
#             )
#             print("Sent like notification")
#           elif instance.type == 'comment':
#             data = {
#               "id":instance.id,
#               "post": instance.post.id,
#               "sender_name": instance.sender.userprofile.display_name,
#               "message": instance.message,
#               "created_at": instance.created_at.isoformat(),  # Convert datetime to string
#               "sender_profile_pic": profile_pic_url,
#               "type": instance.type,
#             }
#             send_push_notification(
#                 expo_token=token.expo_token,
#                 title="New Comment",
#                 body=f'{instance.sender.userprofile.display_name} commented on your post',
#                 data=data
#             )
#             print("Sent comment notification")
#           elif instance.type == 'interested':
#             data = {
#               "id":instance.id,
#               "event": instance.event.id,
#               "sender_name": instance.sender.userprofile.display_name,
#               "message": instance.message,
#               "created_at": instance.created_at.isoformat(),  # Convert datetime to string
#               "sender_profile_pic": profile_pic_url,
#               "type": instance.type,
#             }
#             send_push_notification(
#                 expo_token=token.expo_token,
#                 title="New Interest",
#                 body=f'{instance.sender.userprofile.display_name} is interested in your event',
#                 data=data
#             )
#             print("Sent interest notification")
#           elif instance.type == 'follow':
#             data = {
#               "id":instance.id,
#               "follower_id": instance.follower_id,
#               "sender_name": instance.sender.userprofile.display_name,
#               "message": instance.message,
#               "created_at": instance.created_at.isoformat(),  # Convert datetime to string
#               "sender_profile_pic": profile_pic_url,
#               "type": instance.type,
#             }
#             send_push_notification(
#                 expo_token=token.expo_token,
#                 title="New Follower",
#                 body=f'{instance.sender.userprofile.display_name} started following you',
#                 data=data
#             )
#             print("Sent follow notification")
          
