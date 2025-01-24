import * as Notifications from "expo-notifications";
import { addNotification } from "../slices/notificationsSlice";
import { router } from "expo-router";

let notificationListener;
let responseListener;

export const setupNotifications = (dispatch) => {
  if (!notificationListener && !responseListener) {
    // Listener for notifications received while the app is open
    // console.log("Setting up notifications...");

    notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        // console.log("I am listening...");
        const data = notification?.request?.content?.data;
        if (data) {
          dispatch(addNotification());
        }
        // if (data) {
        //   dispatch(addNotification(data));
        // }
      }
    );

    // Listener for when a user interacts with a notification
    responseListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        router.navigate("/(app)/(tabs)/notifications");
      }
    );
  }

  // Return cleanup function
  return () => {
    // console.log("Cleaning up notifications...");

    if (notificationListener) {
      Notifications.removeNotificationSubscription(notificationListener);
      notificationListener = null;
      // console.log("Cleaned up notifications 1...");
    }
    if (responseListener) {
      Notifications.removeNotificationSubscription(responseListener);
      responseListener = null;
      // console.log("Cleaned up notifications 2...");
    }
  };
};
