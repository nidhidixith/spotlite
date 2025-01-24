import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
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

  const maxLength = 200;

  const initialLinks =
    Array.isArray(profile[0]?.additional_links) &&
    profile[0]?.additional_links.length === 1 &&
    profile[0]?.additional_links[0] != ""
      ? profile[0]?.additional_links[0].split(",")
      : [];

  const [links, setLinks] = useState(initialLinks);
  const [linkInput, setLinkInput] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  // Function to check valid URLs
  const isValidUrl = (url) => {
    if (!url) return true; // Allow empty input
    const regex = /^https:\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url) || "Invalid URL format (must start with https://)";
  };

  // Add link function
  const addLink = () => {
    if (!linkInput.trim()) return;

    // Check if the link exceeds the maximum length
    if (linkInput.length > maxLength) {
      setError("linkInput", {
        type: "manual",
        message: `Link must be less than ${maxLength} characters.`,
      });
      return; // Stop further processing if the length is exceeded
    }

    const validationResult = isValidUrl(linkInput);
    if (validationResult === true) {
      if (!links.includes(linkInput)) {
        setLinks([...links, linkInput]);
        setHasChanges(true); // Track changes
        clearErrors("linkInput"); // Clear any existing error once a valid link is added
      }
    } else {
      setError("linkInput", {
        type: "manual",
        message: validationResult, // Set error if link is invalid
      });
    }
    setLinkInput(""); // Clear input after adding
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

    profileData.append("additional_links", links);
    console.log("Links:", links);

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
      <View className="mb-5">
        <View className="mb-3">
          <Text className="text-lg font-bold mb-4">Websites</Text>
          <Controller
            control={control}
            rules={{
              validate: isValidUrl,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="rounded-xl border border-gray-200 px-2 py-2"
                onBlur={onBlur}
                onChangeText={(text) => {
                  onChange(text);
                  setLinkInput(text);
                }}
                value={linkInput}
                placeholder="Add links to your websites"
              />
            )}
            name="linkInput"
          />
          {/* Display error if invalid link is added */}
          {errors.linkInput && (
            <Text className="text-red-500 mb-2">
              {errors.linkInput.message}
            </Text>
          )}
        </View>

        {/* Render the list of added links */}
        {links.map((item, index) => (
          <View
            key={index}
            className="flex flex-row items-center p-1 flex-wrap rounded-sm bg-gray-100 px-2 py-2 mb-1"
          >
            <Text className="flex-1">{item}</Text>

            <TouchableOpacity
              className="bg-red-500 p-1 rounded-lg"
              onPress={() => removeLink(index)}
            >
              <Text className="text-white">Remove</Text>
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity
          className="bg-gray-300 p-2 rounded-lg mt-5 self-end"
          onPress={addLink}
        >
          <Text className="">Add link</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`bg-sky-600 py-1 rounded-lg mt-4 ${
            !hasChanges ? "opacity-50" : ""
          }`}
          disabled={!hasChanges}
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-lg self-center font-semibold">
            Save
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditWebsites;
