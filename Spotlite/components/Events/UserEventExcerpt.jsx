import { View, Text, Image, Dimensions, TouchableOpacity } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { router } from "expo-router";
import { useSelector } from "react-redux";

import { selectUserEventById } from "../../slices/eventsSlice";

import CustomBottomSheetModal from "../Modals/CustomBottomSheetModal";
import UserEventMenuModal from "../Modals/UserEventMenuModal";

import Entypo from "@expo/vector-icons/Entypo";

const UserEventExcerpt = React.memo(({ eventId }) => {
  const event = useSelector((state) => selectUserEventById(state, eventId));

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

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["12%"], []);
  const [modalContent, setModalContent] = useState(null);

  const handleEventMenuClick = () => {
    setModalContent(
      <UserEventMenuModal eventId={eventId} bottomSheetRef={bottomSheetRef} />
    );
    bottomSheetRef.current?.present();
  };
  return (
    <>
      <View className="bg-white px-4 py-2">
        <TouchableOpacity
          className="flex flex-row items-center"
          onPress={() => {
            router.push({
              pathname: "/display-user-event/[eventId]",
              params: { event: JSON.stringify(event) },
              // params: { eventId: event?.id },
            });
          }}
        >
          {event?.media_files.length != 0 && firstImage != null ? (
            <Image
              className="w-[70px] h-[70px] rounded-xl mr-3"
              source={{ uri: firstImage }}
              resizeMode="cover"
            />
          ) : (
            <Image
              className="w-[70px] h-[70px] rounded-xl mr-3"
              source={require("../../assets/images/default-event-image.png")}
              resizeMode="cover"
            />
          )}
          <View className="flex-1">
            <Text
              className=" text-base font-medium text-gray-800"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {event?.event_title}
            </Text>

            {event?.event_date || event?.event_time ? (
              <Text className="text-sm text-gray-800">
                {event?.event_date} {event?.event_time}
              </Text>
            ) : (
              <Text
                className="text-sm text-gray-800"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {event?.event_domain} event
              </Text>
            )}

            {event?.interested_count > 0 ? (
              <Text className="text-sm text-gray-500">
                {event?.interested_count} interested
              </Text>
            ) : (
              <Text
                className="text-sm text-gray-500"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {event?.event_description}
              </Text>
            )}
          </View>

          <TouchableOpacity className="ml-auto" onPress={handleEventMenuClick}>
            <Entypo name="dots-three-vertical" size={20} color="#1f2937" />
          </TouchableOpacity>
        </TouchableOpacity>

        <CustomBottomSheetModal snapPoints={snapPoints} ref={bottomSheetRef}>
          {modalContent}
        </CustomBottomSheetModal>
      </View>
    </>
  );
});
export default UserEventExcerpt;
