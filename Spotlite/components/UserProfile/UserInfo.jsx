import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

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

      <View className="flex flex-row flex-wrap  mb-1">
        <Text className="font-semibold text-sm">Location: </Text>
        {profile?.location ? (
          <Text className="text-sm">{profile?.location}</Text>
        ) : (
          <TouchableOpacity
            onPress={() => router.push("(app)/(edit-profile)/edit-details")}
          >
            <Text className="text-sm text-sky-600">Add your location</Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="flex flex-row flex-wrap  mb-1">
        <Text className="font-semibold text-sm">Date of birth: </Text>
        {profile?.date_of_birth ? (
          <Text className="text-sm">{profile?.date_of_birth}</Text>
        ) : (
          <TouchableOpacity
            onPress={() => router.push("(app)/(edit-profile)/edit-details")}
          >
            <Text className="text-sm text-sky-600">Add your date of birth</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default UserInfo;
