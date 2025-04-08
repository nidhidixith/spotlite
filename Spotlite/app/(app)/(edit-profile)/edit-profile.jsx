import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";

import { selectUserProfile } from "../../../slices/userProfileSlice";

const EditProfile = () => {
  const profile = useSelector(selectUserProfile);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "white",
      }}
    >
      <View className="border-b-2 border-gray-100 pb-3">
        <View className="flex flex-row justify-between">
          <Text className="text-gray-800 font-semibold text-lg">
            Profile Picture
          </Text>

          {/* <Text className="text-xl font-bold">Profile Picture</Text> */}
          <TouchableOpacity
            onPress={() =>
              router.push("(app)/(edit-profile)/edit-profile-picture")
            }
          >
            <Text className="text-base text-sky-600">Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="border-b-2 border-gray-100  py-3">
        <View className="flex flex-row justify-between mb-2">
          <Text className="text-gray-800 font-semibold text-lg">Details</Text>

          <TouchableOpacity
            onPress={() => router.push("(app)/(edit-profile)/edit-details")}
          >
            <Text className="text-base text-sky-600">Edit</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => router.push("(app)/(edit-profile)/edit-details")}
          className="mb-2"
        >
          <Text className="text-base text-gray-500">Display name</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("(app)/(edit-profile)/edit-details")}
          className="mb-2"
        >
          <Text className="text-base text-gray-500">
            Primary interest/Profession
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("(app)/(edit-profile)/edit-details")}
          className="mb-2"
        >
          <Text className="text-base text-gray-500">Location</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("(app)/(edit-profile)/edit-details")}
        >
          <Text className="text-base text-gray-500">Date of birth</Text>
        </TouchableOpacity>
      </View>

      <View className="border-b-2 border-gray-100  py-3">
        <View className="flex flex-row justify-between mb-2">
          <Text className="text-gray-800 font-semibold text-lg">Bio</Text>
          <TouchableOpacity
            onPress={() => router.push("(app)/(edit-profile)/edit-bio")}
          >
            <Text className="text-base text-sky-600">Edit</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => router.push("(app)/(edit-profile)/edit-bio")}
        >
          <Text className="text-base text-gray-500 self-center">
            Add/Edit your bio
          </Text>
        </TouchableOpacity>
      </View>

      <View className="border-b-2 border-gray-100 py-3">
        <View className="flex flex-row justify-between">
          <Text className="text-gray-800 font-semibold text-lg">
            Social Links
          </Text>
          <TouchableOpacity
            onPress={() => router.push("(app)/(edit-profile)/edit-links")}
          >
            <Text className="text-base text-sky-600">Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="border-b-2 border-gray-100 py-3">
        <View className="flex flex-row justify-between">
          <Text className="text-gray-800 font-semibold text-lg">Website</Text>
          <TouchableOpacity
            onPress={() => router.push("(app)/(edit-profile)/edit-websites")}
          >
            <Text className="text-base text-sky-600">Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="border-b-2 border-gray-100 py-3">
        <View className="flex flex-row justify-between ">
          <Text className="text-gray-800 font-semibold text-lg">Interests</Text>
          <TouchableOpacity
            onPress={() => router.push("(app)/(edit-profile)/edit-interests")}
          >
            <Text className="text-base text-sky-600">Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="border-b-2 border-gray-100 py-3">
        <View className="flex flex-row justify-between ">
          <Text className="text-gray-800 font-semibold text-lg">Q&As</Text>
          <TouchableOpacity
            onPress={() =>
              router.push("(app)/(edit-profile)/edit-questions-and-answers")
            }
          >
            <Text className="text-base text-sky-600">Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfile;
