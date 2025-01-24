import { View, Text, ScrollView } from "react-native";
import React from "react";

const OthersInterests = ({ profile }) => {
  return (
    <View className="bg-white px-4 py-3 mb-2">
      <Text className="font-rregular font-bold text-xl mb-4 ">Interests</Text>

      {profile?.areas_of_interest && profile?.areas_of_interest.length > 0 ? (
        <View className="flex flex-row gap-2 flex-wrap">
          {Object.values(profile.areas_of_interest)
            .join(" ")
            .split(",")
            .map((interest, index) => (
              <View
                key={index}
                className="bg-gray-50 border border-gray-300 flex-wrap rounded-xl py-1 px-2"
              >
                <Text className="text-[16px]">
                  {interest.charAt(0).toUpperCase() + interest.slice(1)}
                </Text>
              </View>
            ))}
        </View>
      ) : (
        <Text className="text-[16px] text-gray-600 self-center">
          No interests added
        </Text>
      )}
    </View>
  );
};

export default OthersInterests;
