import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;

  console.log("1");
  if (Platform.OS === "android") {
    console.log("2");
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
    console.log("3");
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  console.log("4");
  console.log("Existing Status", existingStatus);
  let finalStatus = existingStatus;
  console.log("Final Status", finalStatus);

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
    console.log("5");
  }

  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }

  console.log("5");

  // token = (await Notifications.getExpoPushTokenAsync()).data;
  try {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", token);
    return token;
  } catch (error) {
    console.error("Error fetching Expo Push Token:", error);
  }
  console.log("Token:", token);

  return token;
}

export default registerForPushNotificationsAsync;
