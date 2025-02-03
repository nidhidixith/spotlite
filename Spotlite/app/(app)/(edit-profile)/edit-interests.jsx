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
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { router } from "expo-router";

import {
  selectUserProfile,
  editProfile,
} from "../../../slices/userProfileSlice";
import LoadingIndicator from "../../../components/Others/LoadingIndicator";

import { availableInterests } from "../../../utilities/interests";

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
  const [selectedInterest, setSelectedInterest] = useState(null);

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

    if (!tags.includes(tagInput.toLowerCase())) {
      setTags([...tags, tagInput.toLowerCase()]);
      setModified(true);
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
      setModified(true);
      setError(null);
    }
    setSelectedInterest(interest);
  }

  function removeTag(index) {
    setTags(tags.filter((_, i) => i !== index));
    setModified(true);
  }

  const editProfileStatus = useSelector(
    (state) => state.profile.userProfile.editProfileStatus
  );

  const editProfileError = useSelector(
    (state) => state.profile.userProfile.editProfileError
  );

  if (editProfileStatus === "loading") {
    return <LoadingIndicator />;
  }

  const onSubmit = async () => {
    if (tags.length === 0) {
      setError("Please select/add at least one interest.");
      return;
    }
    if (tags.length > maxInterests) {
      setError(`Maximum ${maxInterests}  interests allowed`);
      return;
    }

    const profileData = new FormData();

    profileData.append("areas_of_interest", tags);

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

  const relatedInterests =
    selectedInterest && availableInterests[selectedInterest]
      ? availableInterests[selectedInterest]
      : [];
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

      <View className="flex flex-row flex-wrap justify-between items-center mb-3">
        {Object.entries(availableInterests).map(([interest]) => (
          <TouchableOpacity
            key={interest}
            // className="flex flex-row bg-gray-100 border border-gray-200 p-1 m-1 justify-center items-center rounded-lg"
            className={`flex flex-row p-1 m-1 justify-center items-center rounded-lg ${
              tags.includes(interest)
                ? "bg-sky-50 border border-sky-200"
                : "bg-gray-100  border-gray-200"
            }`}
            onPress={() => addTag(interest)}
          >
            <Text className="text-black">
              {interest.charAt(0).toUpperCase() + interest.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {error && <Text className="text-red-500 mb-3">{error}</Text>}

      {selectedInterest && relatedInterests.length > 0 && (
        <>
          <Text className="text-sm text-sky-600 mb-2">Suggestions</Text>
          <View className="flex flex-row flex-wrap  items-center mb-4">
            {relatedInterests.map((related, index) => (
              <TouchableOpacity
                key={index}
                className="flex flex-row bg-gray-100 border border-gray-200 p-1 m-1 justify-center items-center rounded-lg"
                onPress={() => addTag(related)}
              >
                <Text className="text-black">
                  {related.charAt(0).toUpperCase() + related.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

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
