import { View, Text, FlatList } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

import { selectAllSearches } from "../../slices/searchSlice";

import NameProfilePic from "../NameProfilePic";
import ErrorDisplayComponent from "../Others/ErrorDisplayComponent";
import LoadingIndicator from "../Others/LoadingIndicator";
import GeneralEventExcerpt from "../Events/GeneralEventExcerpt";
import GeneralPostExcerpt from "../Posts/GeneralPostExcerpt";
import EmptyState from "../Others/EmptyState";

const SearchResults = ({ filter, hasSearched }) => {
  const results = useSelector(selectAllSearches);
  const fetchSearchStatus = useSelector(
    (state) => state.search.searches.loading
  );
  const fetchSearchError = useSelector((state) => state.search.searches.error);

  if (fetchSearchStatus) {
    return <LoadingIndicator />;
  }

  if (fetchSearchError) {
    return <ErrorDisplayComponent />;
  }

  const renderItem = ({ item }) => {
    if (filter === "people") {
      return (
        <View className="bg-white px-4 py-2">
          <NameProfilePic obj={item} index={item.id} key={item.id} />
        </View>
      );
    } else if (filter === "posts") {
      return <GeneralPostExcerpt post={item} key={item.id} />;
    } else if (filter === "events") {
      return (
        <View className="bg-white px-4 py-2">
          <GeneralEventExcerpt event={item} key={item.id} />
        </View>
      );
    }
  };

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => `${filter}-${item.id}`}
      renderItem={renderItem}
      // contentContainerStyle={{ borderColor: "black", borderWidth: 1 }}
      ItemSeparatorComponent={() => (
        <View
          style={{
            height: filter === "posts" || filter === "events" ? 5 : 0,
            backgroundColor:
              filter === "posts" || filter === "events" ? "#f0f0f0" : "white",
          }}
        />
      )}
      ListEmptyComponent={
        <EmptyState
          message={
            hasSearched && results.length === 0
              ? "No results found"
              : "Type a keyword to search"
          }
          icon="search"
        />
      }
    />
  );
};

export default SearchResults;
