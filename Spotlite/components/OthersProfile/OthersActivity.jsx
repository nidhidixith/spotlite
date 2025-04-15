import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";

import {
  selectAllOtherUserPosts,
  fetchOtherUserPosts,
  clearOtherUserPosts,
  selectPostsByUser,
} from "../../slices/postsSlice";
import {
  clearOtherUserEvents,
  fetchOtherUserEvents,
  selectEventsByUser,
} from "../../slices/eventsSlice";

import OtherUserPostExcerpt from "../Posts/OtherUserPostExcerpt";
import OtherUserEventExcerpt from "../Events/OtherUserEventExcerpt";
import ErrorDisplayComponent from "../Others/ErrorDisplayComponent";

import AntDesign from "@expo/vector-icons/AntDesign";
import LoadingIndicator from "../Others/LoadingIndicator";

const OthersActivity = ({ userId }) => {
  const [activeTab, setActiveTab] = useState("Posts");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOtherUserPosts({ userId, page: 1 }));
    dispatch(fetchOtherUserEvents(userId));

    return () => {
      dispatch(clearOtherUserPosts());
      dispatch(clearOtherUserEvents());
    };
  }, [dispatch, userId]);

  const posts = useSelector((state) => selectPostsByUser(state, userId));
  const events = useSelector((state) => selectEventsByUser(state, userId));

  const fetchPostsStatus = useSelector(
    (state) => state.post.otherUserPosts.loading
  );

  const fetchPostsError = useSelector(
    (state) => state.post.otherUserPosts.error
  );

  const fetchEventsStatus = useSelector(
    (state) => state.event.otherUserEvents.loading
  );

  const fetchEventsError = useSelector(
    (state) => state.event.otherUserEvents.error
  );

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
            <OtherUserPostExcerpt postId={latestPostId} />

            <TouchableOpacity
              className="flex flex-row items-center justify-center px-4 py-2"
              onPress={() =>
                router.push({
                  pathname: "(app)/(display-posts)/display-other-user-posts",
                  params: { userId: userId },
                })
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
            <OtherUserEventExcerpt eventId={latestEventId} />

            <TouchableOpacity
              className="flex flex-row px-4 py-2 items-center justify-center "
              onPress={() =>
                router.push({
                  pathname: "(app)/(display-events)/display-other-user-events",
                  params: { userId: userId },
                })
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

export default OthersActivity;
