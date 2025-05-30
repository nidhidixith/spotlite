from rest_framework import serializers
from .models import Event, EventMedia, EventInterest, EventComments
from appusers.models import UserProfile
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User
from django.utils import timezone



class UserProfileSerializer(serializers.ModelSerializer):
    display_name = serializers.ReadOnlyField(source='user.userprofile.display_name')
    profile_pic = serializers.ImageField(source='user.userprofile.profile_pic')

    class Meta:
        model = UserProfile
        fields = ['display_name', 'profile_pic']
        
        
class EventMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventMedia
        fields = ['id', 'media_file', 'event']
    
    

class EventSerializer(serializers.ModelSerializer):
    media_files = EventMediaSerializer(many=True)
    uploaded_files = serializers.ListField(child=serializers.FileField(max_length=100000, allow_empty_file=True), required=False)
    
    user_id = serializers.ReadOnlyField(source='user.id')
    display_name = serializers.ReadOnlyField(source='user.userprofile.display_name')
    profile_pic = serializers.ImageField(source='user.userprofile.profile_pic')

    interested_count = serializers.SerializerMethodField()
    is_interested = serializers.SerializerMethodField()
    content_type = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ['id', 'user', 'user_id', 'display_name', 'profile_pic', 'uploaded_files','media_files', 'event_title', 'event_domain', 'event_description','event_date','event_time', 'event_location','event_location_latitude', 'event_location_longitude', 'event_link','created_at','interested_count','is_interested','content_type']

    def create(self, validated_data):
        uploaded_files = validated_data.pop("uploaded_files", None)
        event = Event.objects.create(**validated_data)
    
        if uploaded_files:
            for file in uploaded_files:
                EventMedia.objects.create(event=event, media_file=file)
        
        return event

    def validate_event_date(self, value):
        if value and value < timezone.now().date():
            raise serializers.ValidationError("Event date cannot be in the past.")
        return value

    def get_profile_pic(self, obj):
        request = self.context.get('request')
        profile_pic_url = obj.user.userprofile.profile_pic.url
        return request.build_absolute_uri(profile_pic_url)

    
    def get_interested_count(self, obj):
        return EventInterest.objects.filter(event=obj).count()
    
    def get_is_interested(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            current_user = request.user
            return EventInterest.objects.filter(user=current_user, event=obj).exists()
        return False

    def get_content_type(self, obj):
        return "event"

    def update(self, instance, validated_data):
        media_data = validated_data.pop('media_files', [])
        instance.text = validated_data.get('text', instance.text)
        instance.event_location = validated_data.get('event_location', instance.event_location)
        instance.event_datetime = validated_data.get('event_datetime', instance.event_datetime)
        instance.event_link = validated_data.get('event_link', instance.event_link)
        instance.save()

        instance.media_files.clear()
        for media_files in media_data:
            EventMedia.objects.create(event=instance, **media_files)
        return instance


class EventSerializerWeb(serializers.ModelSerializer):
    media_files = EventMediaSerializer(many=True)
    uploaded_files = serializers.ListField(child=serializers.FileField(max_length=100000, allow_empty_file=True), required=False)
    
    user_id = serializers.ReadOnlyField(source='user.id')
    display_name = serializers.ReadOnlyField(source='user.userprofile.display_name')
    profile_pic = serializers.ImageField(source='user.userprofile.profile_pic')

    interested_count = serializers.SerializerMethodField()
    content_type = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = ['id', 'user', 'user_id', 'display_name', 'profile_pic', 'uploaded_files','media_files', 'event_title', 'event_domain', 'event_description','event_date','event_time', 'event_location','event_link','created_at','interested_count','content_type']

    

    def get_profile_pic(self, obj):
        request = self.context.get('request')
        profile_pic_url = obj.user.userprofile.profile_pic.url
        return request.build_absolute_uri(profile_pic_url)

    
    def get_interested_count(self, obj):
        return EventInterest.objects.filter(event=obj).count()
    
    

    def get_content_type(self, obj):
        return "event"

   



class EventInterestSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(source='user.userprofile.display_name', read_only=True)
    profile_pic = serializers.SerializerMethodField()
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    primary_interest = serializers.CharField(source='user.userprofile.primary_interest', read_only=True)
    
    class Meta:
        model = EventInterest
        fields = ['id','user_id','user','display_name','profile_pic','primary_interest','event']

    def get_profile_pic(self, obj):
        request = self.context.get('request')
        profile_pic_url = obj.user.userprofile.profile_pic.url
        return request.build_absolute_uri(profile_pic_url)


class EventCommentSerializer(serializers.ModelSerializer):
    display_name = serializers.CharField(source='user.userprofile.display_name', read_only=True)
    profile_pic = serializers.SerializerMethodField()
    user_id = serializers.IntegerField(source='user.id', read_only=True)
    event_owner_id = serializers.IntegerField(source='event.user.id', read_only=True)
    primary_interest = serializers.CharField(source='user.userprofile.primary_interest', read_only=True)

    class Meta:
        model = EventComments
        fields = ['id','user_id','event_owner_id','user','display_name','event','event_media','profile_pic','text','primary_interest','created_at']

    def get_profile_pic(self, obj):
        request = self.context.get('request')
        profile_pic_url = obj.user.userprofile.profile_pic.url
        return request.build_absolute_uri(profile_pic_url)