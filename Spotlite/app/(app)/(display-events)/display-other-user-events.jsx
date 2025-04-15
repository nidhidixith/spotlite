import React from "react";
import OtherUserEventsList from "../../../components/Events/OtherUserEventsList";
import { useLocalSearchParams } from "expo-router";

const DisplayOtherUserEvents = () => {
  let { userId } = useLocalSearchParams();
  userId = Number(userId);

  return <OtherUserEventsList userId={userId} />;
};

export default DisplayOtherUserEvents;
