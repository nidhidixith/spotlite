import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";

import { handleLogout } from "../../utilities/handleLogout";
import { handleDeleteUser } from "../../utilities/handleDeleteUser";

const DeleteAccountPage = () => {
  const dispatch = useDispatch();

  const deleteUserStatus = useSelector((state) => state.users.deleteUserStatus);

  const deleteUserError = useSelector((state) => state.users.deleteUserError);

  if (deleteUserStatus === "loading") {
    // Show Activity Indicator while loading
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0284c7" />
      </View>
    );
  }

  const handleDeleteAccount = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you absolutely sure? This action is irreversible, and all your data will be permanently deleted.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Delete My Account",
          onPress: () => performAccountDeletion(),
        },
      ]
    );
  };

  const performAccountDeletion = async () => {
    try {
      // Await the deletion process
      const success = await handleDeleteUser(dispatch, router);

      if (success) {
        // If deletion is successful, show success message
        Alert.alert(
          "Account Deleted",
          "Your account has been permanently deleted."
        );
      }
    } catch (error) {
      // If an error occurs, show failure alert
      console.error("Error deleting account:", error);
      Alert.alert(
        "Deletion Failed",
        "There was an error while deleting your account. Please try again."
      );
    }
  };

  return (
    <View className="flex-1 p-4 bg-gray-50">
      <Text className="font-bold text-2xl text-center mb-1 text-gray-800">
        We're sad to see you go...
      </Text>
      <Text className="text-base text-center text-gray-700 mb-4">
        Are you sure you want to delete your Spotlite account?
      </Text>

      <View className="mb-6">
        <Text className="text-lg font-bold mb-2 text-gray-800">
          Why not just take a break?
        </Text>
        <Text className="text-sm text-gray-700 mb-4">
          Sometimes, all we need is a little time off. Instead of deleting your
          account, why not log out for a while? Your account will be here
          waiting for you when you're ready to return.
        </Text>
        <TouchableOpacity
          className="border border-sky-600  p-2 rounded-lg items-center"
          onPress={() => handleLogout(dispatch, router)}
        >
          <Text className="text-sky-600 font-semibold">Log Out Instead</Text>
        </TouchableOpacity>
      </View>

      <View className="mb-4">
        <Text className="text-lg font-bold mb-2 text-gray-800">
          Here's what you'll miss
        </Text>
        <Text className="text-sm text-gray-700 mb-1">
          Your Spotlite network: Connections with creators and followers.
        </Text>
        <Text className="text-sm text-gray-700 mb-1">
          Your content: All your posts, events, and comments will be permanently
          deleted.
        </Text>
        <Text className="text-sm text-gray-700 mb-1">
          Your profile: A unique reflection of your identity and achievements,
          which will be permanently lost.
        </Text>
        <Text className="text-sm text-gray-700 mb-1">
          Notifications: Stay updated on trending posts and events.
        </Text>
      </View>

      <TouchableOpacity
        className="border border-red-500 p-2 rounded-lg items-center mb-3"
        onPress={handleDeleteAccount}
      >
        <Text className="font-medium text-red-500">Delete My Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-sky-600 p-2 items-center rounded-lg"
        onPress={() => router.push("(app)/(tabs)/home")}
      >
        <Text className="text-white font-medium">Keep My Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeleteAccountPage;
