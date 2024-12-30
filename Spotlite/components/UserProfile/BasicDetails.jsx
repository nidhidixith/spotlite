import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";

const BasicDetails = ({ profile }) => {
  console.log("Profile Picture URI:", profile?.profile_pic);
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
          // onPress={() => router.push("(app)/(menu)/followers")}
          onPress={() => router.push("(app)/(user-connections)/my-followers")}
        >
          <Text className="font-rregular text-[16px] text-gray-600">
            Followers
          </Text>
          <Text className="font-rregular font-bold text-lg">
            {profile?.follower_count}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center gap-1"
          // onPress={() => router.push("(app)/(menu)/following")}
          onPress={() => router.push("(app)/(user-connections)/my-following")}
        >
          <Text className="font-rregular text-[16px] text-gray-600">
            Following
          </Text>
          <Text className="font-rregular font-bold text-lg">
            {profile?.following_count}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="items-center gap-1"
          onPress={() =>
            router.push("(app)/(display-posts)/display-user-posts")
          }
        >
          <Text className="font-rregular text-[16px] text-gray-600">Posts</Text>
          <Text className="font-rregular font-bold text-lg">
            {profile?.no_of_posts}
          </Text>
        </TouchableOpacity>
      </View>

      {/* <Text className="font-rregular text-[15px] text-justify text-gray-600 mb-7 px-2">
        As a passionate photographer, I find beauty in the everyday moments and
        strive to capture them in a way that tells a story.
      </Text> */}

      <View className="flex flex-row items-center justify-between">
        {/* bg-sky-600 */}
        <TouchableOpacity
          className="bg-sky-600 py-1 mr-4 rounded-xl self-center flex-1"
          onPress={() => router.push("(app)/(edit-profile)/edit-profile")}
        >
          <Text className=" text-lg text-white self-center font-semibold">
            Edit Profile
          </Text>
        </TouchableOpacity>
        <View className="border border-gray-400 p-2 rounded-xl">
          <Entypo name="share" size={22} color="black" />
        </View>
      </View>
    </View>
  );
};

export default BasicDetails;
