import * as Notifications from "expo-notifications";
import { addNotification } from "../slices/notificationsSlice";
import { router } from "expo-router";

let notificationListener;
let responseListener;

export const setupNotifications = (dispatch) => {
  if (!notificationListener && !responseListener) {
    // Listener for notifications received while the app is open
    notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received globally:", notification);
        const data = notification?.request?.content?.data;
        if (data) {
          console.log("Adding notification to slice");
          dispatch(addNotification(data));
        }
      }
    );

    // Listener for when a user interacts with a notification
    responseListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        router.navigate("/(app)/(tabs)/notifications");
        console.log("Notification response received globally:", response);
      }
    );
  }

  // Return cleanup function
  return () => {
    if (notificationListener) {
      Notifications.removeNotificationSubscription(notificationListener);
      notificationListener = null;
    }
    if (responseListener) {
      Notifications.removeNotificationSubscription(responseListener);
      responseListener = null;
    }
  };
};
