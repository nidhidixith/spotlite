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
        className="flex flex-row self-center items-center"
        onPress={showAlert}
      >
        <MaterialIcons name="delete" size={20} color="black" marginRight={5} />
        <Text className="font-semibold text-[18px]">Delete Event</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserEventMenuModal;
