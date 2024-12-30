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
import {
  selectUserProfile,
  editProfile,
} from "../../../slices/userProfileSlice";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";

const EditBio = () => {
  const profile = useSelector(selectUserProfile);
  const { editProfileError } = useSelector(
    (state) => state.profile.userProfile
  );
  // const initialBio = profile[0]?.bio || "";
  console.log("User profile from edit bio:", profile[0]?.bio);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    console.log(data);
    const profileData = new FormData();
    if (data.bio) {
      profileData.append("bio", data.bio);
    }
    console.log("Profile data from edit bio", profileData);
    try {
      const response = await dispatch(editProfile(profileData)).unwrap();
      Alert.alert("Edit Successful");
      router.push("(app)/(tabs)/home");
    } catch (err) {
      console.error("Request failed", err);
      Alert.alert("Request failed, Please try again later");
      // Alert.alert(editProfileError);
      router.push("(app)/(tabs)/home");
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
      <View className="mb-6">
        <Text className="text-lg font-bold mb-4">Bio/Description *</Text>

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
              className="border border-gray-200 px-2 rounded-lg"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="bio"
        />
        {errors.bio && (
          <Text className="text-red-500 mb-2">{errors.bio.message}</Text>
        )}
      </View>

      {/* <TouchableOpacity
        className="bg-sky-600 py-1 rounded-lg mt-6"
        onPress={handleSubmit(onSubmit)}
      > */}
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

export default EditBio;
