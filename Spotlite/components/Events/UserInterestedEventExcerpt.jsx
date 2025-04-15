import { View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

import { selectUserInterestedEventById } from "../../slices/eventsSlice";
import GeneralEventExcerpt from "./GeneralEventExcerpt";

const UserInterestedEventExcerpt = React.memo(({ eventId }) => {
  const event = useSelector((state) =>
    selectUserInterestedEventById(state, eventId)
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

  const uniqueKey = `userevent-${event?.id}`;

  return (
    <View className="bg-white px-4 py-2">
      <GeneralEventExcerpt event={event} />
    </View>
  );
});
export default UserInterestedEventExcerpt;
