import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { useDispatch } from "react-redux";

import { follow, unfollow } from "../../slices/userConnectionsSlice";

import Entypo from "@expo/vector-icons/Entypo";

const OthersBasicDetails = ({ profile }) => {
  // State initialization
  const [followerCount, setFollowerCount] = useState(
    profile?.follower_count || 0
  );
  const [followingCount, setFollowingCount] = useState(
    profile?.following_count || 0
  );
  const [isFollowing, setIsFollowing] = useState(
    profile?.is_following || false
  );

  const dispatch = useDispatch();

  const handleFollow = () => {
    setIsFollowing(true);
    setFollowerCount(followerCount + 1);
    dispatch(follow({ userId: profile.user }));
  };

  const handleUnfollow = () => {
    setIsFollowing(false);
    setFollowerCount(followerCount - 1);
    dispatch(unfollow({ userId: profile.user }));
  };

  return (
    <View className="bg-white px-4 py-3 mb-3">
      {profile?.profile_pic && (
        <Image
          className="w-[120px] h-[120px] rounded-full self-center mb-3"
          source={{ uri: profile?.profile_pic }}
          resizeMode="cover"
        />
      )}
      <View className="items-center mb-4 px-6">
        <Text
          className="text-xl text-gray-800 font-semibold mb-1"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {profile?.display_name} {profile?.user_id}
        </Text>
        <Text
          className="text-gray-500 text-sm"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {profile?.primary_interest}
        </Text>
      </View>

      <View className="flex flex-row justify-between px-6 py-1 mb-4 border-t border-b border-gray-100">
        <TouchableOpacity
          className="items-center gap-1"
          onPress={() =>
            router.push({
              pathname: "(app)/(others-connections)/others-followers",
              params: {
                userId: profile?.user,
              },
            })
          }
        >
          <Text className=" font-bold text-lg text-gray-800">
            {followerCount}
          </Text>
          <Text className=" text-base text-gray-500">Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center gap-1"
          onPress={() =>
            router.push({
              pathname: "(app)/(others-connections)/others-following",
              params: {
                userId: profile?.user,
              },
            })
          }
        >
          <Text className=" font-bold text-lg text-gray-800">
            {followingCount}
          </Text>
          <Text className=" text-base text-gray-500">Following</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center  gap-1"
          onPress={() =>
            router.push({
              pathname: "(app)/(display-posts)/display-other-user-posts",
              params: {
                userId: profile?.user,
              },
            })
          }
        >
          <Text className=" font-bold text-lg text-gray-800">
            {profile?.no_of_posts}
          </Text>
          <Text className=" text-base text-gray-500">Posts</Text>
        </TouchableOpacity>
      </View>

      <View className="flex flex-row items-center justify-between  gap-x-4">
        {isFollowing ? (
          <TouchableOpacity
            className="border border-sky-600 bg-sky-600 rounded-2xl p-1 flex-1"
            onPress={handleUnfollow}
          >
            <Text className=" text-base text-white self-center font-medium">
              Unfollow
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="border border-sky-600 bg-sky-600 rounded-2xl p-1 flex-1"
            onPress={handleFollow}
          >
            <Text className=" text-base text-white self-center font-medium">
              Follow
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity className="border border-sky-600 rounded-2xl p-1 flex-1">
          <Text className=" text-base text-sky-600 self-center font-medium">
            Share Profile
          </Text>
          {/* <Entypo name="share" size={22} color="black" /> */}
        </TouchableOpacity>

        {/* <View className="border border-gray-400 p-2 rounded-xl">
          <Entypo name="share" size={22} color="black" />
        </View> */}
      </View>
    </View>
  );
};

export default OthersBasicDetails;
