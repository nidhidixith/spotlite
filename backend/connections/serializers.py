from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserRelation


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']  # Include other fields but exclude 'password'


class FollowerSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(source='follower.userprofile.display_name', read_only=True)
    following = serializers.CharField(source='following.userprofile.display_name', read_only=True)
    profile_pic = serializers.SerializerMethodField()
    user_id = serializers.IntegerField(source='follower.id', read_only=True)
    primary_interest = serializers.CharField(source='follower.userprofile.primary_interest', read_only=True)

    class Meta:
        model = UserRelation
        fields = ['id', 'user_id', 'display_name', 'following', 'profile_pic', 'primary_interest']

    def get_profile_pic(self, obj):
        request = self.context.get('request')
        profile_pic_url = obj.follower.userprofile.profile_pic.url
        return request.build_absolute_uri(profile_pic_url)


class FollowingSerializer(serializers.ModelSerializer):
    follower = serializers.CharField(source='follower.userprofile.display_name', read_only=True)
    display_name = serializers.CharField(source='following.userprofile.display_name', read_only=True)
    profile_pic = serializers.SerializerMethodField()
    user_id = serializers.IntegerField(source='following.id', read_only=True)
    primary_interest = serializers.CharField(source='following.userprofile.primary_interest', read_only=True)

    class Meta:
        model = UserRelation
        fields = ['id','user_id', 'follower', 'display_name', 'profile_pic', 'primary_interest']

    def get_profile_pic(self, obj):
        request = self.context.get('request')
        profile_pic_url = obj.following.userprofile.profile_pic.url
        return request.build_absolute_uri(profile_pic_url)
