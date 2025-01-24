import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Toolbar from "../../../components/Toolbar";
import EventsList from "../../../components/Events/EventsList";

const Events = () => {
  const [activeTab, setActiveTab] = useState("for-you");
  return (
    <SafeAreaView className="flex-1 bg-background-light">
      <Toolbar />
      <View className="bg-white flex flex-row px-4 pt-2 pb-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <TouchableOpacity
            className={`py-1 px-2 mr-4 rounded-2xl bg-gray-200 ${
              activeTab === "for-you" && "bg-sky-100"
            }`}
            onPress={() => setActiveTab("for-you")}
          >
            <Text
              className={`font-rregular font-bold text-[14px] ${
                activeTab === "for-you" && "text-sky-600"
              }`}
            >
              For you
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`py-1 px-2 mr-4 rounded-2xl bg-gray-200 ${
              activeTab === "nearby" && "bg-sky-100"
            }`}
            onPress={() => setActiveTab("nearby")}
          >
            <Text
              className={`font-rregular font-bold text-[14px] ${
                activeTab === "nearby" && "text-sky-600"
              }`}
            >
              Nearby
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`py-1 px-2 mr-4 rounded-2xl bg-gray-200 ${
              activeTab === "upcoming" && "bg-sky-100"
            }`}
            onPress={() => setActiveTab("upcoming")}
          >
            <Text
              className={`font-rregular font-bold text-[14px] ${
                activeTab === "upcoming" && "text-sky-600"
              }`}
            >
              Upcoming
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`py-1 px-2 mr-4 rounded-2xl bg-gray-200 ${
              activeTab === "by-followers" && "bg-sky-100"
            }`}
            onPress={() => setActiveTab("by-followers")}
          >
            <Text
              className={`font-rregular font-bold text-[14px] ${
                activeTab === "by-followers" && "text-sky-600"
              }`}
            >
              By followers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`py-1 px-2 mr-4 rounded-2xl bg-gray-200 ${
              activeTab === "by-following" && "bg-sky-100"
            }`}
            onPress={() => setActiveTab("by-following")}
          >
            <Text
              className={`font-rregular font-bold text-[14px] ${
                activeTab === "by-following" && "text-sky-600"
              }`}
            >
              By following
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <EventsList filter={activeTab} />
    </SafeAreaView>
  );
};

export default Events;
