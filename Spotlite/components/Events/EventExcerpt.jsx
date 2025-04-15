import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { useSelector } from "react-redux";

import { selectEventById } from "../../slices/eventsSlice";

import GeneralEventExcerpt from "./GeneralEventExcerpt";

const EventExcerpt = React.memo(({ eventId }) => {
  const event = useSelector((state) => selectEventById(state, eventId));

  const eventMediaFiles = event?.media_files;

  const firstImage =
    eventMediaFiles.find(
      (eventMediaFile) =>
        eventMediaFile?.media_file?.endsWith(".jpg") ||
        eventMediaFile?.media_file?.endsWith(".png") ||
        eventMediaFile?.media_file?.endsWith(".jpeg") ||
        eventMediaFile?.media_file?.endsWith(".webp")
    )?.media_file || null;

  const uniqueKey = `event-${event?.id}`;
  return (
    <View className="bg-white px-4 py-2">
      <GeneralEventExcerpt event={event} />
    </View>
  );
});
export default EventExcerpt;
