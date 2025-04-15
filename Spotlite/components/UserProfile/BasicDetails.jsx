import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

const BasicDetails = ({ profile }) => {
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
        {profile?.primary_interest ? (
          <Text
            className="text-gray-500 text-sm"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {profile?.primary_interest}
          </Text>
        ) : (
          <TouchableOpacity
            onPress={() => router.push("(app)/(edit-profile)/edit-details")}
          >
            <Text className="text-sm text-sky-600 self-center">
              Add your Primary interest
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View className="flex flex-row justify-between px-6 py-1 mb-4 border-t border-b border-gray-100">
        <TouchableOpacity
          className="items-center gap-1"
          onPress={() => router.push("(app)/(user-connections)/my-followers")}
        >
          <Text className=" font-bold text-lg text-gray-800">
            {profile?.follower_count}
          </Text>
          <Text className=" text-base text-gray-500">Followers</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center gap-1"
          onPress={() => router.push("(app)/(user-connections)/my-following")}
        >
          <Text className=" font-bold text-lg text-gray-800">
            {profile?.following_count}
          </Text>
          <Text className=" text-base text-gray-500">Following</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center gap-1"
          onPress={() =>
            router.push("(app)/(display-posts)/display-user-posts")
          }
        >
          <Text className=" font-bold text-lg text-gray-800">
            {profile?.no_of_posts}
          </Text>
          <Text className=" text-base text-gray-500">Posts</Text>
        </TouchableOpacity>
      </View>

      <View className="flex flex-row items-center justify-between  gap-x-4">
        <TouchableOpacity
          className="border border-sky-600 bg-sky-600 rounded-2xl p-1 flex-1"
          onPress={() => router.push("(app)/(edit-profile)/edit-profile")}
        >
          <Text className=" text-base text-white self-center font-medium">
            Edit Profile
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="border border-sky-600 rounded-2xl p-1 flex-1">
          <Text className=" text-base text-sky-600 self-center font-medium">
            Share Profile
          </Text>
          {/* <Entypo name="share" size={22} color="black" /> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BasicDetails;
