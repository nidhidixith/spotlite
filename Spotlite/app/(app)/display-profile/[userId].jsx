import { View, Text, ScrollView, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import OthersBasicDetails from "../../../components/OthersProfile/OthersBasicDetails";
import OthersActivity from "../../../components/OthersProfile/OthersActivity";
import OthersSocialLinks from "../../../components/OthersProfile/OthersSocialLinks";
import OthersInterests from "../../../components/OthersProfile/OthersInterests";
import OthersBio from "../../../components/OthersProfile/OthersBio";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOtherUserProfile,
  clearOtherUserProfile,
  selectProfileByUser,
} from "../../../slices/userProfileSlice";

const DisplayProfile = () => {
  let { userId } = useLocalSearchParams();
  userId = Number(userId);
  console.log("UserId:", userId);

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing

  const fetchProfileStatus = useSelector(
    (state) => state.profile.fetchOtherProfileStatus
  );
  const fetchProfileError = useSelector(
    (state) => state.profile.fetchOtherProfileError
  );

  const loggedInUserId = useSelector((state) => state.users.ids[0]);
  console.log("Logged in UserId:", loggedInUserId);

  const profile = useSelector((state) => selectProfileByUser(state, userId));
  // console.log("Profile:", profile);

  // useEffect(() => {
  //   if (loggedInUserId === userId) {
  //     router.replace("(app)/(tabs)/userprofile");
  //   }

  //   if (userId) {
  //     dispatch(fetchOtherUserProfile(userId));
  //   }

  //   return () => {
  //     dispatch(clearOtherUserProfile());
  //   };
  // }, [dispatch, userId]);

  useEffect(() => {
    if (loggedInUserId === userId) {
      router.replace("(app)/(tabs)/userprofile");
    } else if (userId) {
      dispatch(fetchOtherUserProfile(userId));
    }

    return () => {
      dispatch(clearOtherUserProfile());
    };
  }, [dispatch, userId, loggedInUserId]);

  if (loggedInUserId === userId) {
    // Optionally show a loading spinner or nothing while redirecting
    return null;
  }

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      console.log("Refreshing profile...");

      await dispatch(fetchOtherUserProfile(userId)).unwrap(); // Fetch posts and wait for completion
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
      <OthersBasicDetails profile={profile[0]} />
      <OthersBio profile={profile[0]} />
      <OthersSocialLinks profile={profile[0]} />
      <OthersActivity userId={userId} />
      <OthersInterests profile={profile[0]} />
    </ScrollView>
  );
};

export default DisplayProfile;
