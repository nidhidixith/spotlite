import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import UserPostExcerpt from "../Posts/UserPostExcerpt";
import EventExcerpt from "../Events/EventExcerpt";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserPosts,
  selectAllUserPosts,
  clearUserPosts,
} from "../../slices/postsSlice";
import { fetchUserEvents, selectAllUserEvents } from "../../slices/eventsSlice";
import UserEventExcerpt from "../Events/UserEventExcerpt";

const Activity = () => {
  const [activeTab, setActiveTab] = useState("Posts");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserPosts());
    dispatch(fetchUserEvents());

    // dispatch(loadUserFromLocalStorage());

    // return () => {
    //   dispatch(clearUserPosts());
    // };
  }, [dispatch]);
  const posts = useSelector(selectAllUserPosts);
  const events = useSelector(selectAllUserEvents);

  const latestPost = posts?.[0];
  console.log("Latest post:", latestPost);
  const latestPostId = latestPost?.id;

  const latestEvent = events?.[0];
  console.log("Latest post:", latestEvent);
  const latestEventId = latestEvent?.id;

  const renderComponent = () => {
    switch (activeTab) {
      case "Posts":
        return posts?.length > 0 ? (
          <>
            <UserPostExcerpt postId={latestPostId} />
            <TouchableOpacity
              className="flex flex-row py-1 items-center justify-center"
              onPress={() =>
                router.push("(app)/(display-posts)/display-user-posts")
              }
            >
              <Text className="font-bold text-[16px] mr-2">View all posts</Text>
              <AntDesign name="arrowright" size={18} color="black" />
            </TouchableOpacity>
          </>
        ) : (
          <Text className="text-lg px-4 self-center font-semibold">
            No posts yet
          </Text>
        );

      case "Events":
        return events?.length > 0 ? (
          <>
            <UserEventExcerpt eventId={latestEventId} />
            <TouchableOpacity
              className="flex flex-row py-1 items-center justify-center"
              onPress={() =>
                router.push("(app)/(display-events)/display-user-events")
              }
            >
              <Text className="font-bold text-[16px] mr-2">
                View all events
              </Text>
              <AntDesign name="arrowright" size={18} color="black" />
            </TouchableOpacity>
          </>
        ) : (
          <Text className="text-lg px-4 self-center font-semibold">
            No events yet
          </Text>
        );

      // case "Events":
      //   return (
      //     <>
      //       <EventExcerpt />
      //       <View className="flex flex-row py-1 items-center justify-center">
      //         <Text className="font-bold text-[16px] mr-2">
      //           View all events
      //         </Text>
      //         <AntDesign name="arrowright" size={18} color="black" />
      //       </View>
      //     </>
      //   );

      default:
        return (
          <Text className="px-4 self-center font-bold text-lg">
            No activity yet!
          </Text>
        );
    }
  };

  return (
    <View className="bg-white mb-2">
      <View className="px-4 py-3">
        <Text className="font-rregular font-bold text-xl mb-4">Activity</Text>
        <View className="flex flex-row">
          <TouchableOpacity
            className={`py-2 px-3 mr-4 rounded-2xl bg-gray-200 ${
              activeTab === "Posts" && "bg-sky-600"
            }`}
            onPress={() => setActiveTab("Posts")}
          >
            <Text
              className={`font-rregular font-bold text-[16px] ${
                activeTab === "Posts" && "text-white"
              }`}
            >
              Posts
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`py-2 px-3 mr-4 rounded-2xl bg-gray-200 ${
              activeTab === "Events" && "bg-sky-600"
            }`}
            onPress={() => setActiveTab("Events")}
          >
            <Text
              className={`font-rregular font-bold text-[16px] ${
                activeTab === "Events" && "text-white"
              }`}
            >
              Events
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="border-t-2 border-gray-50 py-2">
        {renderComponent()}
      </View>
    </View>
  );
};

export default Activity;
