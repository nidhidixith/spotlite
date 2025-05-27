import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import LoadingIndicator from "../Others/LoadingIndicator";
import { addEventComment } from "../../slices/eventsSlice";

const EventCommentBox = ({ eventId }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  const addCommentStatus = useSelector(
    (state) => state.event.addEventCommentStatus
  );

  // const fetchProfileError = useSelector(
  //   (state) => state.userProfile.fetchProfileError
  // );

  if (addCommentStatus === "loading") {
    <LoadingIndicator />;
  }

  const onSubmit = (data) => {
    const commentData = new FormData();

    commentData.append("text", data.comment);
    // setEventComments(postComments + 1);
    dispatch(addEventComment({ eventId, commentData }));
    reset();
  };

  return (
    <View className="my-2">
      <View className="flex-row items-center border border-gray-200 rounded-lg px-3 py-2 bg-gray-100">
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "Comment is required" },
            maxLength: {
              value: 500,
              message: "Maximum 500 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              multiline
              placeholder="Add a comment"
              placeholderTextColor="#9CA3AF"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className="flex-1 pr-2 text-sm text-gray-900"
              numberOfLines={1}
              style={{ maxHeight: 80 }}
            />
          )}
          name="comment"
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={!isDirty}
          className={`ml-2 px-3 py-1 rounded-full ${
            isDirty ? "bg-sky-600" : "bg-gray-400"
          }`}
        >
          <Text className="text-white font-medium text-sm">Post</Text>
        </TouchableOpacity>
      </View>
      {errors.comment && (
        <Text className="text-red-500 text-sm mt-1 ml-2">
          {errors.comment.message}
        </Text>
      )}
    </View>
  );
};

export default EventCommentBox;
