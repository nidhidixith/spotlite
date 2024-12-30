import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserProfile,
  editProfile,
} from "../../../slices/userProfileSlice";
import { router } from "expo-router";

const EditInterests = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const profile = useSelector(selectUserProfile);

  const initialInterests =
    Array.isArray(profile[0]?.areas_of_interest) &&
    profile[0]?.areas_of_interest.length === 1 &&
    profile[0]?.areas_of_interest[0] != ""
      ? profile[0]?.areas_of_interest[0].split(",")
      : [];

  const [tags, setTags] = useState(initialInterests);
  const maxInterests = 10;
  const [modified, setModified] = useState(false);
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
      setModified(true);
    }
    setTagInput("");
  };

  function addTag(interest) {
    if (tags.length < maxInterests && !tags.includes(interest)) {
      setTags([...tags, interest.toLowerCase()]);
      setModified(true);
    }
  }

  function removeTag(index) {
    setTags(tags.filter((_, i) => i !== index));
    setModified(true);
  }

  const onSubmit = async () => {
    if (tags.length === 0) {
      setError("Please select/add at least one interest.");
      return;
    }
    if (tags.length > maxInterests) {
      setError("Maximum 10 interests allowed.");
      return;
    }
    console.log("Tags:", tags);

    // const obj = { tags: tags };
    // console.log("Data:", obj);
    const profileData = new FormData();

    profileData.append("areas_of_interest", tags);

    console.log("Profile data from edit links", profileData);
    try {
      const response = await dispatch(editProfile(profileData)).unwrap();
      Alert.alert("Edit Successful");
      setModified(false);
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
      <Text className="text-lg font-bold mb-4">Your Interests</Text>

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
      <TouchableOpacity
        className={`bg-sky-600 py-1 rounded-lg mt-4 ${
          !modified ? "opacity-50" : ""
        }`}
        disabled={!modified}
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white text-lg self-center font-semibold">
          Save
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditInterests;
