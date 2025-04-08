import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { useSelector } from "react-redux";

import { selectOtherUserEventById } from "../../slices/eventsSlice";

import GeneralEventExcerpt from "./GeneralEventExcerpt";

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
    <View className="bg-white px-4 py-2">
      <GeneralEventExcerpt event={event} />
    </View>
    // <>
    //   <View className="bg-white px-4 py-2">
    //     <TouchableOpacity
    //       className="flex flex-row items-center"
    //       onPress={() => {
    //         router.push({
    //           pathname: "/display-event/[eventId]",
    //           params: { event: JSON.stringify(event) },
    //           // params: { eventId: event?.id },
    //         });
    //       }}
    //     >
    //       {event?.media_files.length != 0 && firstImage != null ? (
    //         <Image
    //           className="w-[70px] h-[70px] rounded-xl mr-3"
    //           source={{ uri: firstImage }}
    //           resizeMode="cover"
    //         />
    //       ) : (
    //         <Image
    //           className="w-[70px] h-[70px] rounded-xl mr-3"
    //           source={require("../../assets/images/default-event-image.png")}
    //           resizeMode="cover"
    //         />
    //       )}

    //       <View className="flex-1">
    //         <Text
    //           className=" text-base font-medium text-gray-800"
    //           numberOfLines={1}
    //           ellipsizeMode="tail"
    //         >
    //           {event?.event_title}
    //         </Text>

    //         {event?.event_date || event?.event_time ? (
    //           <Text className="text-sm text-gray-800">
    //             {event?.event_date} {event?.event_time}
    //           </Text>
    //         ) : (
    //           <Text
    //             className="text-sm text-gray-800"
    //             numberOfLines={1}
    //             ellipsizeMode="tail"
    //           >
    //             {event?.event_domain} event
    //           </Text>
    //         )}

    //         {event?.interested_count > 0 ? (
    //           <Text className="text-sm text-gray-500">
    //             {event?.interested_count} interested
    //           </Text>
    //         ) : (
    //           <Text
    //             className="text-sm text-gray-500"
    //             numberOfLines={1}
    //             ellipsizeMode="tail"
    //           >
    //             {event?.event_description}
    //           </Text>
    //         )}
    //       </View>
    //     </TouchableOpacity>
    //   </View>
    // </>
  );
});
export default OtherUserEventExcerpt;
