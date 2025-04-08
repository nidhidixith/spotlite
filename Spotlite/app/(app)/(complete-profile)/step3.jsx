import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { availableInterests } from "../../../utilities/interests";

const Step3 = ({ handlePrevStep, handleNextStep }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [tags, setTags] = useState([]);
  const maxInterests = 10;
  const [error, setError] = useState(null);
  const [selectedInterest, setSelectedInterest] = useState(null);
  // const availableInterests = [
  //   "painting",
  //   "singing",
  //   "dance",
  //   "acting",
  //   "writing",
  //   "poetry",
  //   "blogging",
  //   "design",
  //   "vlogging",
  //   "photography",
  //   "cinematography",
  //   "travel",
  //   "animation",
  //   "health",
  //   "fashion",
  //   "fitness",
  //   "cooking",
  //   "podcasting",
  //   "sports",
  //   "gaming",
  // ];

  const [tagInput, setTagInput] = useState("");

  const maxLength = 100;

  const addTagFromInput = () => {
    if (!tagInput.trim()) return;

    if (tagInput.length > maxLength) {
      setError(`Input must be less than ${maxLength} characters`);
      return;
    }

    if (tags.length >= maxInterests) {
      setError(`Maximum ${maxInterests}  interests allowed`);
      return;
    }

    if (!tags.includes(tagInput.toLowerCase().trim())) {
      setTags([...tags, tagInput.toLowerCase().trim()]);
      setError(null);
    }
    setTagInput("");
  };

  function addTag(interest) {
    if (tags.length >= maxInterests) {
      setError(`Maximum ${maxInterests}  interests allowed`);
      return;
    }

    if (tags.length < maxInterests && !tags.includes(interest)) {
      setTags([...tags, interest.toLowerCase()]);
      setError(null);
    }
    setSelectedInterest(interest);
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
      setError(`Maximum ${maxInterests}  interests allowed`);
      return;
    }

    const obj = { tags: tags };
    handleNextStep(obj);
  };

  const relatedInterests =
    selectedInterest && availableInterests[selectedInterest]
      ? availableInterests[selectedInterest]
      : [];

  return (
    <>
      <Text className="text-2xl text-gray-800 font-semibold text-center mb-5">
        Add Areas of Interest
      </Text>
      <Text className="italic mb-3 text-sm text-sky-600">
        Select atleast one. Maximum 10.
      </Text>

      <View className="flex flex-row flex-wrap justify-between items-center mb-4">
        {Object.entries(availableInterests).map(([interest]) => (
          <TouchableOpacity
            key={interest}
            // className={`flex flex-row p-1 m-1 justify-center items-center rounded-lg ${
            //   tags.includes(interest)
            //     ? "bg-sky-50 border border-sky-200"
            //     : "bg-gray-100 border border-gray-200"
            // }`}
            className={`flex flex-row px-2 py-1 m-1 justify-center items-center rounded-lg border border-sky-200 ${
              tags.includes(interest) ? "bg-sky-50 " : ""
            }`}
            onPress={() => addTag(interest)}
          >
            <Text className="text-sm">
              {interest.charAt(0).toUpperCase() + interest.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {error && <Text className="text-red-500 mb-4">{error}</Text>}

      {selectedInterest && relatedInterests.length > 0 && (
        <>
          <Text className="text-sm text-sky-600 mb-3">Suggestions</Text>
          <View className="flex flex-row flex-wrap  items-center mb-4">
            {relatedInterests.map((related, index) => (
              <TouchableOpacity
                key={index}
                className="flex flex-row  border border-sky-200 px-2 py-1 m-1 justify-center items-center rounded-lg"
                onPress={() => addTag(related)}
              >
                <Text className="text-sm">
                  {related.charAt(0).toUpperCase() + related.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      <View className="flex flex-row flex-wrap items-center mb-4">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <TextInput
                className="rounded-lg bg-gray-100 px-3 py-2 flex-1"
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
          // className="ml-2 bg-sky-500 px-2 py-3 rounded-lg"
          className={`ml-2 px-2 py-3 rounded-lg ${
            tagInput ? "bg-sky-500" : "bg-gray-300"
          }`}
          onPress={addTagFromInput}
          disabled={!tagInput}
        >
          <Text className="text-white font-medium">Add</Text>
        </TouchableOpacity>
      </View>

      {tags.length > 0 && (
        <View className=" flex flex-row flex-wrap justify-between items-center">
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

export default Step3;
