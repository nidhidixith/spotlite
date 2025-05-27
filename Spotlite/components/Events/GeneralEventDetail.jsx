import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useMemo, useRef, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "expo-router";

import {
  addInterestInEvent,
  removeInterestInEvent,
  selectUserEventById,
} from "../../slices/eventsSlice";

import EventCarousel from "../../components/Events/EventCarousel";

import { debounce } from "../../utilities/debounce";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import EventComments from "../Buttons/EventComments";

const DEBOUNCE_DELAY = 2000; // or 400 if you prefer a bit more cushion

const GeneralEventDetail = ({ event }) => {
  const dispatch = useDispatch();

  // const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  let [eventInterestsCount, setEventInterestsCount] = useState(
    event?.interested_count
  );

  let [isInterested, setIsInterested] = useState(event?.is_interested);
  const [activeTab, setActiveTab] = useState("details");

  const debouncedAddInterest = useMemo(
    () =>
      debounce(() => {
        dispatch(addInterestInEvent({ eventId: event?.id }));
      }, DEBOUNCE_DELAY),
    [dispatch, event?.id]
  );

  const debouncedRemoveInterest = useMemo(
    () =>
      debounce(() => {
        dispatch(removeInterestInEvent({ eventId: event?.id }));
      }, DEBOUNCE_DELAY),
    [dispatch, event?.id]
  );

  const handleAddInterest = () => {
    debouncedRemoveInterest.cancel();
    setEventInterestsCount((prev) => prev + 1);
    setIsInterested(true);
    debouncedAddInterest();
  };

  const handleRemoveInterest = () => {
    debouncedAddInterest.cancel();
    setEventInterestsCount((prev) => prev - 1);
    setIsInterested(false);
    debouncedRemoveInterest();
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
        <Text className="text-lg text-gray-800 font-semibold self-start">
          {event?.event_title}
        </Text>

        {/* Event Details */}
        <View className="space-y-2 my-2 p-1">
          <Link
            href={{
              pathname: "/display-profile/[userId]",
              params: { userId: event?.user_id },
            }}
            onPress={() => console.log("Link pressed")}
          >
            <View className="flex flex-row items-center">
              <MaterialIcons
                name="person"
                size={18}
                color="#4b5563"
                marginRight={14}
              />
              <Text className="text-sm text-gray-800 ">
                Event by{" "}
                <Text className="text-sky-600 font-medium">
                  {event?.display_name}
                </Text>
              </Text>
            </View>
          </Link>

          {event?.event_date && (
            <View className="flex flex-row items-center">
              <MaterialIcons
                name="calendar-month"
                size={18}
                color="#4b5563"
                marginRight={14}
              />

              <Text className="text-sm text-gray-800 ">
                {event?.event_date}
              </Text>
            </View>
          )}

          {event?.event_time && (
            <View className="flex flex-row items-center">
              <MaterialIcons
                name="access-time-filled"
                size={18}
                color="#4b5563"
                marginRight={14}
              />
              <Text className="text-sm text-gray-800 ">
                {event?.event_time}
              </Text>
            </View>
          )}

          {event?.event_location && (
            <View className="flex flex-row items-center">
              <MaterialIcons
                name="location-on"
                size={18}
                color="#4b5563"
                marginRight={14}
              />
              <Text className="text-sm text-gray-800 flex-1">
                {event?.event_location}
              </Text>
            </View>
          )}

          {event?.event_link && (
            <View className="flex flex-row items-center">
              <MaterialIcons
                name="link"
                size={18}
                color="#4b5563"
                marginRight={14}
              />
              <Text className="text-sm text-sky-600 flex-1 underline">
                {event?.event_link}
              </Text>
            </View>
          )}

          {eventInterestsCount > 0 && (
            <View className="flex flex-row items-center">
              <MaterialIcons
                name="star-rate"
                size={18}
                color="#4b5563"
                marginRight={14}
              />
              <Text className="text-sm text-gray-800 ">
                {eventInterestsCount} interested
              </Text>
            </View>
          )}
        </View>

        <View className="px-4 py-2 bg-gray-50 rounded-lg flex flex-row items-center flex-wrap">
          <Text className="text-xs flex-1 mr-1 italic">
            Mark interested to show your interest in the event
          </Text>
          {isInterested ? (
            <TouchableOpacity
              onPress={handleRemoveInterest}
              activeOpacity={0.5}
              className="border border-sky-600 bg-sky-600 rounded-lg px-2 py-1 flex flex-row items-center justify-center"
            >
              <MaterialIcons
                name="star-rate"
                size={14}
                color="#fef08a"
                marginRight={6}
              />
              <Text className="text-sm  text-white">Interested</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleAddInterest}
              activeOpacity={0.5}
              className="border border-red-500 bg-white rounded-lg px-2 py-1 flex flex-row items-center justify-center"
            >
              <Text className="text-sm  text-red-500">Interested?</Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="flex-row border-y border-gray-200 ">
          <TouchableOpacity
            onPress={() => setActiveTab("details")}
            className={`w-1/2 items-center py-2 border-b-2 ${
              activeTab === "details" ? "border-sky-600" : "border-transparent"
            }`}
          >
            <Text
              className={`text-base font-semibold ${
                activeTab === "details" ? "text-sky-600" : "text-gray-500"
              }`}
            >
              Details
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab("comments")}
            className={`w-1/2 items-center py-2 border-b-2 ${
              activeTab === "comments" ? "border-sky-600" : "border-transparent"
            }`}
          >
            <Text
              className={`text-base font-semibold ${
                activeTab === "comments" ? "text-sky-600" : "text-gray-500"
              }`}
            >
              Comments
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "details" ? (
          <Text className="text-sm text-gray-800 mt-2 text-justify">
            {event?.event_description}
          </Text>
        ) : (
          <EventComments eventId={event?.id} />
        )}
      </View>
    </ScrollView>
  );
};

export default GeneralEventDetail;
