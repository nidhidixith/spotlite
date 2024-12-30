import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectAllSearches } from "../../slices/searchSlice";
import NameProfilePic from "../NameProfilePic";
import { router } from "expo-router";

const SearchResults = () => {
  const results = useSelector(selectAllSearches);

  if (results.length === 0) {
    return <Text>No results found!</Text>;
  }

  const renderItem = ({ item }) => {
    if (item.type === "user") {
      return <NameProfilePic obj={item} index={item.id} key={item.id} />;
    } else if (item.type === "event") {
      const eventMedia = item?.media_files[0]?.media_file;

      const isImage =
        eventMedia?.endsWith(".jpg") ||
        eventMedia?.endsWith(".png") ||
        eventMedia?.endsWith(".jpeg") ||
        eventMedia?.endsWith(".webp");

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
            {item?.media_files.length != 0 && isImage ? (
              <Image
                className="w-[70px] h-[70px] rounded-xl mr-4"
                source={{ uri: eventMedia }}
                // source={require("../../assets/images/pic1.jpg")}
                resizeMode="cover"
              />
            ) : (
              <Image
                className="w-[70px] h-[70px] rounded-xl mr-4"
                // source={{ uri: event?.media_files[0] }}
                source={require("../../assets/images/pic1.jpg")}
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
