import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";

const Step5 = ({ handlePrevStep, handleNextStep, handleSkip }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm();

  const maxLength = 200; // Define the maximum length constraint

  const [links, setLinks] = useState([]);
  const [linkInput, setLinkInput] = useState("");

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
  };

  // On form submit
  const onSubmit = () => {
    console.log("Links:", links);

    const obj = { additionalLinks: links };
    handleNextStep(obj); // Go to the next step
  };

  return (
    <>
      <Text className="text-2xl font-semibold text-center mb-5">
        Add Websites
      </Text>

      <TouchableOpacity onPress={handleSkip}>
        <Text className="self-end text-end text-sky-600 text-[16px]">Skip</Text>
      </TouchableOpacity>

      <View className="mb-5">
        <View className="mb-3">
          <Text className="mb-2 font-semibold text-[16px]">Websites</Text>
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
      </View>

      <View className="flex flex-row justify-between gap-x-4 mt-5">
        <TouchableOpacity
          className="bg-sky-600 rounded-lg p-2 flex-1"
          onPress={handlePrevStep}
        >
          <Text className="text-white text-lg self-center">Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-sky-600 rounded-lg p-2 flex-1"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-lg self-center">Next</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Step5;
