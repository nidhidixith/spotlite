import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

import {
  fetchEvents,
  selectAllEvents,
  fetchEventsStatus,
} from "../../slices/eventsSlice";

import EventExcerpt from "./EventExcerpt";
import EmptyState from "../Others/EmptyState";
import ErrorDisplayComponent from "../Others/ErrorDisplayComponent";
import LoadingIndicator from "../Others/LoadingIndicator";

const EventsList = ({ filter }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing

  const fetchData = async () => {
    try {
      await dispatch(fetchEvents(filter)).unwrap(); // Fetch events with the current filter
    } catch (error) {
      console.error("Failed to fetch events:", error); // Handle fetch errors
    }
  };

  useEffect(() => {
    fetchData(); // Fetch events when the component mounts or filter changes
  }, [dispatch, filter]);

  const events = useSelector(selectAllEvents);

  const fetchEventsStatus = useSelector((state) => state.event.events.loading);
  const fetchEventsError = useSelector((state) => state.event.events.error);

  const handleRetry = () => {
    fetchData(); // Retry fetching events
  };

  if (fetchEventsStatus) {
    return <LoadingIndicator />;
  }

  if (fetchEventsError) {
    return <ErrorDisplayComponent onRetry={handleRetry} />;
  }

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchEvents(filter)).unwrap(); // Fetch posts and wait for completion
    } catch (error) {
      console.error("Error refreshing events:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderItem = ({ item }) => {
    return <EventExcerpt key={`event-${item.id}`} eventId={item.id} />;
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <EmptyState
            message="No events to show!"
            details="Follow people, add your location, add interests to see events in the feed"
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

export default EventsList;
