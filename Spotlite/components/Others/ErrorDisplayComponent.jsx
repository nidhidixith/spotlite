import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const ErrorDisplayComponent = ({
  message = "Oops! Something went wrong.",
  onRetry,
}) => {
  return (
    <View className="flex-1 justify-center items-center bg-white px-4">
      <Text className="text-lg font-semibold text-gray-800 mb-1 text-center">
        {message}
      </Text>

      <Text className="text-sm text-center text-gray-500 mb-4">
        Please check your connection or try again later.
      </Text>
      {onRetry && (
        <TouchableOpacity
          className="bg-sky-600 py-2 px-6 rounded-full"
          onPress={onRetry}
        >
          <Text className="text-white font-medium text-sm">Retry</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ErrorDisplayComponent;
