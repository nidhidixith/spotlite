import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../slices/authSlice";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import Toolbar from "../../../components/Toolbar";
import PostExcerpt from "../../../components/Posts/PostExcerpt";
import PostsList from "../../../components/Posts/PostsList";
import registerForPushNotificationsAsync from "../../../utilities/registerForPushNotification";
import {
  addNotification,
  savePushToken,
  selectNotificationCount,
} from "../../../slices/notificationsSlice";
import * as Notifications from "expo-notifications";
import { setupNotifications } from "../../../utilities/notificationListeners";

const Home = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.users.ids[0]);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    (async () => {
      const pushToken = await registerForPushNotificationsAsync();
      if (pushToken) {
        console.log("Push Token:", pushToken);
        dispatch(savePushToken({ pushToken }));
      }
    })();
    const cleanup = setupNotifications(dispatch);

    return cleanup; // Clean up listeners on unmount
  }, [dispatch]);

  return (
    <SafeAreaView className="flex-1 bg-background-light">
      <Toolbar />
      {/* <PostExcerpt /> */}
      <PostsList />
    </SafeAreaView>
  );
};

export default Home;
