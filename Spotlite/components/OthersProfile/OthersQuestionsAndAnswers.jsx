import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const OthersQuestionsAndAnswers = ({ profile }) => {
  return (
    <View className="bg-white px-4 py-3 mt-3">
      <Text className="text-gray-800 font-semibold text-xl mb-3">
        More about {profile?.display_name}
      </Text>

      {profile?.questions_and_answers &&
      profile.questions_and_answers.length > 0 ? (
        profile.questions_and_answers.map((q_and_a, index) => (
          <View key={index} className="flex-row items-start mb-3">
            <Text className="font-semibold text-base text-gray-800 mr-2">
              {index + 1}.
            </Text>
            <View>
              <Text className="font-semibold text-base text-gray-800 mb-1">
                {q_and_a.question_text}
              </Text>
              <Text className="text-sm text-gray-800">
                {q_and_a.answer_text}
              </Text>
            </View>
          </View>
        ))
      ) : (
        <Text className="text-base text-gray-600 self-center">
          No Q&As added
        </Text>
      )}
    </View>
  );
};

export default OthersQuestionsAndAnswers;
