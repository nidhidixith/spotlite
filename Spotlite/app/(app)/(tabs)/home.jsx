import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import registerForPushNotificationsAsync from "../../../utilities/registerForPushNotification";
import {
  fetchUndeliveredNotificationCount,
  savePushToken,
} from "../../../slices/notificationsSlice";

import { setupNotifications } from "../../../utilities/notificationListeners";
import Toolbar from "../../../components/Toolbar";
import PostsList from "../../../components/Posts/PostsList";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const pushToken = await registerForPushNotificationsAsync();
      if (pushToken) {
        console.log("Push Token:", pushToken);
        dispatch(savePushToken({ pushToken }));
      }
      dispatch(fetchUndeliveredNotificationCount());
    })();

    const cleanup = setupNotifications(dispatch);

    return cleanup; // Clean up listeners on unmount
  }, [dispatch]);

  return (
    <SafeAreaView className="flex-1 bg-background-light">
      <Toolbar />
      <PostsList />
    </SafeAreaView>
  );
};

export default Home;
