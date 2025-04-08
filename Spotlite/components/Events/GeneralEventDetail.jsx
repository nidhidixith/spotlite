import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "expo-router";

import {
  addInterestInEvent,
  removeInterestInEvent,
  selectUserEventById,
} from "../../slices/eventsSlice";

import InterestedModal from "../../components/Modals/InterestedModal";
import CustomBottomSheetModal from "../../components/Modals/CustomBottomSheetModal";
import EventCarousel from "../../components/Events/EventCarousel";

import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const GeneralEventDetail = ({ event }) => {
  const dispatch = useDispatch();

  let [eventInterestsCount, setEventInterestsCount] = useState(
    event?.interested_count
  );

  let [isInterested, setIsInterested] = useState(event?.is_interested);

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

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        backgroundColor: "white",
      }}
    >
      {event?.media_files && <EventCarousel mediaFiles={event?.media_files} />}
      <View className="px-4 py-2">
        <Text className="text-lg text-gray-800 font-semibold self-start mb-3">
          {event?.event_title}
        </Text>

        <Text className="text-sm text-gray-800 mb-3">
          Event by{" "}
          <Link
            href={{
              pathname: "/display-profile/[userId]",
              params: { userId: event?.user_id },
            }}
            onPress={() => console.log("Link pressed")}
          >
            <Text className="text-base font-medium text-sky-600">
              {event?.display_name}
            </Text>
          </Link>
        </Text>

        {/* Event Details */}
        <View className="space-y-2">
          {(event?.event_date || event?.event_time) && (
            <View className="flex flex-row items-center">
              <FontAwesome
                name="calendar"
                size={10}
                color="#1f2937"
                marginRight={10}
              />
              <Text className="text-sm text-gray-800">
                {event?.event_date} {event?.event_time}
              </Text>
            </View>
          )}

          {event?.event_location && (
            <View className="flex flex-row items-center">
              <FontAwesome6
                name="location-dot"
                size={14}
                color="#1f2937"
                marginRight={10}
              />
              <Text className="text-sm text-gray-800">
                {event?.event_location}
              </Text>
            </View>
          )}

          {event?.event_link && (
            <View className="flex flex-row items-center">
              <FontAwesome5
                name="link"
                size={10}
                color="#1f2937"
                marginRight={10}
              />
              <Text className="text-sm text-sky-600 underline">
                {event?.event_link}
              </Text>
            </View>
          )}

          {eventInterestsCount > 0 && (
            <View className="flex flex-row items-center">
              <FontAwesome
                name="star"
                size={14}
                color="#1f2937"
                marginRight={10}
              />
              <Text className="text-sm text-gray-800">
                {eventInterestsCount} interested
              </Text>
            </View>
          )}
        </View>

        <View className="my-4">
          {isInterested ? (
            <TouchableOpacity
              onPress={handleRemoveInterest}
              activeOpacity={0.5}
              // className="bg-gray-300 p-1 flex flex-row items-center justify-center rounded-2xl"
              className="border border-sky-600 bg-sky-600 rounded-2xl p-1  flex flex-row items-center justify-center"
            >
              <FontAwesome
                name="star"
                size={16}
                color="#fef08a"
                marginRight={10}
              />
              <Text className="text-base font-medium text-white">
                Interested
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleAddInterest}
              activeOpacity={0.5}
              // className="bg-gray-300 p-1 flex flex-row items-center justify-center rounded-2xl"
              className="border border-sky-600  bg-sky-600 rounded-2xl p-1  flex flex-row items-center justify-center"
            >
              <FontAwesome
                name="star-o"
                size={16}
                color="#fef08a"
                marginRight={10}
              />
              <Text className="text-base font-medium text-white">
                Interested
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="border-t border-gray-200 py-2">
          <Text className="text-lg font-semibold text-gray-800">
            Event Details
          </Text>
          <Text className="text-sm text-gray-800 mt-2 text-justify">
            {event?.event_description}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default GeneralEventDetail;
