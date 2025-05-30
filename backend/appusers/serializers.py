from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, SocialLink, AdditionalLink, Question, Answer
from posts.models import Post
from connections.models import UserRelation


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']  # Include other fields but exclude 'password'

class SocialLinkSerializer(serializers.ModelSerializer):
    # user_profile = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.all(), required=False)

    class Meta:
        model = SocialLink
        fields = ['platform', 'url']


class AdditionalLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdditionalLink
        fields = ['url', 'description']


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    user_id = serializers.CharField(source='user.id', read_only=True)
    profile_pic = serializers.ImageField(use_url=True, required=False)
    social_links = SocialLinkSerializer(many=True, read_only=True)
    additional_links = AdditionalLinkSerializer(many=True, read_only=True)
    areas_of_interest = serializers.ListField(child=serializers.CharField(), required=False)

    no_of_posts = serializers.SerializerMethodField()
    
    follower_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()

    questions_and_answers = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['id','user','user_id','username', 'first_name', 'last_name', 'display_name', 'date_of_birth', 'location','bio','social_links','additional_links','primary_interest', 'areas_of_interest', 'profile_pic','no_of_posts','follower_count','following_count','is_following','questions_and_answers']

    def validate_date_of_birth(self, value):
        # Check if the date_of_birth is not in the future
        if value and value > timezone.now().date():
            raise serializers.ValidationError("Date of birth cannot be in the future.")
        return value

    def get_profile_pic(self, obj):
        request = self.context.get('request')
        if obj.profile_pic:
            profile_pic_url = obj.profile_pic.url
            return request.build_absolute_uri(profile_pic_url)
        return None

    def get_no_of_posts(self, obj):
        # Counting posts for the user associated with this profile
        return Post.objects.filter(user=obj.user).count()

    def get_follower_count(self, obj):
        return UserRelation.objects.filter(following=obj.user).count()

    def get_following_count(self, obj):
        return UserRelation.objects.filter(follower=obj.user).count()

    def get_is_following(self, obj):
        request = self.context.get('request')
        if request and hasattr(request, 'user'):
            current_user = request.user
            return UserRelation.objects.filter(follower=current_user, following=obj.user).exists()
        return False

    def get_questions_and_answers(self, obj):
        answers = Answer.objects.filter(user_profile=obj).select_related('question')
        # return [
        #     {
        #         "question": QuestionSerializer(answer.question).data,
        #         "answer": AnswerSerializer(answer).data
        #     }
        #     for answer in answers
        # ]
        return [
        {
            "question_id": answer.question.id,
            "question_text": answer.question.text,  # Displaying the question text
            "answer_text": answer.answer  # Displaying the answer
        }
        for answer in answers
    ]


class UserProfileSerializerForWeb(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    user_id = serializers.CharField(source='user.id', read_only=True)
    profile_pic = serializers.ImageField(use_url=True, required=False)
    social_links = SocialLinkSerializer(many=True, read_only=True)
    additional_links = AdditionalLinkSerializer(many=True, read_only=True)
    areas_of_interest = serializers.ListField(child=serializers.CharField(), required=False)

    no_of_posts = serializers.SerializerMethodField()
    
    follower_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    questions_and_answers = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['id','user','user_id','username', 'first_name', 'last_name', 'display_name', 'date_of_birth', 'location','bio','social_links','additional_links','primary_interest', 'areas_of_interest', 'profile_pic','no_of_posts','follower_count','following_count','questions_and_answers']

    def get_profile_pic(self, obj):
        request = self.context.get('request')
        if obj.profile_pic:
            profile_pic_url = obj.profile_pic.url
            return request.build_absolute_uri(profile_pic_url)
        return None

    def get_no_of_posts(self, obj):
        # Counting posts for the user associated with this profile
        return Post.objects.filter(user=obj.user).count()

    def get_follower_count(self, obj):
        return UserRelation.objects.filter(following=obj.user).count()

    def get_following_count(self, obj):
        return UserRelation.objects.filter(follower=obj.user).count()

    

    def get_questions_and_answers(self, obj):
        answers = Answer.objects.filter(user_profile=obj).select_related('question')
        # return [
        #     {
        #         "question": QuestionSerializer(answer.question).data,
        #         "answer": AnswerSerializer(answer).data
        #     }
        #     for answer in answers
        # ]
        return [
        {
            "question_id": answer.question.id,
            "question_text": answer.question.text,  # Displaying the question text
            "answer_text": answer.answer  # Displaying the answer
        }
        for answer in answers
    ]


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['id', 'text']

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['id', 'question', 'answer', 'user_profile']