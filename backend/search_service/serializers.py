from rest_framework import serializers
from django.contrib.auth.models import User
# from .models import Post, PostMedia, Likes, Comments
from appusers.models import UserProfile


class UserSerializer(serializers.ModelSerializer):
    profile_pic = serializers.ImageField(use_url=True, required=False)
    user_id = serializers.IntegerField(source='user.id', read_only=True)

    class Meta:
        model = UserProfile
        fields = ['id','user', 'user_id', 'display_name','primary_interest', 'profile_pic']

    def get_profile_pic(self, obj):
        request = self.context.get('request')
        if obj.profile_pic:
            profile_pic_url = obj.profile_pic.url
            return request.build_absolute_uri(profile_pic_url)
        return None


    

        
