import React, { useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
} from "react-native";

import { router } from "expo-router";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import AppName from "./AppName";

const Toolbar = () => {
  const [active, setactive] = useState(false);
  return (
    <View className="bg-white flex flex-row items-center justify-between px-2 py-3 mb-2">
      <AppName />
      <View className="flex flex-row justify-between items-center relative">
        {/* <TouchableOpacity
          className="px-3"
          // onPress={() => router.push("/success")}
        >
          <FontAwesome name="search" size={22} color="black" />
        </TouchableOpacity> */}

        <TouchableOpacity
          className="px-3"
          onPress={() => {
            setactive(!active);
          }}
        >
          <FontAwesome name="plus-square" size={22} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          className="px-3"
          onPress={() => router.push("(app)/(menu)/menu")}
        >
          <FontAwesome name="bars" size={22} color="black" />
        </TouchableOpacity>
      </View>

      <Modal
        // animationType="slide"
        transparent={true}
        visible={active}
        // onRequestClose={() => {
        //   console.warn("closed");
        // }}
      >
        <View style={styles.container}>
          <View style={styles.content}>
            <TouchableOpacity
              onPress={() => {
                router.push("(app)/(create)/create-post");
                setactive(!active);
              }}
              className="flex flex-row px-4 py-2 items-center"
            >
              <MaterialIcons name="post-add" marginRight={10} size={26} />
              <Text className="flex-1 text-lg">Post</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("(app)/(create)/create-event");
                setactive(!active);
              }}
              className="flex flex-row px-4 py-2 items-center"
            >
              <MaterialIcons name="event" marginRight={10} size={24} />
              <Text className="text-lg">Event</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="border-t-2 border-gray-200 flex flex-row px-4 py-2 items-center"
              onPress={() => {
                setactive(!active);
              }}
            >
              <AntDesign name="close" size={16} marginRight={10} color="red" />
              <Text className="self-center  text-red-500">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    position: "absolute",
    top: 50, // Position below the toolbar
    right: 40, // Adjust as necessary
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "black",
  },
});
