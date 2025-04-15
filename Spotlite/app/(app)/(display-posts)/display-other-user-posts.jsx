import React from "react";
import OtherUserPostsList from "../../../components/Posts/OtherUserPostsList";
import { useLocalSearchParams } from "expo-router";

const DisplayOtherUserPosts = () => {
  let { userId } = useLocalSearchParams();
  userId = Number(userId);

  return <OtherUserPostsList userId={userId} />;
};

export default DisplayOtherUserPosts;
