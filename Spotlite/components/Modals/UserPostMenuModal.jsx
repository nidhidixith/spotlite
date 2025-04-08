import { View, Text, Alert, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { deletePost } from "../../slices/postsSlice";

const UserPostMenuModal = ({ postId, bottomSheetRef }) => {
  const dispatch = useDispatch();
  const showAlert = () => {
    bottomSheetRef?.current?.close();
    Alert.alert(
      "Are you sure?",
      "You cannot restore posts that have been deleted",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "Delete",
          onPress: () => {
            dispatch(deletePost({ postId }));
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <View className="px-4 py-2 justify-center flex-1">
      <TouchableOpacity
        className="flex flex-row self-center items-center p-1"
        onPress={showAlert}
      >
        <MaterialIcons
          name="delete"
          size={18}
          color="#1f2937"
          marginRight={5}
        />
        <Text className="font-medium text-base text-gray-800">Delete Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserPostMenuModal;
