import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import React from "react";

import { handleLogout } from "../../../utilities/handleLogout";
import {
  resetUserProfile,
  selectUserProfile,
} from "../../../slices/userProfileSlice";
import { logoutUser } from "../../../slices/authSlice";
import { resetPosts } from "../../../slices/postsSlice";
import { resetEvents } from "../../../slices/eventsSlice";
import {
  resetNewNotificationCount,
  resetNotifications,
} from "../../../slices/notificationsSlice";
import { resetUserConnections } from "../../../slices/userConnectionsSlice";

import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Menu = () => {
  const dispatch = useDispatch();

  // const handleLogout = async () => {
  //   try {
  //     const refreshToken = await SecureStore.getItemAsync("refresh_token");
  //     if (refreshToken) {
  //       await dispatch(logoutUser(refreshToken)).unwrap();

  //       Alert.alert("You are logged out!");
  //     } else {
  //       Alert.alert("Error during Logout");
  //       console.log("Refresh token is not available");
  //       console.error("Refresh token is not available");
  //     }
  //   } catch (error) {
  //     console.error("Error during logout:", error);
  //     Alert.alert("Error during logout!");
  //   } finally {
  //     await Promise.all([
  //       dispatch(resetUserProfile()),
  //       dispatch(resetUserConnections()),
  //       dispatch(resetPosts()),
  //       dispatch(resetEvents()),
  //       dispatch(resetNotifications()),
  //       dispatch(resetNewNotificationCount()),
  //     ]);

  //     SecureStore.deleteItemAsync("access_token");
  //     SecureStore.deleteItemAsync("refresh_token");
  //     router.replace("/(auth)/login");
  //   }
  // };

  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-1">
        <TouchableOpacity
          className="flex flex-row px-2 py-4 items-center"
          onPress={() =>
            router.push("(app)/(display-events)/display-user-events")
          }
        >
          <FontAwesome
            name="calendar"
            size={18}
            color="#F59E0B"
            marginRight={16}
          />
          <Text className="font-rregular text-[16px]">My Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex flex-row  px-2 py-4 items-center"
          onPress={() => router.push("(app)/(menu)/settings")}
        >
          <Ionicons
            name="settings"
            size={20}
            color="#607D8B"
            marginRight={10}
          />
          <Text className="font-rregular text-[16px]">
            Settings and Privacy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex flex-row  px-2 py-4 items-center"
          onPress={() => router.push("(app)/(menu)/about")}
        >
          <Entypo
            name="info-with-circle"
            size={18}
            color="black"
            marginRight={10}
          />
          <Text className="font-rregular text-[16px]">About us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex flex-row px-2 py-4 items-center"
          onPress={() => router.push("(app)/(menu)/faqs")}
        >
          <Entypo name="help" size={20} color="#FF6F61" marginRight={12} />
          <Text className="font-rregular text-[16px]">FAQs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-gray-200  mt-6 py-2 rounded-sm self-center w-full"
          onPress={() => handleLogout(dispatch, router)}
        >
          <Text className="font-rregular text-base font-bold self-center">
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Menu;
