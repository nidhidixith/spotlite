import { View, Text } from "react-native";
import React from "react";

const ListEndComponent = ({ message, details = null }) => {
  return (
    <View className="p-4 items-center justify-center">
      <Text className="text-lg font-semibold text-gray-500 text-center">
        {message}
      </Text>
    </View>
  );
};

export default ListEndComponent;
