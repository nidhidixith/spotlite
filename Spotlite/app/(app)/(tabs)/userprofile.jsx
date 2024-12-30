import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BasicDetails from "../../../components/UserProfile/BasicDetails";
import Activity from "../../../components/UserProfile/Activity";
import SocialLinks from "../../../components/UserProfile/SocialLinks";
import Interests from "../../../components/UserProfile/Interests";
import UserInfo from "../../../components/UserProfile/UserInfo";
import Bio from "../../../components/UserProfile/Bio";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchUserProfile,
  clearUserProfile,
  selectUserProfile,
} from "../../../slices/userProfileSlice";
import { fetchUserPosts } from "../../../slices/postsSlice";
import { fetchUserEvents } from "../../../slices/eventsSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing

  useEffect(() => {
    dispatch(fetchUserProfile());

    // return () => {
    //   dispatch(clearUserProfile());
    // };
  }, [dispatch]);

  const profile = useSelector(selectUserProfile);
  console.log("User profile:", profile);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      console.log("Refreshing profile...");
      await Promise.all([
        dispatch(fetchUserProfile()).unwrap(),
        dispatch(fetchUserPosts()).unwrap(),
        dispatch(fetchUserEvents()).unwrap(),
      ]);
      console.log("Profile refreshed successfully");
    } catch (error) {
      console.error("Error refreshing profile:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <BasicDetails profile={profile[0]} />
      <Bio profile={profile[0]} />
      <SocialLinks profile={profile[0]} />
      <Activity profile={profile[0]} />
      <Interests profile={profile[0]} />
      <UserInfo profile={profile[0]} />
    </ScrollView>
  );
};

export default UserProfile;
