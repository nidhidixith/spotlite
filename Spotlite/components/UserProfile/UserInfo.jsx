import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const UserInfo = ({ profile }) => {
  return (
    <View className="bg-white px-4 py-3">
      <Text className="text-gray-800 font-semibold text-xl mb-3">
        Personal Information
      </Text>
      <View className="flex flex-row flex-wrap  mb-1">
        <Text className="font-semibold text-base text-gray-800">
          Email Address/Username:{" "}
        </Text>
        <Text className="text-base text-gray-800">{profile?.username}</Text>
      </View>

      <View className="flex flex-row flex-wrap  mb-1">
        <Text className="font-semibold text-base text-gray-800">
          Location:{" "}
        </Text>
        {profile?.location ? (
          <Text className="text-base text-gray-800">{profile?.location}</Text>
        ) : (
          <TouchableOpacity
            onPress={() => router.push("(app)/(edit-profile)/edit-details")}
          >
            <Text className="text-base text-sky-600">Add your location</Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="flex flex-row flex-wrap  mb-1">
        <Text className="font-semibold text-base text-gray-800">
          Date of birth:{" "}
        </Text>
        {profile?.date_of_birth ? (
          <Text className="text-base text-gray-800">
            {profile?.date_of_birth}
          </Text>
        ) : (
          <TouchableOpacity
            onPress={() => router.push("(app)/(edit-profile)/edit-details")}
          >
            <Text className="text-base text-sky-600">
              Add your date of birth
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default UserInfo;
