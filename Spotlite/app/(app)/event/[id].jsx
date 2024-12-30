import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text } from "react-native";
import UserEventExcerpt from "../../../components/Events/UserEventExcerpt";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserEvents,
  selectAllUserEvents,
  selectUserEventById,
} from "../../../slices/eventsSlice";
import DisplayNotificationEvent from "../../../components/Events/DisplayNotificationEvent";

const EventDetails = () => {
  let { eventId } = useLocalSearchParams();
  eventId = Number(eventId);
  console.log("eventId is: ", eventId);

  const events = useSelector(selectAllUserEvents);
  console.log("All user events: ", events);

  return <DisplayNotificationEvent eventId={eventId} />;
};

export default EventDetails;
