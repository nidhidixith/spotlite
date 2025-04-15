import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const QuestionsAndAnswers = ({ profile }) => {
  return (
    <View className="bg-white px-4 py-3 mt-3">
      <Text className="text-gray-800 font-semibold text-xl mb-3">
        More about me
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
        <TouchableOpacity
          onPress={() =>
            router.push("(app)/(edit-profile)/edit-questions-and-answers")
          }
        >
          <Text className="text-base text-sky-600 self-center">
            Add some Q&As about you
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default QuestionsAndAnswers;
