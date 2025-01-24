import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const EmptyState = ({ message, details = null }) => {
  return (
    <View className="flex-1 justify-center items-center p-4">
      <FontAwesome6
        name="hourglass-empty"
        size={32}
        color="black"
        marginBottom={10}
      />
      <Text className="text-xl font-semibold mb-1">{message}</Text>
      <Text className="text-md text-center">{details}</Text>
    </View>
  );
};

export default EmptyState;
