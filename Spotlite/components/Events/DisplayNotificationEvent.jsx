import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  addInterestInEvent,
  removeInterestInEvent,
  selectUserEventById,
} from "../../slices/eventsSlice";

import InterestedModal from "../../components/Modals/InterestedModal";
import CustomBottomSheetModal from "../../components/Modals/CustomBottomSheetModal";
import { useLocalSearchParams } from "expo-router";
import { Link } from "expo-router";
import { selectEventById } from "../../slices/eventsSlice";
import EventCarousel from "../../components/Events/EventCarousel";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const DisplayNotificationEvent = ({ eventId }) => {
  const event = useSelector((state) => selectUserEventById(state, eventId));

  console.log("Event from display notification event:", event);

  const dispatch = useDispatch();

  let [eventInterestsCount, setEventInterestsCount] = useState(
    event?.interested_count
  );

  let [isInterested, setIsInterested] = useState(event?.is_interested);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%", "75%"], []);
  const [modalContent, setModalContent] = useState(null);

  const handleAddInterest = () => {
    setEventInterestsCount(eventInterestsCount + 1);
    setIsInterested(true);
    dispatch(addInterestInEvent({ eventId: event?.id }));
  };

  const handleRemoveInterest = () => {
    setEventInterestsCount(eventInterestsCount - 1);
    setIsInterested(false);
    dispatch(removeInterestInEvent({ eventId: event?.id }));
  };

  const handleGetInterests = () => {
    setModalContent(
      <InterestedModal eventId={event?.id} bottomSheetRef={bottomSheetRef} />
    );
    bottomSheetRef.current?.present();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "white",
      }}
    >
      {event?.media_files && <EventCarousel mediaFiles={event?.media_files} />}
      <View className="px-4 py-2">
        <Text className="text-xl font-bold self-start mb-3">
          {event?.event_title}
        </Text>

        <Text className="text-[16px] mb-3">
          Event by{" "}
          <Link
            href={{
              pathname: "/display-profile/[userId]",
              // params: { userId: 2 },
              params: { userId: event?.user_id },
            }}
            onPress={() => console.log("Link pressed")}
          >
            <Text className="text-[16px] mb-3 font-semibold">
              {event?.display_name}
            </Text>
          </Link>
        </Text>

        <View className="mb-4">
          {(event?.event_date || event?.event_time) && (
            <View className="flex flex-row items-center mb-1 ">
              <FontAwesome
                name="calendar"
                size={12}
                color="#374151"
                marginRight={6}
              />
              <Text className="text-sm text-gray-700">
                {event?.event_date} {event?.event_time}
              </Text>
            </View>
          )}

          {event?.event_location && (
            <View className="flex flex-row items-center mb-1">
              <Ionicons
                name="location-sharp"
                size={14}
                color="black"
                marginRight={6}
              />
              <Text className="text-sm text-gray-700">
                {event?.event_location}
              </Text>
            </View>
          )}

          {event?.event_link && (
            <View className="flex flex-row items-center mb-1 ">
              <Entypo name="link" size={14} color="#374151" marginRight={6} />
              <Text className="text-sm text-gray-700">{event?.event_link}</Text>
            </View>
          )}

          {eventInterestsCount > 0 && (
            <TouchableOpacity
              className="flex flex-row items-center mb-1"
              onPress={handleGetInterests}
            >
              <AntDesign
                name="heart"
                size={12}
                color="#374151"
                marginRight={6}
              />
              <Text className=" text-sm text-sky-600">
                {eventInterestsCount} interested
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {isInterested ? (
          <TouchableOpacity
            onPress={handleRemoveInterest}
            activeOpacity={0.5}
            className="bg-gray-300 py-1 flex flex-row items-center justify-center rounded-full mb-6"
          >
            <AntDesign name="heart" size={16} color="red" marginRight={10} />
            <Text className="text-lg font-bold">Interested</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleAddInterest}
            activeOpacity={0.5}
            className="bg-gray-300 py-1 flex flex-row items-center justify-center rounded-full mb-6"
          >
            <AntDesign
              name="hearto"
              size={16}
              color="#374151"
              marginRight={10}
            />
            <Text className="text-lg font-bold">Interested</Text>
          </TouchableOpacity>
        )}

        <View className="border-t-2 border-gray-200">
          <Text className="mt-2 mb-2 text-lg font-semibold">Event Details</Text>
          <Text className="">{event?.event_description}</Text>
        </View>
      </View>
      <CustomBottomSheetModal snapPoints={snapPoints} ref={bottomSheetRef}>
        {modalContent}
      </CustomBottomSheetModal>
    </ScrollView>
  );
};

export default DisplayNotificationEvent;
