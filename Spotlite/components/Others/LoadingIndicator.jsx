import React from "react";
import { View, ActivityIndicator } from "react-native";

const LoadingIndicator = ({ size = "large", color = "#0284c7" }) => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default LoadingIndicator;
