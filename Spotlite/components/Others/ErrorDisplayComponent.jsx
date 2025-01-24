import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ErrorDisplayComponent = ({
  message = "Oops! Something went wrong.",
  onRetry,
}) => {
  return (
    <View className="flex-1 justify-center items-center bg-white px-4">
      <Text className="text-red-600 text-lg font-bold mb-4">{message}</Text>
      <Text className="text-gray-600 text-center mb-4">
        Please check your connection or try again later.
      </Text>
      {onRetry && (
        <TouchableOpacity
          className="bg-sky-600 py-2 px-6 rounded-full"
          onPress={onRetry}
        >
          <Text className="text-white font-medium">Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ErrorDisplayComponent;
