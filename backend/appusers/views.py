from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.db.models import F
import json
from django.http import JsonResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .models import UserProfile, SocialLink, AdditionalLink, Question, Answer
from .serializers import UserProfileSerializer, SocialLinkSerializer, AdditionalLinkSerializer,QuestionSerializer, AnswerSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    # Extract username,password from request data
    username = request.data.get('username')
    password = request.data.get('password')

    # Check if username already exists
    if User.objects.filter(username=username).exists():
      print('Username already exists')
      return Response({'error':'The username is already registered. Please log in or use a different email ID to register.'}, status=status.HTTP_400_BAD_REQUEST)

    # Create user with hashed password
    user = User.objects.create_user(username=username, password=password)

    # Authenticate the user using built-in method
    user = authenticate(username=username, password=password)

    # Get the token pair (access and refresh token)
    token_obtain_pair_view = TokenObtainPairView.as_view()
    return token_obtain_pair_view(request._request)
    
    
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensure the user is authenticated
def logout_user(request):
    if 'refresh_token' not in request.data:
        return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)
    refresh_token = request.data['refresh_token']
    
    try:
        token = RefreshToken(refresh_token)
        token.blacklist()  # Blacklist the refresh token
        return Response({"message": "Successfully logged out"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def complete_user_profile(request):
#     user = request.user
#     user_profile, created = UserProfile.objects.get_or_create(user=user)

#     # Use the serializer to update the user profile fields
#     serializer = UserProfileSerializer(user_profile, data=request.data, partial=True,context={'request': request})
    
#     # Validate and save the serializer
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     else:
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_user_profile(request):
    user = request.user
    data = request.data
    user_profile, created = UserProfile.objects.get_or_create(user=user)

    if 'social_links' in data:
        social_links_data = data['social_links']
        print("Social links: ", social_links_data)
        try:
            social_links = json.loads(social_links_data)  # Parse the JSON string into a Python list
            
            for link in social_links:
                serializer = SocialLinkSerializer(data=link, partial=True)
                if serializer.is_valid():
                    serializer.save(user_profile=user_profile)
                else:
                    print("Validation Error:", serializer.errors)  # For debugging
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except json.JSONDecodeError as e:
            return Response(
                {"error": f"Failed to parse social links: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": f"Failed to update social links: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
    # Handle Additional Links
    if 'additional_links' in data:
        additional_links_data = data['additional_links']
        print("Additional links: ", additional_links_data)
        try:
            additional_links = json.loads(additional_links_data)  

            for link in additional_links:
                serializer = AdditionalLinkSerializer(data=link, partial=True)
                if serializer.is_valid():
                    serializer.save(user_profile=user_profile)  # Associate user_profile explicitly
                else:
                    print("Validation Error:", serializer.errors)  # For debugging
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except json.JSONDecodeError as e:
            return Response(
                {"error": f"Failed to parse additional links: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": f"Failed to update additional links: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )


    # Use the serializer to update the user profile fields
    serializer = UserProfileSerializer(user_profile, data=request.data, partial=True,context={'request': request})
    
    # Validate and save the serializer
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def question_list(request):
    questions = Question.objects.all()
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_or_update_answers(request):
    answers_data = request.data.getlist('answers')  # 'answers' is the name in FormData

    for answer_data in answers_data:
        try:
            answer_data = json.loads(answer_data)
            question_id = answer_data['questionId']
            answer_text = answer_data['answer']

            # Validate and get the question object
            question = Question.objects.get(id=question_id)

            # If the answer is empty, delete the existing answer
            if not answer_text.strip():
                Answer.objects.filter(
                    user_profile=request.user.userprofile,
                    question=question,
                ).delete()
                continue  # Move to the next answer

            # Otherwise, create or update the answer
            Answer.objects.update_or_create(
                user_profile=request.user.userprofile,
                question=question,
                defaults={'answer': answer_text},
            )
        except Question.DoesNotExist:
            return Response({'error': f'Question with ID {question_id} does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response({'message': 'Answers updated successfully!'}, status=status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    user_profile = UserProfile.objects.get(user=request.user)
    # user_profile = get_object_or_404(UserProfile, user__id=userId)
    serializer = UserProfileSerializer(user_profile,context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_other_user_profile(request, userId):
    user_profile = get_object_or_404(UserProfile, user__id=userId)
    serializer = UserProfileSerializer(user_profile,context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def edit_profile(request):
    user = request.user
    data = request.data
    print("Data: ",data)
    user_profile = UserProfile.objects.get(user=user)

    # Remove profile picture if requested
    remove_profile_pic = data.get('remove_profile_pic', False)
    if remove_profile_pic and user_profile.profile_pic:
        user_profile.profile_pic = None
        user_profile.save()

    if 'social_links' in data:
        social_links_data = data['social_links']
        print("Social links: ", social_links_data)
        try:
            social_links = json.loads(social_links_data)  # Parse the JSON string into a Python list
            
            # First, collect all the valid social links
            valid_links = []
            
            for link in social_links:
                serializer = SocialLinkSerializer(data=link, partial=True)
                if serializer.is_valid():
                    valid_links.append(serializer)
                else:
                    print("Validation Error:", serializer.errors)  # For debugging
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # Now, proceed to delete the old social links only if all new links are valid
            user_profile.social_links.all().delete()
            
            # Add the valid social links
            for serializer in valid_links:
                serializer.save(user_profile=user_profile)  # Associate user_profile explicitly

        except json.JSONDecodeError as e:
            return Response(
                {"error": f"Failed to parse social links: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": f"Failed to update social links: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
    # Handle Additional Links
    if 'additional_links' in data:
        additional_links_data = data['additional_links']
        print("Additional links: ", additional_links_data)
        try:
            additional_links = json.loads(additional_links_data)  # Parse the JSON string into a Python list
            valid_links = []

            for link in additional_links:
                serializer = AdditionalLinkSerializer(data=link, partial=True)
                if serializer.is_valid():
                    valid_links.append(serializer)
                else:
                    print("Validation Error:", serializer.errors)  # For debugging
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            # Now, proceed to delete the old social links only if all new links are valid
            user_profile.additional_links.all().delete()
            
            # Add the valid social links
            for serializer in valid_links:
                serializer.save(user_profile=user_profile)  # Associate user_profile explicitly
        except json.JSONDecodeError as e:
            return Response(
                {"error": f"Failed to parse additional links: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"error": f"Failed to update additional links: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST
            )

    # Update UserProfile fields
    serializer = UserProfileSerializer(
        user_profile, data=data, partial=True, context={'request': request}
    )
    if serializer.is_valid():
        print("Serializer v data: ",serializer.validated_data)

        serializer.save()
        print("Serializer: ",serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_user(request):
    print("Request data is: ",request.data)
    try:
        user = request.user
    except User.DoesNotExist:
        return Response({"error": "User not found."}, status=status.HTTP_404_NOT_FOUND)

    if 'refresh_token' not in request.data:
        return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)
    refresh_token = request.data['refresh_token']
    
    try:
        token = RefreshToken(refresh_token)
        token.blacklist()  # Blacklist the refresh token
        user.delete()
        return Response({"message": "User deleted successfully."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def success(request):
    return JsonResponse('Success..Yay!',safe=False) 



# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def edit_profile(request):
#     user = request.user
#     data = request.data
#     user_profile = UserProfile.objects.get(user=user)

#     remove_profile_pic = data.get('remove_profile_pic', False)
#     serializer = UserProfileSerializer(user_profile, data=data, partial=True,context={'request': request})

#     if remove_profile_pic:
#         if user_profile.profile_pic:
#             user_profile.profile_pic = None
#             user_profile.save()
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     else:
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def edit_profile(request):
#     user = request.user
#     data = request.data
#     user_profile = UserProfile.objects.get(user=user)

#     # Remove profile picture if requested
#     remove_profile_pic = data.get('remove_profile_pic', False)
#     if remove_profile_pic and user_profile.profile_pic:
#         user_profile.profile_pic = None
#         user_profile.save()

#     # Handle Social Links
#     social_links_data = data.get('social_links', '[]')  # Default to empty list if not provided
#     print("Social links: ",social_links_data)

#     if social_links_data != []:
#         try:
#             social_links = json.loads(social_links_data)  # Parse the JSON string into a Python list
#             # Clear existing links to update with new ones
#             user_profile.social_links.all().delete()
#             # Add updated social links
#             for link in social_links:
#                 platform = link.get('platform')
#                 url = link.get('url')
#                 if platform and url:
#                     SocialLink.objects.create(
#                         user_profile=user_profile,
#                         platform=platform,
#                         url=url
#                     )
#         except json.JSONDecodeError as e:
#             return Response(
#                 {"error": f"Failed to parse social links: {str(e)}"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
#         except Exception as e:
#             return Response(
#                 {"error": f"Failed to update social links: {str(e)}"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#     # Handle Additional Links
#     additional_links_data = data.get('additional_links', '[]')  # Default to empty list if not provided
#     print("Additional links: ",additional_links_data)
#     if additional_links_data != []: 
#         try:
#             additional_links = json.loads(additional_links_data)  # Parse the JSON string into a Python list
#             # Clear existing additional links to update with new ones
#             user_profile.additional_links.all().delete()
#             # Add updated additional links
#             for link in additional_links:
#                 url = link.get('url')
#                 description = link.get('description', '')  # Description is optional
#                 if url and description:
#                     AdditionalLink.objects.create(
#                         user_profile=user_profile,
#                         url=url,
#                         description=description
#                     )
#         except json.JSONDecodeError as e:
#             return Response(
#                 {"error": f"Failed to parse additional links: {str(e)}"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )
#         except Exception as e:
#             return Response(
#                 {"error": f"Failed to update additional links: {str(e)}"},
#                 status=status.HTTP_400_BAD_REQUEST
#             )

#     # Update UserProfile fields
#     serializer = UserProfileSerializer(
#         user_profile, data=data, partial=True, context={'request': request}
#     )
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_answer(request):
#     # List to store answers
#     answers_data = request.data.getlist('answers')  # 'answers' is the name in FormData

#     # Validate and save each answer
#     for answer_data in answers_data:
#         try:
#             answer_data = json.loads(answer_data)  # Convert the stringified answer data back to an object
#             question_id = answer_data['questionId']
#             answer_text = answer_data['answer']
#             question = Question.objects.get(id=question_id)
#             answer = Answer.objects.create(
#                 user_profile=request.user.userprofile,
#                 question=question,
#                 answer=answer_text,
#             )
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

#     return Response({'message': 'Answers submitted successfully!'}, status=status.HTTP_201_CREATED)


# def create_answer(request):
#     serializer = AnswerSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save(user_profile=request.user.userprofile)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)