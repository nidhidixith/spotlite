import React, { useEffect, useCallback, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

import {
  clearEvents,
  fetchEvents,
  selectAllEvents,
  fetchEventsStatus,
  // selectEventsByFilter,
} from "../../slices/eventsSlice";

import EventExcerpt from "./EventExcerpt";

const EventsList = ({ filter }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing

  useEffect(() => {
    dispatch(fetchEvents(filter));

    // dispatch(loadUserFromLocalStorage());

    // return () => {
    //   dispatch(clearPosts());
    // };
  }, [dispatch, filter]);

  // const events = useSelector((state) => selectEventsByFilter(state, filter));

  const events = useSelector(selectAllEvents);
  console.log("Filter:", filter);
  console.log("Filtered events:", events);

  // const fetchPostsStatus = useSelector(
  //   (state) => state.userProfile.fetchProfileStatus
  // );

  // const fetchProfileError = useSelector(
  //   (state) => state.userProfile.fetchProfileError
  // );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      console.log("Refreshing events...");
      await dispatch(fetchEvents(filter)).unwrap(); // Fetch posts and wait for completion
      console.log("Events refreshed successfully");
    } catch (error) {
      console.error("Error refreshing events:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderItem = ({ item }) => {
    if (events.length === 0) {
      return <View>Loading...</View>;
    } else {
      return <EventExcerpt key={`event-${item.id}`} eventId={item.id} />;
    }
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
      />
    </SafeAreaView>
  );
};

export default EventsList;
