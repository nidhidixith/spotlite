import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";

import {
  selectUserProfile,
  editProfile,
} from "../../../slices/userProfileSlice";

import LoadingIndicator from "../../../components/Others/LoadingIndicator";
import { links } from "../../../utilities/links";

const EditLinks = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const dispatch = useDispatch();

  const profile = useSelector(selectUserProfile);
  // console.log("User profile from backend: ", profile);
  console.log(
    "Type of Social links from backend: ",
    typeof profile[0]?.social_links
  );
  console.log("Social links from backend: ", profile[0]?.social_links);

  const [socialLinks, setSocialLinks] = useState(profile[0]?.social_links);
  const [linkName, setLinkName] = useState(null);
  // const [linkIcon, setLinkIcon] = useState(null);
  const [linkInput, setLinkInput] = useState("");

  const [modified, setModified] = useState(false);
  const [error, setError] = useState(null);

  const maxLength = 200;

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

  const handleLinkNamePress = (name) => {
    setLinkName(name);
    // setLinkIcon(icon);
    setLinkInput("");
  };

  const handleAddLink = () => {
    if (!linkName) {
      // setError("Please select a link type");
      Alert.alert("Error", "Please select a link type.");
      return;
    }
    if (!linkInput.trim()) {
      // setError("Please enter a link");
      Alert.alert("Error", "Please enter a link.");
      return;
    }
    if (linkInput.trim().length > maxLength) {
      // setError(`Input must be less than ${maxLength} characters`);
      Alert.alert("Error", `Input must be less than ${maxLength} characters`);
      return;
    }

    const validationError = isValidUrl(linkInput);
    if (validationError !== true) {
      // setError("Invalid URL", validationError);
      Alert.alert("Invalid URL", validationError);
      return;
    }

    const updatedLinks = [
      ...socialLinks.filter((link) => link.platform !== linkName),
      {
        platform: linkName,
        url: linkInput,
        // icon: linkIcon,
      },
    ];

    setSocialLinks(updatedLinks);
    setLinkName(null);
    // setLinkIcon(null);
    setLinkInput("");
    setModified(true);
    // console.log("Social Links: ", updatedLinks);
  };

  const removeLink = (name) => {
    setSocialLinks((prevLinks) =>
      prevLinks.filter((link) => link.platform !== name)
    );
    setModified(true);
  };

  const onSubmit = async (data) => {
    const profileData = new FormData();

    const formattedSocialLinks = socialLinks.map((link) => ({
      platform: link.platform,
      url: link.url,
    }));
    profileData.append("social_links", JSON.stringify(formattedSocialLinks));

    console.log("Profile data: ", profileData);

    try {
      const response = await dispatch(editProfile(profileData)).unwrap();
      Alert.alert("Edit Successful");
      setModified(false);
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
      {/* Section 1: Instruction */}
      <Text className="text-base text-sky-600 mb-3 font-semibold">
        Select the platform to add a link
      </Text>
      <View className="flex flex-row flex-wrap items-center rounded-lg mb-6">
        {Object.keys(links).map((key) => (
          <TouchableOpacity
            key={key}
            activeOpacity={0.5}
            onPress={() => handleLinkNamePress(links[key].platform)}
            className="flex flex-row items-center rounded-lg border border-gray-300 m-1 px-3 py-2"
          >
            {links[key].icon}
            <Text className="text-[14px] ml-1">
              {links[key].platform.charAt(0).toUpperCase() +
                links[key].platform.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Section 2: Add Link */}
      {linkName && (
        <View className="mb-6">
          <Text className="text-[14px] mb-2 font-medium">
            {linkName.charAt(0).toUpperCase() + linkName.slice(1)} link
          </Text>
          <View className="flex flex-row items-center mb-4">
            <Controller
              control={control}
              rules={
                {
                  // validate: (value) => isValidUrl(value) || "Invalid URL format",
                  // maxLength: {
                  //   value: 200,
                  //   message: "Maximum 200 characters allowed",
                  // },
                }
              }
              render={({ field: { onChange, onBlur } }) => (
                <TextInput
                  className="rounded-lg border border-gray-200 px-3 py-2 flex-1"
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    onChange(text);
                    setLinkInput(text);
                  }}
                  value={linkInput}
                  placeholder={`Add ${linkName} link`}
                />
              )}
              name={linkName}
            />
            {errors[linkName] && (
              <Text className="text-red-500 ml-2">
                {errors[linkName]?.message}
              </Text>
            )}
            <TouchableOpacity
              className={`ml-2 px-4 py-2 rounded-lg ${
                linkInput ? "bg-sky-500" : "bg-gray-300"
              }`}
              onPress={handleAddLink}
              disabled={!linkInput}
            >
              <Text className="text-white font-medium">Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Section 3: Your Links */}

      <Text className="text-base text-sky-600 mb-2 font-semibold">
        Your Links
      </Text>
      <View className="flex flex-row flex-wrap items-center rounded-lg mb-6">
        {socialLinks.map((link) => {
          const platformDetails = links[link.platform] || {};
          return (
            <TouchableOpacity
              key={link.platform}
              onPress={() => removeLink(link.platform)}
              className="flex flex-row items-center rounded-lg border border-gray-300 m-1 px-3 py-2"
            >
              {platformDetails.icon}
              <Text className="text-[14px] ml-1">
                {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
              </Text>
              <Text className="text-red-500 ml-2 font-bold">x</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* {link.icon || platformDetails.icon} */}

      {/* Section 4: Submit Button */}
      <TouchableOpacity
        className={`bg-sky-600 py-3 rounded-lg mt-8 ${
          !modified ? "opacity-50" : ""
        }`}
        disabled={!modified}
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white text-lg text-center font-semibold">
          Save
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditLinks;
