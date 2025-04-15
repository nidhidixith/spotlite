import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { links } from "../../../utilities/links";

const Step4 = ({ handlePrevStep, handleNextStep, handleSkip }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [socialLinks, setSocialLinks] = useState([]);
  const [linkName, setLinkName] = useState(null);
  const [linkInput, setLinkInput] = useState("");

  const [error, setError] = useState(null);

  const maxLength = 200;

  const isValidUrl = (url) => {
    if (!url) return true; // Allow empty input
    const regex = /^https:\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url) || "Invalid URL format (must start with https://)";
  };

  const handleLinkNamePress = (name) => {
    setLinkName(name);
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
      },
    ];

    setSocialLinks(updatedLinks);
    setLinkName(null);
    setLinkInput("");
    // console.log("Social Links: ", updatedLinks);
  };

  const removeLink = (name) => {
    setSocialLinks((prevLinks) =>
      prevLinks.filter((link) => link.platform !== name)
    );
  };

  const onSubmit = (data) => {
    // console.log(data);

    const formattedSocialLinks = socialLinks.map((link) => ({
      platform: link.platform,
      url: link.url,
    }));

    const obj = { socialLinks: JSON.stringify(formattedSocialLinks) };

    handleNextStep(obj);
  };

  // const onSkip = (data) => {
  //   console.log(data);
  //   handleSkip(data);
  // };

  return (
    <>
      <Text className="text-2xl text-gray-800 font-semibold text-center mb-5">
        Connect your External Profiles
      </Text>

      {/* <TouchableOpacity onPress={handleSubmit(onSkip)}> */}
      <TouchableOpacity className="mb-2" onPress={handleSkip}>
        <Text className="self-end text-end text-sky-600 text-sm">Skip</Text>
      </TouchableOpacity>

      <View className="flex flex-row flex-wrap justify-between items-center mb-4">
        {Object.keys(links).map((key) => (
          <TouchableOpacity
            key={key}
            activeOpacity={0.5}
            onPress={() => handleLinkNamePress(links[key].platform)}
            className="flex flex-row items-center rounded-lg border border-gray-300 mx-1 my-2 px-2 py-1"
          >
            {links[key].icon}
            <Text className="text-sm">
              {links[key].platform.charAt(0).toUpperCase() +
                links[key].platform.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Section 2: Add Link */}
      {linkName && (
        <View className="mb-4">
          <Text className="text-sm mb-2 font-semibold text-gray-600">
            {linkName.charAt(0).toUpperCase() + linkName.slice(1)} link
          </Text>
          <View className="flex flex-row items-center">
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
                  className="rounded-lg border border-gray-200 px-3 py-2 flex-1 text-gray-900 text-sm focus:border-sky-500"
                  onBlur={onBlur}
                  onChangeText={(text) => {
                    onChange(text);
                    setLinkInput(text);
                  }}
                  value={linkInput}
                  placeholder={`Add ${linkName} link`}
                  placeholderTextColor="#9CA3AF"
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
              className={`ml-2 px-2 py-3 rounded-lg ${
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

      <Text className="text-sm text-sky-600 mb-2 font-semibold">
        Your Links
      </Text>
      <View className="flex flex-row flex-wrap items-center">
        {socialLinks.map((link) => {
          const platformDetails = links[link.platform] || {};
          return (
            <TouchableOpacity
              key={link.platform}
              onPress={() => removeLink(link.platform)}
              className="flex flex-row items-center rounded-lg border border-sky-300  mx-1 my-2 px-2 py-1"
            >
              {platformDetails.icon}
              <Text className="text-sm ">
                {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
              </Text>
              <Text className="text-red-500 ml-2 font-bold">x</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View className="flex flex-row justify-between gap-x-4 mt-5">
        <TouchableOpacity
          className="border border-sky-600 rounded-lg p-2 flex-1"
          onPress={handlePrevStep}
        >
          <Text className="text-sky-600 text-lg font-medium self-center">
            Prev
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-sky-600 rounded-lg p-2 flex-1"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-lg font-medium self-center">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Step4;
