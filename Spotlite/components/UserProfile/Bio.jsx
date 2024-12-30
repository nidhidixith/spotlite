import { View, Text } from "react-native";
import React from "react";

const Bio = ({ profile }) => {
  return (
    <View className="bg-white px-4 py-3 mb-2">
      <Text className="font-rregular font-bold text-xl mb-3">About</Text>
      <Text className="font-rregular text-[15px] text-justify text-gray-600">
        {profile?.bio}
      </Text>
    </View>
  );
};

export default Bio;
