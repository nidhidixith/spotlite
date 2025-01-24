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
        className="flex flex-row self-center items-center"
        onPress={showAlert}
      >
        <MaterialIcons name="delete" size={20} color="black" marginRight={5} />
        <Text className="font-semibold text-[18px]">Delete Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserPostMenuModal;
