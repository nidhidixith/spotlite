import { Alert } from "react-native";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";
// import { router } from "expo-router";

import { resetUserProfile } from "../slices/userProfileSlice";
import { deleteUser } from "../slices/authSlice";
import { resetPosts } from "../slices/postsSlice";
import { resetEvents } from "../slices/eventsSlice";
import {
  resetNewNotificationCount,
  resetNotifications,
} from "../slices/notificationsSlice";
import { resetUserConnections } from "../slices/userConnectionsSlice";
import { clearSearches } from "../slices/searchSlice";

export const handleDeleteUser = async (dispatch, router) => {
  try {
    const refreshToken = await SecureStore.getItemAsync("refresh_token");
    console.log("Retrieved refreshToken: ", refreshToken);

    if (refreshToken) {
      await dispatch(deleteUser(refreshToken)).unwrap();
      console.log("User deleted successfully!");
      return true; // Return success
    } else {
      throw new Error("Refresh token is not available"); // Throw error if no refresh token
    }
  } catch (error) {
    console.error("Error during user deletion:", error);
    throw error; // Re-throw error to be caught by the calling function
  } finally {
    // Cleanup
    await Promise.all([
      dispatch(resetUserProfile()),
      dispatch(resetUserConnections()),
      dispatch(resetPosts()),
      dispatch(resetEvents()),
      dispatch(resetNotifications()),
      dispatch(resetNewNotificationCount()),
      dispatch(clearSearches()),
    ]);

    // Remove tokens
    SecureStore.deleteItemAsync("access_token");
    SecureStore.deleteItemAsync("refresh_token");
    router.push("/(auth)/signup");
  }
};
