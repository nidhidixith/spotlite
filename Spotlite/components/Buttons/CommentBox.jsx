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

import { addComment } from "../../slices/postsSlice";

const CommentBox = ({ postId, postComments, setPostComments }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

  const addCommentStatus = useSelector((state) => state.post.addCommentStatus);

  // const fetchProfileError = useSelector(
  //   (state) => state.userProfile.fetchProfileError
  // );

  if (addCommentStatus === "loading") {
    // Show Activity Indicator while loading
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0284c7" />
      </View>
    );
  }

  const onSubmit = (data) => {
    const commentData = new FormData();

    commentData.append("text", data.comment);
    setPostComments(postComments + 1);
    dispatch(addComment({ postId, commentData }));
    reset();
  };

  return (
    <>
      <View className="mt-4">
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
              numberOfLines={4}
              className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm focus:border-sky-500"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Add comment"
              placeholderTextColor="#9CA3AF"
            />
          )}
          name="comment"
        />
        {errors.comment && (
          <Text className="text-red-500 mt-1">{errors.comment.message}</Text>
        )}
      </View>

      <TouchableOpacity
        className={`border border-sky-600 bg-sky-600 rounded-lg p-1 mt-4 ${
          isDirty ? "" : "opacity-50"
        }`}
        onPress={handleSubmit(onSubmit)}
        disabled={!isDirty}
      >
        <Text className="text-base text-white self-center font-medium">
          Post
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default CommentBox;
