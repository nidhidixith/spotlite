import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import DeleteAccountPage from "../../../components/Others/DeleteAccountPage";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Settings = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleItem = () => {
    setExpanded(!expanded);
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <TouchableOpacity
        className="flex flex-row items-center px-4 py-2 mt-2"
        onPress={toggleItem}
      >
        <MaterialIcons
          name="person-remove"
          size={20}
          color="black"
          marginRight={10}
        />
        <Text className="text-[16px]">Delete my Account</Text>
      </TouchableOpacity>
      {expanded && <DeleteAccountPage />}
    </ScrollView>
  );
};

export default Settings;
