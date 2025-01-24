import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { Tabs, Redirect } from "expo-router";

import FontAwesome from "@expo/vector-icons/FontAwesome";

const TabIcon = ({ color, name, focused, title, size, badgeCount }) => {
  return (
    <View className="flex items-center justify-center">
      <FontAwesome name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View className="absolute -top-2 -right-2 bg-red-500 rounded-full px-1 flex items-center justify-center">
          <Text className="text-white text-[10px] font-bold">{badgeCount}</Text>
        </View>
      )}
      {/* <Text
        className={`${focused ? "font-bold" : "font-regular"} text-xs`}
        style={{ color: color }}
      >
        {title}
      </Text> */}
    </View>
  );
};

const TabLayout = () => {
  const newNotificationCount = useSelector(
    (state) => state.notification.newNotificationCount
  );

  console.log("Count from tab:", newNotificationCount);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0284c7",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          // backgroundColor: "#e5e7eb",
          // borderTopWidth: 1,
          // borderTopColor: "#232533",
          height: 50,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          // title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              name="home"
              focused={focused}
              title="Home"
              size={26}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          // title: "Events",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              name="calendar"
              focused={focused}
              title="Events"
              size={20}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          // title: "Search",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              name="search"
              focused={focused}
              title="Search"
              size={22}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          // title: "Notifications",
          // headerTitleAlign: "center",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              name="bell"
              focused={focused}
              title="Notifications"
              size={22}
              badgeCount={newNotificationCount}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="userprofile"
        options={{
          // title: "My Profile",
          // headerTitleAlign: "center",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              color={color}
              name="user-circle-o"
              focused={focused}
              title="Profile"
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
