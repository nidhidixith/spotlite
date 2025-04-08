import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";

import {
  fetchUserPosts,
  selectAllUserPosts,
  clearUserPosts,
} from "../../slices/postsSlice";
import { fetchUserEvents, selectAllUserEvents } from "../../slices/eventsSlice";

import UserPostExcerpt from "../Posts/UserPostExcerpt";
import UserEventExcerpt from "../Events/UserEventExcerpt";

import AntDesign from "@expo/vector-icons/AntDesign";
import ErrorDisplayComponent from "../Others/ErrorDisplayComponent";
import LoadingIndicator from "../Others/LoadingIndicator";

const Activity = () => {
  const [activeTab, setActiveTab] = useState("Posts");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPosts({ page: 1 }));
    dispatch(fetchUserEvents());
  }, [dispatch]);

  const posts = useSelector(selectAllUserPosts);
  const events = useSelector(selectAllUserEvents);

  const fetchPostsStatus = useSelector((state) => state.post.userPosts.loading);
  const fetchPostsError = useSelector((state) => state.post.userPosts.error);

  const fetchEventsStatus = useSelector(
    (state) => state.event.userEvents.loading
  );

  const fetchEventsError = useSelector((state) => state.event.userEvents.error);

  if (fetchPostsStatus || fetchEventsStatus) {
    return <LoadingIndicator />;
  }

  if (fetchPostsError || fetchEventsError) {
    return <ErrorDisplayComponent />;
  }

  const latestPost = posts?.[0];
  const latestPostId = latestPost?.id;

  const latestEvent = events?.[0];
  const latestEventId = latestEvent?.id;

  const renderComponent = () => {
    switch (activeTab) {
      case "Posts":
        return posts?.length > 0 ? (
          <>
            <UserPostExcerpt postId={latestPostId} />
            <TouchableOpacity
              className="flex flex-row items-center justify-center px-4 py-2"
              onPress={() =>
                router.push("(app)/(display-posts)/display-user-posts")
              }
            >
              <Text className="font-medium text-gray-600 text-base mr-2">
                View all posts
              </Text>
              <AntDesign name="arrowright" size={18} color="#4b5563" />
            </TouchableOpacity>
          </>
        ) : (
          <Text className="text-base text-gray-600 px-4 py-2 self-center font-medium ">
            No posts yet
          </Text>
        );

      case "Events":
        return events?.length > 0 ? (
          <>
            <UserEventExcerpt eventId={latestEventId} />
            <TouchableOpacity
              className="flex flex-row px-4 py-2 items-center justify-center "
              onPress={() =>
                router.push("(app)/(display-events)/display-user-events")
              }
            >
              <Text className="font-medium text-gray-600 text-base mr-2">
                View all events
              </Text>
              <AntDesign name="arrowright" size={18} color="#4b5563" />
            </TouchableOpacity>
          </>
        ) : (
          <Text className="text-base text-gray-600 px-4 py-2 self-center font-medium">
            No events yet
          </Text>
        );

      default:
        return (
          <Text className="text-base text-gray-600 px-4 py-2 self-center font-medium">
            No activity yet!
          </Text>
        );
    }
  };

  return (
    <View className="bg-white mb-3">
      <View className="px-4 py-3">
        <Text className="text-gray-800 font-semibold text-xl mb-3">
          Activity
        </Text>
        <View className="flex flex-row">
          <TouchableOpacity
            className={`px-3 py-1 mr-4 rounded-2xl bg-gray-200 ${
              activeTab === "Posts" && "bg-sky-600 border border-sky-600"
            }`}
            onPress={() => setActiveTab("Posts")}
          >
            <Text
              className={`text-sm font-medium  ${
                activeTab === "Posts" && "text-white"
              }`}
            >
              Posts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`px-3 py-1 mr-4 rounded-2xl bg-gray-200 ${
              activeTab === "Events" && "bg-sky-600  border border-sky-600 "
            }`}
            onPress={() => setActiveTab("Events")}
          >
            <Text
              className={`text-sm font-medium ${
                activeTab === "Events" && "text-white"
              }`}
            >
              Events
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="border-t-2 border-gray-50">{renderComponent()}</View>
    </View>
  );
};

export default Activity;
