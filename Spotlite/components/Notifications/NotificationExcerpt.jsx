import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import {
  markAsRead,
  selectNotificationById,
} from "../../slices/notificationsSlice";

import { fetchUserEvents } from "../../slices/eventsSlice";
import { fetchOtherUserProfile } from "../../slices/userProfileSlice";

import { TimeAgo } from "../TimeAgo";

const NotificationExcerpt = React.memo(({ notificationId }) => {
  const dispatch = useDispatch();

  const notification = useSelector((state) =>
    selectNotificationById(state, notificationId)
  );

  // console.log("Notification from excerpt: ", notification);
  const uniqueKey = `notification-${notification?.id}`;

  const [isRead, setisRead] = useState(notification?.is_read);

  const bgColor = isRead ? "bg-white" : "bg-gray-100";

  const handleNotificationClick = () => {
    if (notification?.type === "like" || notification?.type === "comment") {
      // dispatch(fetchSpecificPost({ postId: notification?.post }));
      setisRead(true);
      if (!notification?.is_read) {
        dispatch(markAsRead({ notificationId: notification.id }));
      }

      router.push({
        pathname: "(app)/post/[id]",
        params: {
          postId: notification?.post,
        },
      });
    } else if (notification?.type === "interested") {
      dispatch(fetchUserEvents());
      setisRead(true);
      if (!notification?.is_read) {
        dispatch(markAsRead({ notificationId: notification.id }));
      }
      router.push({
        pathname: "(app)/event/[id]",
        params: {
          eventId: notification?.event,
        },
      });
    } else if (notification?.type === "follow") {
      console.log("Follow type notification");
      dispatch(fetchOtherUserProfile(notification.follower_id));
      setisRead(true);
      if (!notification?.is_read) {
        dispatch(markAsRead({ notificationId: notification.id }));
      }
      router.push({
        pathname: "(app)/display-profile/[userId]",
        params: {
          userId: notification?.follower_id,
        },
      });
    } else {
      console.log("Post ID/ Event ID not available in notification");
    }
  };

  return (
    <View className={`px-4 py-2 ${bgColor}`}>
      <TouchableOpacity
        className="flex flex-row items-center"
        activeOpacity={0.6}
        onPress={handleNotificationClick}
      >
        <Image
          source={{ uri: notification?.sender_profile_pic }}
          className="w-[40px] h-[40px] rounded-full mr-3"
          resizeMode="cover"
        />
        <View className="flex-1">
          <Text className="text-sm text-gray-800">
            <Text className="font-medium">{notification?.sender_name} </Text>
            {notification?.message}.{" "}
            <Text className="text-xs italic text-gray-500">
              <TimeAgo timestamp={notification?.created_at} />
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
});
export default NotificationExcerpt;
