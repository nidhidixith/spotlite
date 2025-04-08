import { View, Text } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";

const ListEndComponent = ({ message, details = null }) => {
  return (
    <View className="flex flex-row px-4 py-2 items-center justify-center bg-gray-100">
      <Feather name="check-circle" size={22} color="gray" marginRight={10} />
      <Text className="text-lg font-semibold text-gray-500 text-center">
        {message}
      </Text>
    </View>
  );
};

export default ListEndComponent;
