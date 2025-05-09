import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";

const Step5 = ({ handlePrevStep, handleNextStep, handleSkip }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const maxNameLength = 100;
  const maxLinkLength = 200;

  const [links, setLinks] = useState([]);
  const [linkInput, setLinkInput] = useState("");
  const [linkName, setLinkName] = useState("");

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
  };

  // Remove link function
  const removeLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };
  // On form submit
  const onSubmit = () => {
    console.log("Links:", links);

    const formattedLinks = links.map((link) => ({
      url: link.url,
      description: link.description,
    }));

    const obj = { additionalLinks: JSON.stringify(formattedLinks) };
    handleNextStep(obj); // Go to the next step
  };

  return (
    <>
      <Text className="text-2xl text-gray-800 font-semibold text-center mb-5">
        Add Websites
      </Text>

      <TouchableOpacity className="mb-2" onPress={handleSkip}>
        <Text className="self-end text-end text-sky-600 text-sm">Skip</Text>
      </TouchableOpacity>

      <View className="">
        <Text className="text-base text-gray-600 mb-3 font-semibold">
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

export default Step5;
