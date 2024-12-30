import { View, Text } from "react-native";
import React from "react";

const profile = {
  username: "testuser1@company.com",
  location: "Chikkamagaluru",
  date_of_birth: "15-05-1997",
};

const UserInfo = ({ profile }) => {
  return (
    <View className="bg-white px-4 py-3 mb-2">
      <Text className="font-rregular font-bold text-xl mb-4 ">
        Personal Information
      </Text>
      <View className="flex flex-row flex-wrap  mb-1">
        <Text className="font-semibold text-sm">Email Address/Username: </Text>
        <Text className="text-sm">{profile?.username}</Text>
      </View>

      {profile?.location && (
        <View className="flex flex-row flex-wrap  mb-1">
          <Text className="font-semibold text-sm">Location: </Text>
          <Text className="text-sm">{profile?.location}</Text>
        </View>
      )}

      <View className="flex flex-row flex-wrap  mb-1">
        <Text className="font-semibold text-sm">Date of birth: </Text>
        <Text className="text-sm">{profile?.date_of_birth}</Text>
      </View>
    </View>
  );
};

export default UserInfo;
