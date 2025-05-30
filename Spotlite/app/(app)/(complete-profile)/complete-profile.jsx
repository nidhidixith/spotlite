import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, TextInput, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { router } from "expo-router";

import { completeUserProfile } from "../../../slices/userProfileSlice";
import { handleDeleteUser } from "../../../utilities/handleDeleteUser";

import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import Step5 from "./step5";
import Step6 from "./step6";
import { useToast } from "../../../contexts/ToastContext";

const CompleteProfile = () => {
  const dispatch = useDispatch();

  const { showToast } = useToast();

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

  const handleSkip = () => {
    handleSubmit(formData);
  };

  // const handleSkip = (data) => {
  //   const updatedFormData = { ...formData, ...data };
  //   setFormData(updatedFormData);
  //   handleSubmit(updatedFormData);
  // };

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

      socialLinks,
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

      socialLinks,
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

    if (extractedData.socialLinks) {
      profileData.append("social_links", extractedData.socialLinks);
    }

    if (extractedData.additionalLinks) {
      profileData.append("additional_links", extractedData.additionalLinks);
    }

    profileData.append("areas_of_interest", extractedData.tags);

    if (extractedData.profile_pic) {
      profileData.append("profile_pic", extractedData.profile_pic);
    }

    try {
      const response = await dispatch(
        completeUserProfile(profileData)
      ).unwrap();
      if (response) {
        // Alert.alert("Profile Completion successful");
        showToast("Profile completion successful", "success");
        router.push("/(app)/(tabs)/home");
      }
    } catch (err) {
      const errorMessage =
        (typeof err === "string" && err) || // If `err` is a string, use it
        err?.message || // If `err` has a `message` property
        JSON.stringify(err) || // Convert `err` to string if it's an object
        "An unexpected error occurred. Try again later.";

      // Add "Please register again" to the error message
      const finalErrorMessage = `${errorMessage} Please register again.`;
      Alert.alert("Error", finalErrorMessage);
      handleDeleteUser(dispatch, router);
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
                handleSkip={handleSkip}
              />
            )}
            {currentStep === 5 && (
              <Step5
                handlePrevStep={handlePrevStep}
                handleNextStep={handleNextStep}
                handleSkip={handleSkip}
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
