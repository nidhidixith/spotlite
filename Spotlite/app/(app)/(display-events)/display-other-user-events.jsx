import { View, Text } from "react-native";
import React from "react";
import OtherUserEventsList from "../../../components/Events/OtherUserEventsList";
import { useLocalSearchParams } from "expo-router";

const DisplayOtherUserEvents = () => {
  let { userId } = useLocalSearchParams();
  userId = Number(userId);
  console.log("UserId:", userId);

  return <OtherUserEventsList userId={userId} />;
};

export default DisplayOtherUserEvents;
