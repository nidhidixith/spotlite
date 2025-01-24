import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const QuestionsAndAnswers = ({ profile }) => {
  return (
    <View className="bg-white px-4 py-3 mb-2">
      <Text className="font-rregular font-bold text-xl mb-4 ">
        More about me
      </Text>

      {profile?.questions_and_answers &&
      profile.questions_and_answers.length > 0 ? (
        profile.questions_and_answers.map((q_and_a, index) => (
          <View key={index} className="flex-row items-start mb-4">
            <Text className="text-xl text-gray-800 mr-2">•</Text>
            <View>
              <Text className="text-[16px]  font-semibold mb-1">
                {q_and_a.question_text}
              </Text>
              <Text className="text-[14px] text-gray-700">
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
          <Text className="text-[16px] text-sky-600 self-center">
            Add some Q&As about you
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default QuestionsAndAnswers;
