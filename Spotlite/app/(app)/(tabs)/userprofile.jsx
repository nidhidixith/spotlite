import { ScrollView, RefreshControl } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

import {
  fetchUserProfile,
  clearUserProfile,
  selectUserProfile,
} from "../../../slices/userProfileSlice";
import { fetchUserPosts } from "../../../slices/postsSlice";
import { fetchUserEvents } from "../../../slices/eventsSlice";

import BasicDetails from "../../../components/UserProfile/BasicDetails";
import Activity from "../../../components/UserProfile/Activity";
import SocialLinks from "../../../components/UserProfile/SocialLinks";
import Interests from "../../../components/UserProfile/Interests";
import UserInfo from "../../../components/UserProfile/UserInfo";
import Bio from "../../../components/UserProfile/Bio";
import ErrorDisplayComponent from "../../../components/Others/ErrorDisplayComponent";
import LoadingIndicator from "../../../components/Others/LoadingIndicator";
import QuestionsAndAnswers from "../../../components/UserProfile/QuestionsAndAnswers";
import SocialStats from "../../../components/UserProfile/SocialStats";
import SocialStats2 from "../../../components/UserProfile/SocialStats2";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing

  const fetchData = async () => {
    try {
      await dispatch(fetchUserProfile()).unwrap(); // Fetch data and unwrap the result
    } catch (error) {
      console.error("Failed to fetch profile:", error); // Handle error
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const profile = useSelector(selectUserProfile);

  const fetchProfileStatus = useSelector(
    (state) => state.profile.userProfile.fetchProfileStatus
  );

  const fetchProfileError = useSelector(
    (state) => state.profile.userProfile.fetchProfileError
  );

  const handleRetry = async () => {
    fetchData();
  };

  if (fetchProfileStatus === "loading") {
    return <LoadingIndicator />;
  }

  if (fetchProfileError) {
    return <ErrorDisplayComponent onRetry={handleRetry} />;
  }

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        dispatch(fetchUserProfile()).unwrap(),
        dispatch(fetchUserPosts()).unwrap(),
        dispatch(fetchUserEvents()).unwrap(),
      ]);
    } catch (error) {
      console.error("Error refreshing profile:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      className="bg-gray-100"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <BasicDetails profile={profile[0]} />
      <Bio profile={profile[0]} />
      <SocialLinks profile={profile[0]} />
      {/* <SocialStats profile={profile[0]} /> */}
      <SocialStats2 profile={profile[0]} />
      <Activity profile={profile[0]} />
      <Interests profile={profile[0]} />
      <UserInfo profile={profile[0]} />
      <QuestionsAndAnswers profile={profile[0]} />
    </ScrollView>
  );
};

export default UserProfile;
