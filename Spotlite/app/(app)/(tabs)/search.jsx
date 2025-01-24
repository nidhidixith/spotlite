import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";

import {
  clearSearches,
  performSearch,
  selectAllSearches,
} from "../../../slices/searchSlice";

import SearchResults from "../../../components/Search/SearchResults";

const Search = () => {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false); // Track if a search was performed
  const dispatch = useDispatch();
  const results = useSelector(selectAllSearches);

  const handleSearchClick = () => {
    if (query === "") return Alert.alert("Please input something");

    dispatch(performSearch({ query }));
    // setQuery(""); // Clear the input field
    setHasSearched(true); // Mark search as performed
  };

  const handleClearSearches = () => {
    dispatch(clearSearches());
    setQuery(""); // Clear the input field
    setHasSearched(false); // Reset search state
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex flex-row items-center border border-gray-400 rounded-lg px-3 py-1 mx-3 mt-3">
        <FontAwesome name="search" size={16} color="#9ca3af" marginRight={10} />
        <TextInput
          value={query}
          className="flex-1"
          placeholder="Type something..."
          placeholderTextColor="#9ca3af"
          onChangeText={setQuery}
        />
        <TouchableOpacity
          className="bg-sky-100 px-2 py-1 rounded-lg"
          onPress={handleSearchClick}
        >
          <Text className="text-sky-600 text-xs">Search</Text>
        </TouchableOpacity>
      </View>

      <View className="px-4 mt-1">
        <TouchableOpacity className="" onPress={handleClearSearches}>
          <Text className="text-sky-600 self-end mb-1">Clear</Text>
        </TouchableOpacity>
        {hasSearched && results.length === 0 ? (
          <Text className="text-gray-400 mt-2 text-center">
            No results found.
          </Text>
        ) : (
          !hasSearched && (
            <Text className="text-gray-400 mt-2 text-center">
              Enter a query to see results.
            </Text>
          )
        )}
        {hasSearched && results.length > 0 && <SearchResults />}
      </View>
    </SafeAreaView>
  );
};

export default Search;
