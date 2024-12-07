from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, UserRelationships
from posts.models import Post


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']  # Include other fields but exclude 'password'


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    profile_pic = serializers.ImageField(use_url=True, required=False)
    additional_links = serializers.ListField(allow_empty=True, child=serializers.URLField(allow_blank=True),required=False)
    areas_of_interest = serializers.ListField(child=serializers.CharField(), required=False)
    no_of_posts = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['id','user','username', 'first_name', 'last_name', 'display_name', 'date_of_birth', 'location','bio', 'instagram_link', 'facebook_link', 'youtube_link', 'tiktok_link', 'pinterest_link', 'twitter_link', 'threads_link', 'linkedin_link','additional_links', 'primary_interest', 'areas_of_interest', 'profile_pic','no_of_posts']

    def get_profile_pic(self, obj):
        request = self.context.get('request')
        if obj.profile_pic:
            profile_pic_url = obj.profile_pic.url
            return request.build_absolute_uri(profile_pic_url)
        return None

    def get_no_of_posts(self, obj):
        # Counting posts for the user associated with this profile
        return Post.objects.filter(user=obj.user).count()

class FollowersSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(source='user.id', read_only=True)
    display_name = serializers.CharField(source='follower.userprofile.display_name', read_only=True)
    following = serializers.CharField(source='following.userprofile.display_name', read_only=True)
    # profile_pic = serializers.ImageField(source='follower.userprofile.profile_pic', read_only=True)
    profile_pic = serializers.SerializerMethodField()
    user_id = serializers.IntegerField(source='follower.id', read_only=True)
    primary_interest = serializers.CharField(source='follower.userprofile.primary_interest', read_only=True)

    class Meta:
        model = UserRelationships
        fields = ['id', 'user_id','user', 'display_name', 'following', 'profile_pic', 'primary_interest']

    def get_profile_pic(self, obj):
        request = self.context.get('request')
        profile_pic_url = obj.follower.userprofile.profile_pic.url
        return request.build_absolute_uri(profile_pic_url)


class FollowingSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(source='user.id', read_only=True)
    follower = serializers.CharField(source='follower.userprofile.display_name', read_only=True)
    display_name = serializers.CharField(source='following.userprofile.display_name', read_only=True)
    # profile_pic = serializers.ImageField(source='following.userprofile.profile_pic', read_only=True)
    profile_pic = serializers.SerializerMethodField()
    user_id = serializers.IntegerField(source='following.id', read_only=True)
    primary_interest = serializers.CharField(source='following.userprofile.primary_interest', read_only=True)

    class Meta:
        model = UserRelationships
        fields = ['id','user_id', 'user', 'follower', 'display_name', 'profile_pic', 'primary_interest']

    def get_profile_pic(self, obj):
        request = self.context.get('request')
        profile_pic_url = obj.following.userprofile.profile_pic.url
        return request.build_absolute_uri(profile_pic_url)

    # def get_follower_count(self, obj):
    #     return UserRelationships.objects.filter(following=obj.following).count()

    # def get_following_count(self, obj):
    #     return UserRelationships.objects.filter(follower=obj.follower).count()