import { ActivityIndicator, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import {
  clearSpecificEvent,
  fetchSpecificEvent,
  selectAllSpecificEvents,
} from "../../../slices/eventsSlice";
import GeneralEventDetail from "../../../components/Events/GeneralEventDetail";
import ErrorDisplayComponent from "../../../components/Others/ErrorDisplayComponent";
import LoadingIndicator from "../../../components/Others/LoadingIndicator";
import GeneralUserEventDetail from "../../../components/Events/GeneralUserEventDetail";

const EventDetails = () => {
  let { eventId } = useLocalSearchParams();
  eventId = Number(eventId);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        await dispatch(fetchSpecificEvent({ eventId: eventId })).unwrap(); // Fetch data and unwrap the result
      } catch (error) {
        console.error("Failed to fetch event:", error); // Handle error
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchData();
    return () => {
      dispatch(clearSpecificEvent());
    };
  }, [dispatch, eventId]);

  let userEvent = useSelector(selectAllSpecificEvents);
  console.log("Specific event: ", userEvent);
  userEvent = userEvent[0];
  const fetchEventError = useSelector(
    (state) => state.event.specificEvent.error
  );

  if (loading) {
    return <LoadingIndicator />;
  }

  if (fetchEventError) {
    return <ErrorDisplayComponent />;
  }

  return <GeneralUserEventDetail event={userEvent} />;
};

export default EventDetails;
