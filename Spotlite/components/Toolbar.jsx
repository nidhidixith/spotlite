import React, { useState } from "react";

import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

import { router } from "expo-router";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import AppName from "./AppName";

const Toolbar = () => {
  const [active, setactive] = useState(false);
  return (
    <View className="bg-white flex flex-row items-center justify-between px-2 py-3 mb-2">
      <AppName />
      <View className="flex flex-row justify-between items-center relative">
        <TouchableOpacity
          className="px-3"
          onPress={() => {
            setactive(!active);
          }}
        >
          <FontAwesome name="plus-square" size={22} color="#333333" />
        </TouchableOpacity>

        <TouchableOpacity
          className="px-3"
          onPress={() => router.push("(app)/(menu)/menu")}
        >
          <FontAwesome name="bars" size={22} color="#333333" />
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
              <FontAwesome
                name="edit"
                size={20}
                color="#333333"
                marginRight={12}
              />
              <Text className="text-base">Post</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                router.push("(app)/(create)/create-event");
                setactive(!active);
              }}
              className="flex flex-row px-4 py-2 items-center"
            >
              <FontAwesome
                name="calendar"
                size={20}
                color="#333333"
                marginRight={12}
              />

              <Text className="text-base">Event</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="border-t-2 border-gray-200 flex flex-row px-4 py-2 items-center self-center"
              onPress={() => {
                setactive(!active);
              }}
            >
              <AntDesign
                name="close"
                size={14}
                marginRight={12}
                color="#ef4444"
              />

              <Text className=" text-sm text-red-500">Close</Text>
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
    top: 50,
    right: 40,
    backgroundColor: "white",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
});
