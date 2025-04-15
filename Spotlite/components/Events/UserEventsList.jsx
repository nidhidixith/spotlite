import React, { useEffect, useCallback, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

import {
  clearUserEvents,
  fetchUserEvents,
  selectAllUserEvents,
} from "../../slices/eventsSlice";

import UserEventExcerpt from "./UserEventExcerpt";
import EmptyState from "../Others/EmptyState";
import ErrorDisplayComponent from "../Others/ErrorDisplayComponent";
import LoadingIndicator from "../Others/LoadingIndicator";

const UserEventsList = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      await dispatch(fetchUserEvents()).unwrap();
    } catch (error) {
      console.error("Failed to fetch events:", error); // Handle fetch errors
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const events = useSelector(selectAllUserEvents);

  const fetchEventsStatus = useSelector(
    (state) => state.event.userEvents.loading
  );

  const fetchEventsError = useSelector((state) => state.event.userEvents.error);

  const handleRetry = () => {
    fetchData(); // Retry fetching events
  };

  if (fetchEventsStatus) {
    return <LoadingIndicator />;
  }

  if (fetchEventsError) {
    <ErrorDisplayComponent onRetry={handleRetry} />;
  }

  const renderItem = ({ item }) => {
    return <UserEventExcerpt key={`userevent-${item.id}`} eventId={item.id} />;
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        ListEmptyComponent={
          <EmptyState
            message="No events yet"
            details="Create an event to connect with people and share experiences."
            icon="calendar"
          />
        }
        contentContainerStyle={
          events.length === 0 ? { flex: 1 } : {} // Ensures centering when the list is empty
        }
      />
    </SafeAreaView>
  );
};

export default UserEventsList;
