import React, { useEffect, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

import {
  clearOtherUserEvents,
  fetchOtherUserEvents,
  selectAllOtherUserEvents,
  fetchOtherUserEventsStatus,
  selectEventsByUser,
} from "../../slices/eventsSlice";

import OtherUserEventExcerpt from "./OtherUserEventExcerpt";

const OtherUserEventsList = ({ userId }) => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchOtherUserEvents(userId));

  //   // dispatch(loadUserFromLocalStorage());

  //   // return () => {
  //   //   dispatch(clearPosts());
  //   // };
  // }, [dispatch]);

  const events = useSelector((state) => selectEventsByUser(state, userId));
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
        <OtherUserEventExcerpt
          key={`otheruserevent-${item.id}`}
          eventId={item.id}
        />
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

export default OtherUserEventsList;
