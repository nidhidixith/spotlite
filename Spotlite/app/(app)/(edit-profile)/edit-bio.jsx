import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";

import {
  selectUserProfile,
  editProfile,
} from "../../../slices/userProfileSlice";
import LoadingIndicator from "../../../components/Others/LoadingIndicator";

const EditBio = () => {
  const profile = useSelector(selectUserProfile);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const dispatch = useDispatch();

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
    if (data.bio) {
      profileData.append("bio", data.bio);
    }
    try {
      const response = await dispatch(editProfile(profileData)).unwrap();
      Alert.alert("Edit Successful");
      router.replace("(app)/(edit-profile)/edit-profile");
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
      <View className="">
        <Text className="text-gray-600 font-semibold text-base mb-2">
          Bio/Description *
        </Text>

        <Controller
          control={control}
          defaultValue={profile[0]?.bio || ""}
          rules={{
            required: "Bio/Description is required",
            maxLength: {
              value: 500,
              message: "Maximum 500 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              multiline
              numberOfLines={8}
              className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm focus:border-sky-500"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="bio"
        />
        {errors.bio && (
          <Text className="text-red-500 mt-1">{errors.bio.message}</Text>
        )}
      </View>

      <TouchableOpacity
        className={`border border-sky-600 bg-sky-600 rounded-lg p-1 mt-6 ${
          isDirty ? "" : "opacity-50"
        }`}
        onPress={handleSubmit(onSubmit)}
        disabled={!isDirty}
      >
        <Text className="text-base text-white self-center font-medium">
          Save
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditBio;
