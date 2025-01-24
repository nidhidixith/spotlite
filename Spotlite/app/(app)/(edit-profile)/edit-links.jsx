import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";

import {
  selectUserProfile,
  editProfile,
} from "../../../slices/userProfileSlice";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import LoadingIndicator from "../../../components/Others/LoadingIndicator";

const EditLinks = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const dispatch = useDispatch();

  const profile = useSelector(selectUserProfile);

  const isValidUrl = (url) => {
    if (!url) return true; // Allow empty input
    const regex = /^https:\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url) || "Invalid URL format (must start with https://)";
  };

  const editProfileStatus = useSelector(
    (state) => state.profile.userProfile.editProfileStatus
  );

  const editProfileError = useSelector(
    (state) => state.profile.userProfile.editProfileError
  );

  if (editProfileStatus === "loading") {
    return <LoadingIndicator />;
  }

  const onSubmit = async (data) => {
    const profileData = new FormData();

    profileData.append("instagram_link", data.instagramLink);
    profileData.append("facebook_link", data.facebookLink);
    profileData.append("youtube_link", data.youtubeLink);
    profileData.append("tiktok_link", data.tiktokLink);
    profileData.append("pinterest_link", data.pinterestLink);
    profileData.append("twitter_link", data.twitterLink);
    profileData.append("threads_link", data.threadsLink);
    profileData.append("linkedin_link", data.linkedInLink);

    try {
      const response = await dispatch(editProfile(profileData)).unwrap();
      Alert.alert("Edit Successful");
      router.push("(app)/(tabs)/home");
    } catch (err) {
      console.error("Request failed", err);
      console.log(err);

      const errorMessage =
        (typeof err === "string" && err) || // If `err` is a string, use it
        err?.message || // If `err` has a `message` property
        JSON.stringify(err) || // Convert `err` to string if it's an object
        "An unknown error occurred. Try again later"; // Fallback message

      Alert.alert("Edit Failed", errorMessage); // Pass string to Alert.alert
      // Alert.alert(editProfileError);
      router.replace("(app)/(edit-profile)/edit-profile");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,

        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "white",
      }}
    >
      <View className="mb-4">
        <View className="flex flex-row items-center mb-2">
          <Text className=" font-semibold text-[16px]">Instagram</Text>
        </View>
        <Controller
          control={control}
          defaultValue={profile[0]?.instagram_link || ""}
          rules={{
            validate: isValidUrl,
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex flex-row items-center rounded-xl border border-gray-200 px-2 py-2">
              <FontAwesome
                name="instagram"
                size={18}
                color="#E4405F"
                marginRight={8}
              />
              <TextInput
                className="flex-1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="instagramLink"
        />
        {errors.instagramLink && (
          <Text className="text-red-500 mb-2">
            {errors.instagramLink.message}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex flex-row items-center mb-2">
          <Text className=" font-semibold text-[16px]">Facebook</Text>
        </View>
        <Controller
          control={control}
          defaultValue={profile[0]?.facebook_link || ""}
          rules={{
            validate: isValidUrl,
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex flex-row items-center rounded-xl border border-gray-200 px-2 py-2">
              <AntDesign
                name="facebook-square"
                size={18}
                color="#3b5998"
                marginRight={8}
              />
              <TextInput
                className="flex-1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="facebookLink"
        />
        {errors.facebookLink && (
          <Text className="text-red-500 mb-2">
            {errors.facebookLink.message}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex flex-row items-center mb-2">
          <Text className=" font-semibold text-[16px]">Youtube</Text>
        </View>
        <Controller
          control={control}
          defaultValue={profile[0]?.youtube_link || ""}
          rules={{
            validate: isValidUrl,
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex flex-row items-center rounded-xl border border-gray-200 px-2 py-2">
              <AntDesign
                name="youtube"
                size={20}
                color="#FF0000"
                marginRight={8}
              />

              <TextInput
                className="flex-1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="youtubeLink"
        />
        {errors.youtubeLink && (
          <Text className="text-red-500 mb-2">
            {errors.youtubeLink.message}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex flex-row items-center mb-2">
          <Text className=" font-semibold text-[16px]">Tiktok</Text>
        </View>
        <Controller
          control={control}
          defaultValue={profile[0]?.tiktok_link || ""}
          rules={{
            validate: isValidUrl,
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex flex-row items-center rounded-xl border border-gray-200 px-2 py-2">
              <FontAwesome6
                name="tiktok"
                size={16}
                color="#010101"
                marginRight={8}
              />
              <TextInput
                className="flex-1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="tiktokLink"
        />
        {errors.tiktokLink && (
          <Text className="text-red-500 mb-2">{errors.tiktokLink.message}</Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex flex-row items-center mb-2">
          <Text className=" font-semibold text-[16px]">Pinterest</Text>
        </View>
        <Controller
          control={control}
          defaultValue={profile[0]?.pinterest_link || ""}
          rules={{
            validate: isValidUrl,
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex flex-row items-center rounded-xl border border-gray-200 px-2 py-2">
              <FontAwesome
                name="pinterest"
                size={18}
                color="#E60023"
                marginRight={8}
              />
              <TextInput
                className="flex-1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="pinterestLink"
        />
        {errors.pinterestLink && (
          <Text className="text-red-500 mb-2">
            {errors.pinterestLink.message}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex flex-row items-center mb-2">
          <Text className=" font-semibold text-[16px]">Twitter</Text>
        </View>
        <Controller
          control={control}
          defaultValue={profile[0]?.twitter_link || ""}
          rules={{
            validate: isValidUrl,
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex flex-row items-center rounded-xl border border-gray-200 px-2 py-2">
              <FontAwesome
                name="twitter"
                size={18}
                color="#1DA1F2"
                marginRight={8}
              />
              <TextInput
                className="flex-1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="twitterLink"
        />
        {errors.twitterLink && (
          <Text className="text-red-500 mb-2">
            {errors.twitterLink.message}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex flex-row items-center mb-2">
          <Text className=" font-semibold text-[16px]">Threads</Text>
        </View>
        <Controller
          control={control}
          defaultValue={profile[0]?.threads_link || ""}
          rules={{
            validate: isValidUrl,
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex flex-row items-center rounded-xl border border-gray-200 px-2 py-2">
              <FontAwesome6
                name="threads"
                size={18}
                color="#000000"
                marginRight={8}
              />
              <TextInput
                className="flex-1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="threadsLink"
        />
        {errors.threadsLink && (
          <Text className="text-red-500 mb-2">
            {errors.threadsLink.message}
          </Text>
        )}
      </View>

      <View className="mb-4">
        <View className="flex flex-row items-center mb-2">
          <Text className=" font-semibold text-[16px]">LinkedIn</Text>
        </View>
        <Controller
          control={control}
          defaultValue={profile[0]?.linkedin_link || ""}
          rules={{
            validate: isValidUrl,
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View className="flex flex-row items-center rounded-xl border border-gray-200 px-2 py-2">
              <AntDesign
                name="linkedin-square"
                size={18}
                color="#0077b5"
                marginRight={8}
              />
              <TextInput
                className="flex-1"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="linkedInLink"
        />
        {errors.linkedInLink && (
          <Text className="text-red-500 mb-2">
            {errors.linkedInLink.message}
          </Text>
        )}
      </View>

      <TouchableOpacity
        className={`bg-sky-600 py-1 rounded-lg mt-6 ${
          isDirty ? "" : "opacity-50"
        }`}
        onPress={handleSubmit(onSubmit)}
        disabled={!isDirty}
      >
        <Text className="text-white text-lg self-center font-semibold">
          Save
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditLinks;
