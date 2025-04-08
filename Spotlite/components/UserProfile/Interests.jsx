import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const Interests = ({ profile }) => {
  return (
    <View className="bg-white px-4 py-3 mb-3">
      <Text className="text-gray-800 font-semibold text-xl mb-3">
        Interests
      </Text>

      {profile?.areas_of_interest && profile?.areas_of_interest.length > 0 ? (
        <View className="flex flex-row gap-2 flex-wrap">
          {Object.values(profile.areas_of_interest)
            .join(" ")
            .split(",")
            .map((interest, index) => (
              <View
                key={index}
                className=" bg-gray-100 border border-gray-200 flex-wrap rounded-2xl py-1 px-3"
              >
                <Text className="text-sm font-medium text-gray-800">
                  {interest.charAt(0).toUpperCase() + interest.slice(1)}
                </Text>
              </View>
            ))}
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => router.push("(app)/(edit-profile)/edit-interests")}
        >
          <Text className="text-base text-sky-600 self-center">
            Add your interests
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Interests;
