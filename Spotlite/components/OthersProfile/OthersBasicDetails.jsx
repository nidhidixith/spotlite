import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { follow, unfollow } from "../../slices/userConnectionsSlice";
import { useDispatch } from "react-redux";

const OthersBasicDetails = ({ profile }) => {
  // Guard clause to handle loading state
  if (!profile) {
    return (
      <View className="bg-white px-4 py-3">
        <Text className="text-center text-gray-500">Loading...</Text>
      </View>
    );
  }

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
    <View className="bg-white px-4 py-3 mb-2">
      <View className="flex flex-row items-center mt-2 mb-6 px-6">
        {profile?.profile_pic && (
          <Image
            className="w-[75px] h-[75px] rounded-full mr-2"
            // source={require("../../assets/images/profile-pic.jpg")}
            source={{ uri: profile?.profile_pic }}
            resizeMode="cover"
          />
        )}
        <View className="flex-1">
          <Text
            className="self-center font-rregular font-bold text-2xl mb-1"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {profile?.display_name}
          </Text>
          <Text
            className="self-center font-rregular italic text-gray-600"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {profile?.primary_interest}
          </Text>
        </View>
      </View>

      <View className="flex flex-row justify-between px-6 py-2 mb-6 border-t-2 border-b-2 border-gray-100">
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
          <Text className="font-rregular text-[16px] text-gray-600">
            Followers
          </Text>
          <Text className="font-rregular font-bold text-lg">
            {followerCount}
          </Text>
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
          <Text className="font-rregular text-[16px] text-gray-600">
            Following
          </Text>
          <Text className="font-rregular font-bold text-lg">
            {followingCount}
          </Text>
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
          <Text className="font-rregular text-[16px] text-gray-600">Posts</Text>
          <Text className="font-rregular font-bold text-lg">
            {profile?.no_of_posts}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex flex-row items-center justify-between">
        {isFollowing ? (
          <>
            <TouchableOpacity
              className="bg-sky-600 py-1 mr-4 rounded-xl self-center flex-1"
              onPress={handleUnfollow}
            >
              <Text className=" text-lg text-white self-center font-semibold">
                Unfollow
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              className="bg-sky-600 py-1 mr-4 rounded-xl self-center flex-1"
              onPress={handleFollow}
            >
              <Text className=" text-lg text-white self-center font-semibold">
                Follow
              </Text>
            </TouchableOpacity>
          </>
        )}

        <View className="border border-gray-400 p-2 rounded-xl">
          <Entypo name="share" size={22} color="black" />
        </View>
      </View>
    </View>
  );
};

export default OthersBasicDetails;
