import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TextInput, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { Link, router } from "expo-router";
import { completeUserProfile } from "../../../slices/userProfileSlice";
import { connectWebSocket } from "../../../utilities/websocket";

import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Step6 from "./step6";

const CompleteProfile = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  const { profileCompletionError } = useSelector(
    (state) => state.profile.userProfile
  );

  const handleNextStep = (data) => {
    const updatedFormData = { ...formData, ...data };
    setFormData(updatedFormData);
    if (currentStep === totalSteps) {
      handleSubmit(updatedFormData); // Pass updated data directly to handleSubmit
    } else if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (data) => {
    // Receive updated data as parameter
    const {
      firstName,
      lastName,
      displayName,
      dob,
      location,
      primary_interest,
      bio,
      instagramLink,
      facebookLink,
      youtubeLink,
      tiktokLink,
      pinterestLink,
      twitterLink,
      threadsLink,
      linkedInLink,
      additionalLinks,
      tags,
      profile_pic,
    } = data; // Use received data

    const extractedData = {
      firstName,
      lastName,
      displayName,
      dob,
      location,
      bio,
      instagramLink,
      facebookLink,
      youtubeLink,
      tiktokLink,
      pinterestLink,
      twitterLink,
      threadsLink,
      linkedInLink,
      additionalLinks,
      primary_interest,
      tags,
      profile_pic,
    };

    const profileData = new FormData();

    profileData.append("first_name", extractedData.firstName);
    profileData.append("last_name", extractedData.lastName);
    profileData.append("display_name", extractedData.displayName);
    profileData.append("date_of_birth", extractedData.dob);
    if (extractedData.location) {
      profileData.append("location", extractedData.location);
    }
    profileData.append("primary_interest", extractedData.primary_interest);
    profileData.append("bio", extractedData.bio);

    if (extractedData.instagramLink) {
      profileData.append("instagram_link", extractedData.instagramLink);
    }
    if (extractedData.facebookLink) {
      profileData.append("facebook_link", extractedData.facebookLink);
    }
    if (extractedData.youtubeLink) {
      profileData.append("youtube_link", extractedData.youtubeLink);
    }
    if (extractedData.tiktokLink) {
      profileData.append("tiktok_link", extractedData.tiktokLink);
    }
    if (extractedData.pinterestLink) {
      profileData.append("pinterest_link", extractedData.pinterestLink);
    }
    if (extractedData.twitterLink) {
      profileData.append("twitter_link", extractedData.twitterLink);
    }
    if (extractedData.threadsLink) {
      profileData.append("threads_link", extractedData.threadsLink);
    }
    if (extractedData.linkedInLink) {
      profileData.append("linkedin_link", extractedData.linkedInLink);
    }

    if (extractedData.additionalLinks.length > 0) {
      profileData.append("additional_links", extractedData.additionalLinks);
    }

    profileData.append("areas_of_interest", extractedData.tags);

    if (extractedData.profile_pic) {
      profileData.append("profile_pic", extractedData.profile_pic);
    }

    console.log("Extracted data:", extractedData);
    // router.push("/(app)/(tabs)/home");
    try {
      const response = await dispatch(
        completeUserProfile(profileData)
      ).unwrap();
      if (response) {
        Alert.alert("Profile Completion successful");
        connectWebSocket();
        router.push("/(app)/(tabs)/home");
      }
    } catch (error) {
      console.error("Error:", error.response);
      Alert.alert("Profile Completion failed", "Please try again.");
      // router.push("/(auth)/signup");
    }
  };

  return (
    <SafeAreaView className="bg-gray-100 flex-1 justify-center p-2">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View className="bg-white p-4 rounded-lg">
          <View>
            <Text className="text-right mb-1">
              {currentStep}/{totalSteps}
            </Text>
          </View>

          <View>
            {/* Content for each step */}
            {currentStep === 1 && <Step1 handleNextStep={handleNextStep} />}
            {currentStep === 2 && (
              <Step2
                handlePrevStep={handlePrevStep}
                handleNextStep={handleNextStep}
              />
            )}
            {currentStep === 3 && (
              <Step3
                handlePrevStep={handlePrevStep}
                handleNextStep={handleNextStep}
              />
            )}
            {currentStep === 4 && (
              <Step4
                handlePrevStep={handlePrevStep}
                handleNextStep={handleNextStep}
              />
            )}
            {currentStep === 5 && (
              <Step5
                handlePrevStep={handlePrevStep}
                handleNextStep={handleNextStep}
              />
            )}
            {currentStep === 6 && (
              <Step6
                handlePrevStep={handlePrevStep}
                handleNextStep={handleNextStep}
              />
            )}
          </View>
        </View>
        {profileCompletionError && (
          <Text className="font-rregular text-red-500">
            {profileCompletionError.detail}
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CompleteProfile;
