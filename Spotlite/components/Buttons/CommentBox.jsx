import React from "react";
import { useDispatch } from "react-redux";
import { Controller, set, useForm } from "react-hook-form";

import { addComment } from "../../slices/postsSlice";
import { TextInput, TouchableOpacity, View, Text } from "react-native";

const CommentBox = ({ postId, postComments, setPostComments }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm();

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
              className="border border-gray-200 px-2 rounded-lg"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Add comment"
            />
          )}
          name="comment"
        />
        {errors.comment && (
          <Text className="text-red-500 mb-2">{errors.comment.message}</Text>
        )}
      </View>

      <TouchableOpacity
        className={`bg-sky-600 py-1 rounded-lg mt-4 ${
          isDirty ? "" : "opacity-50"
        }`}
        onPress={handleSubmit(onSubmit)}
        disabled={!isDirty}
      >
        <Text className="text-white text-base self-center">Post</Text>
      </TouchableOpacity>
    </>
  );
};

export default CommentBox;
