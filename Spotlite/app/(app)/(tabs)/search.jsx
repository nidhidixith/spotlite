import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

import { clearSearches, performSearch } from "../../../slices/searchSlice";

import SearchResults from "../../../components/Search/SearchResults";
import SearchTab from "../../../components/Search/SearchTab";

const Search = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("people");
  const [hasSearched, setHasSearched] = useState(false); // Track if a search was performed
  const dispatch = useDispatch();

  const handleSearchClick = (query) => {
    setQuery(query);
    if (query === "") return Alert.alert("Please input something");

    // Default to searching people first
    dispatch(performSearch({ query, filter: "people" }));
    setActiveTab("people"); // Reset active tab to people
    setHasSearched(true);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    dispatch(performSearch({ query, filter: tab })); // Fetch new results
  };

  const handleClearSearches = () => {
    dispatch(clearSearches());
    setQuery(""); // Clear the input field
    setHasSearched(false); // Reset search state
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <SearchTab handleSearchClick={handleSearchClick} />

      <View className="bg-white flex flex-row px-4 py-2 ">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <TouchableOpacity
            className={`py-1 px-3 mr-4 rounded-2xl bg-gray-200 ${
              activeTab === "people" && "bg-sky-600"
            }`}
            onPress={() => handleTabChange("people")}
          >
            <Text
              className={`font-semibold text-sm ${
                activeTab === "people" && "text-white"
              }`}
            >
              People
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`py-1 px-3 mr-4 rounded-2xl bg-gray-200 ${
              activeTab === "posts" && "bg-sky-600"
            }`}
            onPress={() => handleTabChange("posts")}
          >
            <Text
              className={`font-semibold text-sm ${
                activeTab === "posts" && "text-white"
              }`}
            >
              Posts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`py-1 px-3 mr-4 rounded-2xl bg-gray-200 ${
              activeTab === "events" && "bg-sky-600"
            }`}
            onPress={() => handleTabChange("events")}
          >
            <Text
              className={`font-semibold text-sm ${
                activeTab === "events" && "text-white"
              }`}
            >
              Events
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity
          className={"p-1 ml-auto"}
          onPress={() => handleClearSearches()}
        >
          <Text className={"text-sky-600 text-sm "}>Clear</Text>
        </TouchableOpacity>
      </View>
      <SearchResults filter={activeTab} hasSearched={hasSearched} />
    </SafeAreaView>
  );
};

export default Search;
