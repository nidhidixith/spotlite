import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const SearchTab = ({ handleSearchClick }) => {
  const [query, setQuery] = useState("");

  return (
    <View className="flex flex-row items-center  bg-gray-100 rounded-full mx-3 px-4 py-1 mb-2 mt-3">
      <FontAwesome name="search" size={16} color="#9CA3AF" marginRight={10} />
      <TextInput
        value={query}
        className="flex-1 text-gray-900 text-sm"
        placeholder="Type something..."
        placeholderTextColor="#9CA3AF"
        onChangeText={setQuery}
      />
      <TouchableOpacity className="" onPress={() => handleSearchClick(query)}>
        <Text className="text-sky-600 text-sm">Search</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchTab;
