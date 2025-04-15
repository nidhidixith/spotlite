import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Step1 = ({ handleNextStep }) => {
  return (
    <>
      <Text className="text-2xl text-gray-800 font-semibold text-center mb-5">
        Welcome to Spotlite
      </Text>

      <Text className="mb-3 text-justify text-sm">
        We're thrilled to have you join on Spotlite, the ultimate hub for
        artists and content creators from various domains. Completing your
        profile is the first step towards unlocking a world of opportunities and
        connections.
      </Text>
      <Text className="mb-3 text-justify text-sm">
        Your profile is your canvas – a space to showcase you-your art, talents,
        passions, and creativity. By completing your profile, you not only
        enhance your visibility but also connect with like-minded individuals,
        potential collaborators, and fans who appreciate your unique skills.
      </Text>

      <Text className="mb-3 text-justify text-sm">
        Let's get started! Click 'Next' to begin shaping your presence on
        Spotlite. Your creative community awaits!
      </Text>

      <TouchableOpacity
        className="bg-sky-600 w-full max-w-md mx-auto mt-5 rounded-lg py-2"
        onPress={handleNextStep}
      >
        <Text className="text-white text-lg font-medium self-center">Next</Text>
      </TouchableOpacity>
    </>
  );
};

export default Step1;
