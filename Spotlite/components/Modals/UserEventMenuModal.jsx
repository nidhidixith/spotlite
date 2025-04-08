import { View, Text, Alert, TouchableOpacity } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";

import { deleteEvent } from "../../slices/eventsSlice";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const UserEventMenuModal = ({ eventId, bottomSheetRef }) => {
  const dispatch = useDispatch();
  const showAlert = () => {
    bottomSheetRef?.current?.close();
    Alert.alert(
      "Are you sure?",
      "You cannot restore events that have been deleted",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "Delete",
          onPress: () => {
            dispatch(deleteEvent({ eventId }));
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
        <Text className="font-medium text-base text-gray-800">
          Delete Event
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserEventMenuModal;
