import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as Linking from "expo-linking";
import { router } from "expo-router";

const Settings = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className="flex-1 bg-white p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableOpacity
          className="flex flex-row items-center px-4 py-3 mt-2 bg-gray-100 rounded-xl shadow-md"
          onPress={() => router.push("(app)/(edit-profile)/edit-profile")}
        >
          <MaterialIcons
            name="edit"
            size={20}
            color="#4b5563"
            marginRight={14}
          />
          <Text className="text-base font-medium">Edit profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row items-center px-4 py-3 mt-4 bg-gray-100 rounded-xl shadow-md"
          onPress={() => Linking.openURL("http://192.168.1.33:3000/terms")}
        >
          <MaterialIcons
            name="description"
            size={20}
            color="#4b5563"
            marginRight={14}
          />
          <Text className="text-base font-medium">Terms of Service</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row items-center px-4 py-3 mt-4 bg-gray-100 rounded-xl shadow-md"
          onPress={() => Linking.openURL("http://192.168.1.33:3000/privacy")}
        >
          <MaterialIcons
            name="privacy-tip"
            size={20}
            color="#4b5563"
            marginRight={14}
          />
          <Text className="text-base font-medium">Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-row items-center px-4 py-3 mt-4 bg-gray-100 rounded-xl shadow-md"
          // onPress={toggleItem}
          onPress={() => router.push("(app)/(delete)/delete-account")}
        >
          <MaterialIcons
            name="delete-forever"
            size={20}
            color="#4b5563"
            marginRight={14}
          />
          <Text className="text-base font-medium">Delete my Account</Text>
        </TouchableOpacity>

        <View className="mt-6 mb-10">
          <Text className="text-center text-xs text-gray-400">
            App Version: v1.0.0
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Settings;
