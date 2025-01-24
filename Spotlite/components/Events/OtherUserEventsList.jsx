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
  fetchOtherUserEvents,
  selectEventsByUser,
} from "../../slices/eventsSlice";

import OtherUserEventExcerpt from "./OtherUserEventExcerpt";
import EmptyState from "../Others/EmptyState";
import ErrorDisplayComponent from "../Others/ErrorDisplayComponent";
import LoadingIndicator from "../Others/LoadingIndicator";

const OtherUserEventsList = ({ userId }) => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      await dispatch(fetchOtherUserEvents(userId)).unwrap();
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const events = useSelector((state) => selectEventsByUser(state, userId));

  const fetchEventsStatus = useSelector(
    (state) => state.event.otherUserEvents.loading
  );

  const fetchEventsError = useSelector(
    (state) => state.event.otherUserEvents.error
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
      <OtherUserEventExcerpt
        key={`otheruserevent-${item.id}`}
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
        ListEmptyComponent={<EmptyState message="No events yet!" />}
        contentContainerStyle={
          events.length === 0 ? { flex: 1 } : {} // Ensures centering when the list is empty
        }
      />
    </SafeAreaView>
  );
};

export default OtherUserEventsList;
