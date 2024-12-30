import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { Link, router } from "expo-router";

const Step5 = ({ handlePrevStep, handleNextStep }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [tags, setTags] = useState([]);
  const maxInterests = 10;
  const [error, setError] = useState(null);
  const availableInterests = [
    "painting",
    "singing",
    "dance",
    "acting",
    "writing",
    "poetry",
    "blogging",
    "design",
    "vlogging",
    "photography",
    "cinematography",
    "travel",
    "animation",
    "health",
    "fashion",
    "fitness",
    "cooking",
    "podcasting",
    "sports",
    "gaming",
  ];

  const [tagInput, setTagInput] = useState("");

  const addTagFromInput = () => {
    if (!tagInput.trim()) return;

    if (!tags.includes(tagInput.toLowerCase())) {
      setTags([...tags, tagInput.toLowerCase()]);
    }
    setTagInput("");
  };

  function addTag(interest) {
    if (tags.length < maxInterests && !tags.includes(interest)) {
      setTags([...tags, interest.toLowerCase()]);
    }
  }

  function removeTag(index) {
    setTags(tags.filter((_, i) => i !== index));
  }

  const onSubmit = () => {
    if (tags.length === 0) {
      setError("Please select/add at least one interest.");
      return;
    }
    if (tags.length > maxInterests) {
      setError("Maximum 10 interests allowed.");
      return;
    }
    console.log("Tags:", tags);
    // router.push("/step6");
    const obj = { tags: tags };
    handleNextStep(obj);
  };

  return (
    <>
      <Text className="text-xl font-semibold text-center mb-5">
        Add Areas of Interest
      </Text>
      <Text className="italic mb-3 text-sky-600 ml-1">
        Select atleast one. Maximum 10.
      </Text>

      <View className="flex flex-row flex-wrap justify-between items-center mb-5">
        {availableInterests.map((interest) => (
          <TouchableOpacity
            key={interest}
            className="flex flex-row bg-gray-100 border border-gray-200 p-1 m-1 justify-center items-center rounded-lg"
            onPress={() => addTag(interest)}
          >
            <Text className="text-black">
              {interest.charAt(0).toUpperCase() + interest.slice(1)}
            </Text>
            {/* <SecondaryButton
              containerStyles="bg-white border p-1 ml-1 mr-1"
              textStyles="text-black"
              title={interest.charAt(0).toUpperCase() + interest.slice(1)}
              handlePress={() => addTag(interest)}
            ></SecondaryButton> */}
          </TouchableOpacity>
        ))}
      </View>

      {error && <Text className="text-red-500 mb-1">{error}</Text>}

      <View className="flex flex-row flex-wrap items-center">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                className="rounded-sm bg-gray-100 px-2 py-2 flex-1"
                onBlur={onBlur}
                onChangeText={(text) => {
                  onChange(text);
                  setTagInput(text);
                }}
                value={tagInput}
                placeholder="Type your interests"
              />
            </>
          )}
          name="tags"
        />

        <TouchableOpacity
          className="ml-2 bg-sky-100 px-2 py-3 rounded-lg"
          onPress={addTagFromInput}
        >
          <Text>Add</Text>
        </TouchableOpacity>
      </View>
      {/* {errors.additionalLinks && (
              <Text className="text-red-500 mb-2">
                {errors.additionalLinks.message}
              </Text>
            )} */}

      <View className="py-1 flex flex-row flex-wrap justify-between items-center mb-5 mt-2  rounded-lg">
        {tags.map((tag, index) => (
          <TouchableOpacity
            activeOpacity={0.5}
            key={index}
            onPress={() => removeTag(index)}
            className="flex flex-row justify-between items-center rounded-lg bg-sky-50 border border-sky-100 flex-wrap m-1 px-2 py-1"
          >
            <Text className="text-sky-600">
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </Text>

            <Text className="text-red-500 ml-1">x</Text>
          </TouchableOpacity>
        ))}
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
