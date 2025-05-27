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
import { getUserLocation } from "../../../utilities/location";

const Events = () => {
  const [activeTab, setActiveTab] = useState("for-you");
  const [userLocation, setUserLocation] = useState(null);
  console.log("Active tab: ", activeTab);
  console.log("User location from events is: ", userLocation);
  return (
    <SafeAreaView className="flex-1">
      <Toolbar />
      <View className="bg-white flex flex-row px-4 py-3">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <TouchableOpacity
            className={`py-1 px-3 mr-4 rounded-2xl bg-gray-200 ${
              activeTab === "for-you" && "bg-sky-600"
            }`}
            onPress={() => setActiveTab("for-you")}
          >
            <Text
              className={`font-semibold text-sm ${
                activeTab === "for-you" && "text-white"
              }`}
            >
              For you
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`py-1 px-3 mr-4 rounded-2xl bg-gray-200 ${
              activeTab === "nearby" && "bg-sky-600"
            }`}
            // onPress={() => setActiveTab("nearby")}
            onPress={async () => {
              const coords = await getUserLocation();
              if (!coords) return;

              setUserLocation(coords);
              setActiveTab("nearby");
            }}
          >
            <Text
              className={`font-semibold text-sm ${
                activeTab === "nearby" && "text-white"
              }`}
            >
              Nearby
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`py-1 px-3 mr-4 rounded-2xl bg-gray-200 ${
              activeTab === "upcoming" && "bg-sky-600"
            }`}
            onPress={() => setActiveTab("upcoming")}
          >
            <Text
              className={`font-semibold text-sm ${
                activeTab === "upcoming" && "text-white"
              }`}
            >
              Upcoming
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`py-1 px-3 mr-4 rounded-2xl bg-gray-200 ${
              activeTab === "by-followers" && "bg-sky-600"
            }`}
            onPress={() => setActiveTab("by-followers")}
          >
            <Text
              className={`font-semibold text-sm ${
                activeTab === "by-followers" && "text-white"
              }`}
            >
              By followers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`py-1 px-3 mr-4 rounded-2xl bg-gray-200 ${
              activeTab === "by-following" && "bg-sky-600"
            }`}
            onPress={() => setActiveTab("by-following")}
          >
            <Text
              className={`font-semibold text-sm ${
                activeTab === "by-following" && "text-white"
              }`}
            >
              By following
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/* <EventsList filter={activeTab} /> */}
      {/* <EventsList filter={activeTab} userLocation={userLocation} /> */}
      <EventsList
        filter={activeTab}
        userLocation={activeTab === "nearby" ? userLocation : null}
      />
    </SafeAreaView>
  );
};

export default Events;
