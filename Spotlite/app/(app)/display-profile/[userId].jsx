import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchOtherUserProfile,
  clearOtherUserProfile,
  selectProfileByUser,
} from "../../../slices/userProfileSlice";

import OthersBasicDetails from "../../../components/OthersProfile/OthersBasicDetails";
import OthersActivity from "../../../components/OthersProfile/OthersActivity";
import OthersSocialLinks from "../../../components/OthersProfile/OthersSocialLinks";
import OthersInterests from "../../../components/OthersProfile/OthersInterests";
import OthersBio from "../../../components/OthersProfile/OthersBio";
import ErrorDisplayComponent from "../../../components/Others/ErrorDisplayComponent";
import LoadingIndicator from "../../../components/Others/LoadingIndicator";
import OthersQuestionsAndAnswers from "../../../components/OthersProfile/OthersQuestionsAndAnswers";
import { selectCurrentUserId } from "../../../slices/authSlice";

const DisplayProfile = () => {
  let { userId } = useLocalSearchParams();
  userId = Number(userId);

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing

  // const loggedInUserId = useSelector((state) => state.users.ids[0]);
  const loggedInUserId = useSelector((state) => state.users.currentUserId);
  console.log("Logged in userId: ", loggedInUserId);

  const fetchData = async () => {
    try {
      await dispatch(fetchOtherUserProfile(userId)).unwrap(); // Fetch data and unwrap the result
    } catch (error) {
      console.error("Failed to fetch profile:", error); // Handle error
    }
  };

  const profile = useSelector((state) => selectProfileByUser(state, userId));

  useEffect(() => {
    if (loggedInUserId === userId) {
      router.replace("(app)/(tabs)/userprofile");
    } else if (userId) {
      // dispatch(fetchOtherUserProfile(userId));
      fetchData();
    }

    return () => {
      dispatch(clearOtherUserProfile());
    };
  }, [dispatch, userId, loggedInUserId]);

  if (loggedInUserId === userId) {
    // Optionally show a loading spinner or nothing while redirecting
    return null;
  }

  const fetchProfileStatus = useSelector(
    (state) => state.profile.otherUserProfile.fetchOtherProfileStatus
  );

  const fetchProfileError = useSelector(
    (state) => state.profile.otherUserProfile.fetchProfileError
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
      await dispatch(fetchOtherUserProfile(userId)).unwrap(); // Fetch posts and wait for completion
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
      {profile[0]?.questions_and_answers &&
        profile[0].questions_and_answers.length > 0 && (
          <OthersQuestionsAndAnswers profile={profile[0]} />
        )}
    </ScrollView>
  );
};

export default DisplayProfile;
