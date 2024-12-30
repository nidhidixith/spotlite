import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useEffect, useCallback, useState } from "react";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import NotificationExcerpt from "../../../components/Notifications/NotificationExcerpt";

import {
  clearNotifications,
  fetchNotifications,
  resetNewNotificationCount,
  selectAllNotifications,
  // fetchEventsStatus,
  // selectEventsByFilter,
} from "../../../slices/notificationsSlice";
import { useFocusEffect } from "@react-navigation/native";

const Notifications = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing

  useEffect(() => {
    dispatch(fetchNotifications());
    // dispatch(resetNotificationCount());

    // return () => {
    //   dispatch(clearNotifications());
    // };
  }, [dispatch]);

  useFocusEffect(
    useCallback(() => {
      dispatch(resetNewNotificationCount());
    }, [dispatch])
  );

  const notifications = useSelector(selectAllNotifications);
  // console.log("Notifications:", notifications);

  // const fetchPostsStatus = useSelector(
  //   (state) => state.userProfile.fetchProfileStatus
  // );

  // const fetchProfileError = useSelector(
  //   (state) => state.userProfile.fetchProfileError
  // );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      console.log("Refreshing Notifications...");
      await dispatch(fetchNotifications()).unwrap(); // Fetch posts and wait for completion
      console.log("Notifications refreshed successfully");
    } catch (error) {
      console.error("Error refreshing Notifications:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderItem = ({ item }) => {
    if (notifications.length === 0) {
      return <View>Loading...</View>;
    } else {
      return (
        <NotificationExcerpt
          key={`notification-${item.id}`}
          notificationId={item.id}
        />
      );
    }
  };
  return (
    <View className="bg-white flex-1">
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 1,
              backgroundColor: "#E5E7EB",
            }}
          />
        )}
        refreshing={refreshing} // Pass refreshing state
        onRefresh={onRefresh}
      />
    </View>
  );
};

export default Notifications;
