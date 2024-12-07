from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Notification
from appusers.models import UserProfile


class NotificationsSerializer(serializers.ModelSerializer):
    sender_profile_pic = serializers.SerializerMethodField()
    sender_name = serializers.CharField(source='sender.userprofile.display_name', read_only=True)


    class Meta:
        model = Notification
        fields = ['id', 'user', 'sender_name','message', 'post', 'event', 'is_read', 'sender_profile_pic',  'created_at' ]


    def get_sender_profile_pic(self, obj):
        request = self.context.get('request')
        profile_pic_url = obj.sender.userprofile.profile_pic.url
        return request.build_absolute_uri(profile_pic_url)

    

    

        


        
