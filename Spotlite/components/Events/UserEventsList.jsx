import React, { useEffect, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

import {
  clearUserEvents,
  fetchUserEvents,
  selectAllUserEvents,
  fetchUserEventsStatus,
} from "../../slices/eventsSlice";

import UserEventExcerpt from "./UserEventExcerpt";

const UserEventsList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserEvents());

    // dispatch(loadUserFromLocalStorage());

    // return () => {
    //   dispatch(clearPosts());
    // };
  }, [dispatch]);

  const events = useSelector(selectAllUserEvents);
  console.log("Events:", events);
  // const fetchPostsStatus = useSelector(
  //   (state) => state.userProfile.fetchProfileStatus
  // );

  // const fetchProfileError = useSelector(
  //   (state) => state.userProfile.fetchProfileError
  // );

  const renderItem = ({ item }) => {
    if (events.length === 0) {
      return <View>Loading...</View>;
    } else {
      return (
        <UserEventExcerpt key={`userevent-${item.id}`} eventId={item.id} />
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      />
    </SafeAreaView>
  );
};

export default UserEventsList;
