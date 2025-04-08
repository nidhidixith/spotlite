import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";

const EmptyState = ({ message = null, details = null, icon = null }) => {
  return (
    <View className="flex-1 justify-center items-center p-6 bg-white">
      {icon ? (
        <Feather name={icon} size={50} color="gray" marginBottom={10} />
      ) : (
        <Feather name="clock" size={50} color="gray" marginBottom={10} />
      )}
      <Text className="text-lg text-center font-semibold text-gray-800">
        {message}
      </Text>
      <Text className="text-sm text-center text-gray-500">{details}</Text>
    </View>
  );
};

export default EmptyState;
