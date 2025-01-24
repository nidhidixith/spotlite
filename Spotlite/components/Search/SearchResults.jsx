import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";

import { performSearch, selectAllSearches } from "../../slices/searchSlice";

import NameProfilePic from "../NameProfilePic";
import ErrorDisplayComponent from "../Others/ErrorDisplayComponent";
import LoadingIndicator from "../Others/LoadingIndicator";

const SearchResults = () => {
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

  if (results.length === 0) {
    return <Text>No results found!</Text>;
  }

  const renderItem = ({ item }) => {
    if (item.type === "user") {
      return <NameProfilePic obj={item} index={item.id} key={item.id} />;
    } else if (item.type === "event") {
      const eventMediaFiles = item?.media_files;

      const firstImage =
        eventMediaFiles.find(
          (eventMediaFile) =>
            eventMediaFile?.media_file?.endsWith(".jpg") ||
            eventMediaFile?.media_file?.endsWith(".png") ||
            eventMediaFile?.media_file?.endsWith(".jpeg") ||
            eventMediaFile?.media_file?.endsWith(".webp")
        )?.media_file || null;

      return (
        <>
          {/* <View className="bg-white px-4 py-2"> */}
          <TouchableOpacity
            className="flex flex-row items-start"
            onPress={() => {
              router.push({
                pathname: "/display-event/[eventId]",
                // params: { eventId: event?.id },
                params: { event: JSON.stringify(item) },
              });
            }}
          >
            {item?.media_files.length != 0 && firstImage != null ? (
              <Image
                className="w-[70px] h-[70px] rounded-xl mr-4"
                source={{ uri: firstImage }}
                resizeMode="cover"
              />
            ) : (
              <Image
                className="w-[70px] h-[70px] rounded-xl mr-4"
                source={require("../../assets/images/default-event-image.png")}
                resizeMode="cover"
              />
            )}
            <View className="flex-1">
              <Text
                className=" text-[16px] font-semibold"
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {item?.event_title}
              </Text>
              <Text className="font-rregular text-sm">
                {item?.event_date} {item?.event_time}
              </Text>
              {/* <Text className="font-rregular text-sm text-gray-500">Online</Text> */}
              {item?.interested_count > 0 ? (
                <Text className="font-rregular text-sm text-gray-500">
                  {item?.interested_count} interested
                </Text>
              ) : (
                <Text
                  className="font-rregular text-sm text-gray-500"
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item?.event_description}
                </Text>
              )}
            </View>
          </TouchableOpacity>
          {/* </View> */}
        </>
      );
    }
  };
  return (
    <FlatList
      data={results}
      keyExtractor={(item) => `user-${item.id}`}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      // ListEmptyComponent={
      //   <Text className="self-center">No results found!</Text>
      // }
    />
  );
};

export default SearchResults;
