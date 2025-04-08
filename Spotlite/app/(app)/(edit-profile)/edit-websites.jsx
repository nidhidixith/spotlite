import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { router } from "expo-router";

import {
  selectUserProfile,
  editProfile,
} from "../../../slices/userProfileSlice";

import LoadingIndicator from "../../../components/Others/LoadingIndicator";

const EditWebsites = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const dispatch = useDispatch();
  const profile = useSelector(selectUserProfile);

  const maxNameLength = 100;
  const maxLinkLength = 200;

  const [links, setLinks] = useState(profile[0]?.additional_links);
  const [linkInput, setLinkInput] = useState("");
  const [linkName, setLinkName] = useState("");

  const [hasChanges, setHasChanges] = useState(false);

  // Function to check valid URLs
  const isValidUrl = (url) => {
    if (!url) return true; // Allow empty input
    const regex = /^https:\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url) || "Invalid URL format (must start with https://)";
  };

  // Add link function
  const addLink = () => {
    if (!linkName.trim()) {
      Alert.alert("Error", "Please add the name.");
      return;
    }
    if (!linkInput.trim()) {
      Alert.alert("Error", "Please enter a link.");
      return;
    }

    if (linkName.trim().length > maxNameLength) {
      Alert.alert(
        "Error",
        `Name must be less than ${maxNameLength} characters`
      );
      return;
    }
    if (linkInput.trim().length > maxLinkLength) {
      Alert.alert(
        "Error",
        `Link must contain less than ${maxLinkLength} characters`
      );
      return;
    }

    const validationError = isValidUrl(linkInput);
    if (validationError !== true) {
      Alert.alert("Invalid URL", validationError);
      return;
    }

    const updatedLinks = [
      ...links.filter((link) => link.description !== linkName),
      {
        url: linkInput,
        description: linkName,
      },
    ];

    setLinks(updatedLinks);
    setLinkName("");
    setLinkInput("");
    setHasChanges(true);
  };

  // Remove link function
  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
    setHasChanges(true); // Track changes
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

  // On form submit
  const onSubmit = async () => {
    const profileData = new FormData();

    const formattedLinks = links.map((link) => ({
      url: link.url,
      description: link.description,
    }));
    profileData.append("additional_links", JSON.stringify(formattedLinks));

    console.log("Profile data: ", profileData);

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
      <View className="mb-2">
        <Text className="text-gray-600 font-semibold text-base mb-3">
          Add your websites/external links
        </Text>
        <View className="mb-3">
          <Controller
            control={control}
            // rules={{
            //   maxLength: maxNameLength,
            // }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm focus:border-sky-500"
                onBlur={onBlur}
                onChangeText={(text) => {
                  onChange(text);
                  setLinkName(text);
                }}
                value={linkName}
                placeholder="Add name"
                placeholderTextColor="#9CA3AF"
              />
            )}
            name="linkName"
          />
          {/* Display error if invalid link is added */}
          {errors.linkName && (
            <Text className="text-red-500 mt-1">{errors.linkName.message}</Text>
          )}
        </View>

        <View className="mb-3">
          <Controller
            control={control}
            // rules={{
            //   validate: isValidUrl,
            //   maxLength: maxLinkLength,
            // }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm focus:border-sky-500"
                onBlur={onBlur}
                onChangeText={(text) => {
                  onChange(text);
                  setLinkInput(text);
                }}
                value={linkInput}
                placeholder="Add the link of your website"
                placeholderTextColor="#9CA3AF"
              />
            )}
            name="linkInput"
          />
          {/* Display error if invalid link is added */}
          {errors.linkInput && (
            <Text className="text-red-500 mt-1">
              {errors.linkInput.message}
            </Text>
          )}
        </View>

        <TouchableOpacity
          className={`px-4 py-2 rounded-lg self-end ${
            linkInput ? "bg-sky-500" : "bg-gray-300"
          }`}
          onPress={addLink}
          disabled={!linkInput || !linkName}
        >
          <Text className="text-white font-medium">Add</Text>
        </TouchableOpacity>
      </View>
      {/* Render the list of added links */}

      {links.length > 0 && (
        <View className="flex flex-row flex-wrap items-center">
          {links.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex flex-row items-center p-1 flex-wrap rounded-lg border border-sky-300  mx-1 my-2 px-2 py-1"
              onPress={() => removeLink(index)}
            >
              <Text className="text-sm">
                {item.description.charAt(0).toUpperCase() +
                  item.description.slice(1)}
              </Text>

              <Text className="text-red-500 ml-2 font-bold">x</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity
        className={`border border-sky-600 bg-sky-600 rounded-lg p-1 mt-6 ${
          !hasChanges ? "opacity-50" : ""
        }`}
        disabled={!hasChanges}
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-base text-white self-center font-medium">
          Save
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditWebsites;
