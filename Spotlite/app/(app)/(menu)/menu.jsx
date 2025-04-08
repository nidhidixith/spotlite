import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import React from "react";
import * as Linking from "expo-linking";

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
import { useToast } from "../../../contexts/ToastContext";
import { MaterialIcons } from "@expo/vector-icons";

const Menu = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

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
          className="flex flex-row px-2 py-4 items-center border-gray-100"
          onPress={() =>
            router.push("(app)/(display-events)/display-user-events")
          }
        >
          {/* <FontAwesome
            name="calendar"
            size={18}
            color="#F59E0B"
            marginRight={16}
          /> */}
          {/* <Ionicons
            name="calendar"
            size={20}
            color="#333333"
            marginRight={16}
          /> */}
          <FontAwesome
            name="calendar"
            size={20}
            color="#4b5563"
            marginRight={14}
          />
          <Text className="text-gray-800 text-base font-medium">My Events</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex flex-row px-2 py-4 items-center"
          onPress={() =>
            router.push("(app)/(display-events)/display-interested-events")
          }
        >
          {/* <FontAwesome
            name="calendar"
            size={18}
            color="#F59E0B"
            marginRight={16}
          /> */}
          {/* <Ionicons
            name="calendar"
            size={20}
            color="#333333"
            marginRight={16}
          /> */}
          <FontAwesome name="star" size={20} color="#4b5563" marginRight={14} />
          <Text className="text-gray-800 text-base font-medium">
            Interested Events
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex flex-row  px-2 py-4 items-center"
          onPress={() => router.push("(app)/(menu)/settings")}
        >
          {/* <Ionicons
            name="settings"
            size={20}
            color="#607D8B"
            marginRight={10}
          /> */}
          {/* <Ionicons
            name="settings"
            size={20}
            color="#333333"
            marginRight={16}
          /> */}
          <FontAwesome name="gear" size={20} color="#4b5563" marginRight={14} />
          <Text className="text-gray-800 text-base font-medium">
            Settings and Privacy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex flex-row  px-2 py-4 items-center"
          onPress={() => Linking.openURL("http://192.168.1.33:3000/about")}
        >
          {/* <Entypo
            name="info-with-circle"
            size={18}
            color="black"
            marginRight={10}
          /> */}
          {/* <Ionicons
            name="information-circle"
            size={20}
            color="#333333"
            marginRight={16}
          /> */}
          <FontAwesome
            name="info-circle"
            size={20}
            color="#4b5563"
            marginRight={14}
          />
          <Text className="text-gray-800 text-base font-medium">About us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex flex-row px-2 py-4 items-center"
          onPress={() => Linking.openURL("http://192.168.1.33:3000/faqs")}
        >
          {/* <Entypo name="help" size={20} color="#FF6F61" marginRight={12} /> */}
          {/* <Ionicons
            name="help-circle"
            size={20}
            color="#333333"
            marginRight={16}
          /> */}
          <FontAwesome
            name="question-circle"
            size={20}
            color="#4b5563"
            marginRight={14}
          />
          <Text className="text-gray-800 text-base font-medium">FAQs</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // className="bg-gray-200  mt-6 py-2 rounded-sm self-center w-full"
          className=" bg-gray-200 rounded-sm px-1 py-2 mt-6"
          onPress={() => handleLogout(dispatch, router)}
        >
          <Text className="text-base self-center font-bold">Logout</Text>
        </TouchableOpacity>

        <View className="mt-10 bg-gray-50 mb-10">
          <Button
            title="Show Error Toast"
            onPress={() =>
              showToast("There was an error creating post!", "error")
            }
          />
        </View>

        {/*
        <View
          style={{
            borderLeftColor: "green",
            borderRightColor: "#e5e7eb",
            borderTopColor: "#e5e7eb",
            borderBottomColor: "#e5e7eb",
            borderWidth: 1,
            borderLeftWidth: 5,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 5,

            // alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View className="flex flex-row">
            <MaterialIcons
              name="check-circle"
              size={18}
              color="green"
              marginRight={8}
              marginTop={2}
            />

            <View className="">
              <Text className="text-sm font-semibold text-gray-800">
                Success
              </Text>
              <Text className="text-xs text-gray-500">Post Created</Text>
            </View>

            <View className="self-center ml-auto">
              <MaterialIcons name="close" size={18} color="gray" />
            </View>
          </View>
        </View> */}
      </View>
    </View>
  );
};

export default Menu;
