import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useEffect, useCallback, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import {
  clearNotifications,
  fetchNotifications,
  resetNewNotificationCount,
  selectAllNotifications,
} from "../../../slices/notificationsSlice";

import NotificationExcerpt from "../../../components/Notifications/NotificationExcerpt";
import EmptyState from "../../../components/Others/EmptyState";
import ErrorDisplayComponent from "../../../components/Others/ErrorDisplayComponent";
import LoadingIndicator from "../../../components/Others/LoadingIndicator";

const Notifications = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing
  const [loadingMore, setLoadingMore] = useState(false);
  const newNotificationsAvailable = useSelector(
    (state) => state.notification.newNotificationsAvailable
  );

  // console.log("New Notification available: ", newNotificationsAvailable);

  const fetchData = async () => {
    setLoading(true); // Start loading
    console.log("Calling useEffect again...");
    try {
      dispatch(clearNotifications());
      await dispatch(fetchNotifications({ page: 1 })).unwrap(); // Fetch data and unwrap the result
    } catch (error) {
      console.error("Failed to fetch posts:", error); // Handle error
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, newNotificationsAvailable]);

  useFocusEffect(
    useCallback(() => {
      dispatch(resetNewNotificationCount());
    }, [dispatch])
  );

  const notifications = useSelector(selectAllNotifications);
  const fetchNotificationsError = useSelector(
    (state) => state.notification.notifications.error
  );
  const nextPage = useSelector(
    (state) => state.notification.notifications.nextPage
  );

  const handleLoadMore = async () => {
    if (nextPage && !loadingMore) {
      setLoadingMore(true);
      const nextPageNumber = new URL(nextPage).searchParams.get("page");
      try {
        await dispatch(fetchNotifications({ page: nextPageNumber })).unwrap();
      } catch (error) {
        console.error("Error loading more notifications:", error);
      } finally {
        setLoadingMore(false);
      }
    }
  };

  const handleRetry = async () => {
    fetchData(); // Re-fetch posts on retry
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (fetchNotificationsError) {
    return <ErrorDisplayComponent onRetry={handleRetry} />;
  }

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      dispatch(clearNotifications());
      await dispatch(fetchNotifications({ page: 1 })).unwrap();
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
        ListEmptyComponent={<EmptyState message="No notifications yet!" />}
        contentContainerStyle={
          notifications.length === 0 ? { flex: 1 } : {} // Ensures centering when the list is empty
        }
        onEndReached={handleLoadMore} // Trigger loading more posts
        onEndReachedThreshold={0.5} // Load more when the list is 50% from the bottom
        ListFooterComponent={
          loadingMore ? (
            <View className="justify-center items-center bg-white">
              <ActivityIndicator size="large" color="#0284c7" />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Notifications;
