from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post, PostMedia, Likes, Comments
from appusers.models import UserProfile

class PostMediaSerializer(serializers.ModelSerializer):
    like_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = PostMedia
        fields = ['id', 'media_file', 'post', 'like_count','is_liked','comment_count']
    
    def get_like_count(self, obj):
        return Likes.objects.filter(post_media=obj).count()

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            current_user = request.user
            return Likes.objects.filter(user=current_user, post_media=obj).exists()
        return False

    def get_comment_count(self, obj):
        return Comments.objects.filter(post_media=obj).count()




class PostsSerializer(serializers.ModelSerializer):
    media_files =  PostMediaSerializer(many=True, read_only=True)
    uploaded_files = serializers.ListField(child=serializers.FileField(max_length=100000, allow_empty_file=True), required=False)

    display_name = serializers.CharField(source='user.userprofile.display_name', read_only=True)
    profile_pic = serializers.SerializerMethodField()
    # profile_pic = serializers.ImageField(source='user.userprofile.profile_pic', read_only=True)
    user_id = serializers.IntegerField(source='user.id', read_only=True)

    like_count = serializers.SerializerMethodField()
    comment_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'user', 'user_id', 'display_name', 'profile_pic', 'text', 'created_at', 'media_files', 'uploaded_files','like_count','is_liked','comment_count']


    def get_profile_pic(self, obj):
        request = self.context.get('request')
        profile_pic_url = obj.user.userprofile.profile_pic.url
        return request.build_absolute_uri(profile_pic_url)

    def get_like_count(self, obj):
        return Likes.objects.filter(post=obj).count()
    
    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            current_user = request.user
            return Likes.objects.filter(user=current_user, post=obj).exists()
        return False

    def get_comment_count(self, obj):
        return Comments.objects.filter(post=obj).count()


    def create(self, validated_data):
        uploaded_files = validated_data.pop("uploaded_files", None)
        post = Post.objects.create(**validated_data)
        if uploaded_files:
            for file in uploaded_files:
                PostMedia.objects.create(post=post, media_file=file)
        
        return post

        
class LikeSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(source='user.userprofile.display_name', read_only=True)
    profile_pic = serializers.SerializerMethodField()
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    primary_interest = serializers.CharField(source='user.userprofile.primary_interest', read_only=True)
    
    class Meta:
        model = Likes
        fields = ['id','user_id','user','display_name','post','post_media','profile_pic','primary_interest']

    def get_profile_pic(self, obj):
        request = self.context.get('request')
        profile_pic_url = obj.user.userprofile.profile_pic.url
        return request.build_absolute_uri(profile_pic_url)
        

class CommentSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(source='user.userprofile.display_name', read_only=True)
    profile_pic = serializers.SerializerMethodField()
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    primary_interest = serializers.CharField(source='user.userprofile.primary_interest', read_only=True)

    class Meta:
        model = Comments
        fields = ['id','user_id','user','display_name','post','post_media','profile_pic','text','primary_interest','created_at']

    def get_profile_pic(self, obj):
        request = self.context.get('request')
        profile_pic_url = obj.user.userprofile.profile_pic.url
        return request.build_absolute_uri(profile_pic_url)

        
