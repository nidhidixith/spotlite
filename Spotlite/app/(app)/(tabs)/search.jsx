import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";

import {
  clearSearches,
  performSearch,
  selectAllSearches,
} from "../../../slices/searchSlice";

import SearchResults from "../../../components/Search/SearchResults";
import EmptyState from "../../../components/Others/EmptyState";
import Feather from "@expo/vector-icons/Feather";
import LoadingIndicator from "../../../components/Others/LoadingIndicator";
import ErrorDisplayComponent from "../../../components/Others/ErrorDisplayComponent";
import NameProfilePic from "../../../components/NameProfilePic";
import GeneralPostExcerpt from "../../../components/Posts/GeneralPostExcerpt";
import GeneralEventExcerpt from "../../../components/Events/GeneralEventExcerpt";
import SearchTab from "../../../components/Search/SearchTab";

const Search = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("people");
  const [hasSearched, setHasSearched] = useState(false); // Track if a search was performed
  const dispatch = useDispatch();
  const results = useSelector(selectAllSearches);

  // const handleSearchClick = () => {
  //   if (query === "") return Alert.alert("Please input something");

  //   dispatch(performSearch({ query }));
  //   // setQuery(""); // Clear the input field
  //   setHasSearched(true); // Mark search as performed
  // };

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
      {/* <View className="flex flex-row items-center  bg-gray-100 rounded-lg px-3 py-2 mx-3 mt-3 border">
        <FontAwesome name="search" size={16} color="#9CA3AF" marginRight={10} />
        <TextInput
          value={query}
          className="flex-1 text-gray-900 text-sm"
          placeholder="Type something..."
          placeholderTextColor="#9CA3AF"
          onChangeText={setQuery}
        />
        <TouchableOpacity className="" onPress={handleSearchClick}>
          <Text className="text-sky-600 text-sm">Search</Text>
        </TouchableOpacity>
      </View> */}

      <SearchTab handleSearchClick={handleSearchClick} />
      {/* <View className="px-4 py-2"> */}
      {/* <View className="flex flex-row items-center justify-between py-1 mb-2">
          <Text className="text-gray-600 font-medium text-sm">Recent</Text>
          <TouchableOpacity className="" onPress={handleClearSearches}>
            <Text className="text-sky-600 text-sm">Clear</Text>
          </TouchableOpacity>
        </View> */}
      {/* {hasSearched && results.length === 0 ? (
          <View className="items-center">
            <Feather name="search" size={40} color="gray" marginBottom={10} />

            <Text className="text-lg font-semibold text-gray-800">
              No results found
            </Text>
          </View>
        ) : (
          !hasSearched && (
            <View className="items-center">
              <Feather name="search" size={40} color="gray" marginBottom={10} />

              <Text className="text-lg font-semibold text-gray-800">
                Start searching
              </Text>
              <Text className="text-sm text-center text-gray-500">
                Enter a keyword to find posts, people, or events.
              </Text>
            </View>
          )
        )} */}

      <View className="bg-white flex flex-row px-4 py-2 ">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          // className="border"
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
      {/* <EventsList filter={activeTab} /> */}
      {/* {hasSearched && results.length > 0 && (
                <SearchResults filter={activeTab} />
              )} */}
      {/* </View> */}
    </SafeAreaView>
  );
};

export default Search;
