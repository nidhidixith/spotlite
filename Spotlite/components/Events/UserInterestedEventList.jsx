import React, { useEffect, useCallback } from "react";
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
  fetchUserInterestedEvents,
  selectAllUserInterestedEvents,
} from "../../slices/eventsSlice";

import EmptyState from "../Others/EmptyState";
import ErrorDisplayComponent from "../Others/ErrorDisplayComponent";
import LoadingIndicator from "../Others/LoadingIndicator";
import UserInterestedEventExcerpt from "./UserInterestedEventExcerpt";

const UserInterestedEventsList = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      await dispatch(fetchUserInterestedEvents()).unwrap();
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const events = useSelector(selectAllUserInterestedEvents);

  const fetchEventsStatus = useSelector(
    (state) => state.event.userInterestedEvents.loading
  );

  const fetchEventsError = useSelector(
    (state) => state.event.userInterestedEvents.error
  );

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
    return (
      <UserInterestedEventExcerpt
        key={`userInterestedEvent-${item.id}`}
        eventId={item.id}
      />
    );
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
            message="Start Exploring Events"
            details="Mark events you're interested in to keep track of them here!"
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

export default UserInterestedEventsList;
