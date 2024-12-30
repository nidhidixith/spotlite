import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { Link, router } from "expo-router";

const Step1 = ({ handleNextStep }) => {
  return (
    <>
      <Text className="text-2xl font-semibold text-center mb-5">
        Welcome to Spotlite
      </Text>

      <Text className="mb-3 text-justify text-sm">
        We're thrilled to have you join on Spotlite, the ultimate hub for
        artists and content creators from various domains. Completing your
        profile is the first step towards unlocking a world of opportunities and
        connections.
      </Text>
      <Text className="mb-3 text-justify text-sm">
        Your profile is your canvas – a space to showcase your talents,
        passions, and creativity. By completing your profile, you not only
        enhance your visibility but also connect with like-minded individuals,
        potential collaborators, and fans who appreciate your unique skills.
      </Text>

      <Text className="mb-3 text-justify text-sm">
        Let's get started! Click 'Next' to begin shaping your artistic presence
        on Artists-Central. Your creative community awaits!
      </Text>

      <TouchableOpacity
        className="bg-sky-600 w-full mt-5 rounded-lg p-2"
        onPress={handleNextStep}
      >
        <Text className="text-white text-lg self-center">Next</Text>
      </TouchableOpacity>
    </>
  );
};

export default Step1;
