import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { useSelector } from "react-redux";

import { selectOtherUserEventById } from "../../slices/eventsSlice";

const OtherUserEventExcerpt = React.memo(({ eventId }) => {
  const event = useSelector((state) =>
    selectOtherUserEventById(state, eventId)
  );

  const eventMediaFiles = event?.media_files;

  const firstImage =
    eventMediaFiles.find(
      (eventMediaFile) =>
        eventMediaFile?.media_file?.endsWith(".jpg") ||
        eventMediaFile?.media_file?.endsWith(".png") ||
        eventMediaFile?.media_file?.endsWith(".jpeg") ||
        eventMediaFile?.media_file?.endsWith(".webp")
    )?.media_file || null;

  const uniqueKey = `otheruserevent-${event?.id}`;
  return (
    <>
      <View className="bg-white px-4 py-2">
        <TouchableOpacity
          className="flex flex-row items-start"
          onPress={() => {
            router.push({
              pathname: "/display-event/[eventId]",
              params: { event: JSON.stringify(event) },
              // params: { eventId: event?.id },
            });
          }}
        >
          {event?.media_files.length != 0 && firstImage != null ? (
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
              {event?.event_title}
            </Text>
            <Text className="font-rregular text-sm">
              {event?.event_date} {event?.event_time}
            </Text>
            {event?.interested_count > 0 ? (
              <Text className="font-rregular text-sm text-gray-500">
                {event?.interested_count} interested
              </Text>
            ) : (
              <Text
                className="font-rregular text-sm text-gray-500"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {event?.event_description}
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
});
export default OtherUserEventExcerpt;
