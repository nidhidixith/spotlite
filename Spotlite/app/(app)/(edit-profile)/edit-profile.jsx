import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchUserProfile,
  clearUserProfile,
  selectUserProfile,
} from "../../../slices/userProfileSlice";

import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

const EditProfile = () => {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState(null);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchUserProfile());

  //   // return () => {
  //   //   dispatch(clearUserProfile());
  //   // };
  // }, [dispatch]);

  const profile = useSelector(selectUserProfile);
  // console.log("User profile:", profile);

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
        <View className="flex flex-row justify-between mb-4">
          <Text className="text-xl font-bold">Profile Picture</Text>
          {/* <TouchableOpacity onPress={pickImage}> */}
          <TouchableOpacity
            onPress={() =>
              router.push("(app)/(edit-profile)/edit-profile-picture")
            }
          >
            <Text className="text-lg text-sky-600">Edit</Text>
          </TouchableOpacity>
        </View>
        {/* {image ? (
          <Image
            className="w-[150px] h-[150px] rounded-full mr-2 self-center"
            source={{ uri: image }}
            resizeMode="cover"
          />
        ) : (
          <Image
            className="w-[150px] h-[150px] rounded-full mr-2 self-center"
            source={require("../../../assets/images/profile-pic.jpg")}
            resizeMode="cover"
          />
        )} */}
      </View>

      <View className="border-b-2 border-gray-100  py-3">
        <View className="flex flex-row justify-between mb-4">
          <Text className="text-xl font-bold">Details</Text>
          <TouchableOpacity
            onPress={() => router.push("(app)/(edit-profile)/edit-details")}
          >
            <Text className="text-lg text-sky-600">Edit</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => router.push("(app)/(edit-profile)/edit-details")}
        >
          <Text className="text-lg text-gray-500 mb-2">Display name</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("(app)/(edit-profile)/edit-details")}
        >
          <Text className="text-lg text-gray-500 mb-2">
            Primary interest/Profession
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("(app)/(edit-profile)/edit-details")}
        >
          <Text className="text-lg text-gray-500 mb-2">Location</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("(app)/(edit-profile)/edit-details")}
        >
          <Text className="text-lg text-gray-500">Date of birth</Text>
        </TouchableOpacity>
      </View>

      <View className="border-b-2 border-gray-100  py-3">
        <View className="flex flex-row justify-between mb-4">
          <Text className="text-xl font-bold">Bio</Text>
          <TouchableOpacity
            onPress={() => router.push("(app)/(edit-profile)/edit-bio")}
            // onPress={() => {
            //   router.push({
            //     pathname: "(app)/(edit-profile)/edit-bio",
            //     params: { profile: JSON.stringify(profile[0]) },
            //   });
            // }}
          >
            <Text className="text-lg text-sky-600">Edit</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => router.push("(app)/(edit-profile)/edit-bio")}
        >
          <Text className="text-lg text-gray-500 self-center">
            Add/Edit your bio
          </Text>
        </TouchableOpacity>
      </View>

      <View className="border-b-2 border-gray-100 py-3">
        <View className="flex flex-row justify-between">
          <Text className="text-xl font-bold">Social Links</Text>
          <TouchableOpacity
            onPress={() => router.push("(app)/(edit-profile)/edit-links")}
          >
            <Text className="text-lg text-sky-600">Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="border-b-2 border-gray-100 py-3">
        <View className="flex flex-row justify-between">
          <Text className="text-xl font-bold">Website</Text>
          <TouchableOpacity
            onPress={() => router.push("(app)/(edit-profile)/edit-websites")}
          >
            <Text className="text-lg text-sky-600">Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="border-b-2 border-gray-100 py-3">
        <View className="flex flex-row justify-between ">
          <Text className="text-xl font-bold">Interests</Text>
          <TouchableOpacity
            onPress={() => router.push("(app)/(edit-profile)/edit-interests")}
          >
            <Text className="text-lg text-sky-600">Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* <TouchableOpacity
        className="bg-sky-600 py-1 rounded-lg mt-6"
      >
        <Text className="text-lg self-center font-semibold text-white ">
          Save
        </Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

export default EditProfile;
