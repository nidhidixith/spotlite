import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
// import { router } from "expo-router";

import { resetUserProfile } from "../slices/userProfileSlice";
import { logoutUser } from "../slices/authSlice";
import { resetPosts } from "../slices/postsSlice";
import { resetEvents } from "../slices/eventsSlice";
import {
  resetNewNotificationCount,
  resetNotifications,
  unregisterPushToken,
} from "../slices/notificationsSlice";
import { resetUserConnections } from "../slices/userConnectionsSlice";
import { setupNotifications } from "./notificationListeners";
import { clearSearches } from "../slices/searchSlice";

export const handleLogout = async (dispatch, router) => {
  // const dispatch = useDispatch();

  try {
    const refreshToken = await SecureStore.getItemAsync("refresh_token");
    const pushToken = await SecureStore.getItemAsync("push_token");

    if (pushToken) {
      await dispatch(unregisterPushToken({ pushToken })).unwrap();
      console.log("Push token unregistered successfully.");
    } else {
      console.warn("Push token not available. Skipping unregister.");
    }

    if (refreshToken) {
      await dispatch(logoutUser(refreshToken)).unwrap();

      Alert.alert("You are logged out!");
    } else {
      Alert.alert("Error during Logout");
      console.log("Refresh token is not available");
      console.error("Refresh token is not available");
    }
  } catch (error) {
    console.error("Error during logout:", error);
    Alert.alert("Error during logout!");
  } finally {
    const cleanup = setupNotifications(dispatch); // Get cleanup function
    cleanup(); // Call cleanup to remove listeners

    await Promise.all([
      dispatch(resetUserProfile()),
      dispatch(resetUserConnections()),
      dispatch(resetPosts()),
      dispatch(resetEvents()),
      dispatch(resetNotifications()),
      dispatch(clearSearches()),
      // dispatch(resetNewNotificationCount()),
    ]);

    await SecureStore.deleteItemAsync("push_token");
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");

    router.replace("/(auth)/login");
  }
};
