import { View, Text, TouchableOpacity } from "react-native";

import React, { useState } from "react";
import { Link } from "expo-router";
import { links } from "../../utilities/links";
import { Ionicons } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import AnimatedCounter from "../Others/AnimatedCounter";

const formatNumber = (num) => {
  if (num >= 1_000_000_000) return Math.floor(num / 1_000_000_000) + "B";
  if (num >= 1_000_000) return Math.floor(num / 1_000_000) + "M";
  if (num >= 1_000) return Math.floor(num / 1_000) + "K";
  return num.toString();
};

const platformColors = {
  facebook: "#3b5998",
  instagram: "#E1306C",
  twitter: "#1DA1F2",
  youtube: "#FF0000",
};

const getBadgeTitle = (stats) => {
  const titles = {
    facebook: "📘 Facebook Influencer",
    instagram: "📸 Instagram Star",
    twitter: "🐦 Twitter Personality",
    youtube: "📺 YouTube Sensation",
  };

  const entries = Object.entries(stats).filter(([_, count]) => count != null);

  if (entries.length === 0) return "🚀 Show your clout here";

  entries.sort((a, b) => b[1] - a[1]);

  const topPlatform = entries[0][0];
  return titles[topPlatform] || "🌟 Rising Creator";
};

const fakeAuthAndFetchFollowers = async (platform) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockCounts = {
        facebook: 12000,
        instagram: 2300,
        twitter: 800,
        youtube: 3400,
      };
      resolve(mockCounts[platform]);
    }, 1500);
  });
};

const supportedPlatforms = ["facebook", "instagram", "twitter", "youtube"];

const SocialStats2 = ({ profile }) => {
  const [stats, setStats] = useState({});
  // Later, when the page is refreshed, the no.of followers should not be replaced by fetch buttons again
  const socialLinks = profile?.social_links;
  console.log("Social links from social stats: ", socialLinks);

  const filteredLinks = socialLinks?.filter((link) =>
    supportedPlatforms.includes(link.platform)
  );

  // console.log(socialLinks[platform])
  const handleFetch = async (platform) => {
    // placeholder for auth+fetch logic
    // simulate with mock data for now
    const followers = await fakeAuthAndFetchFollowers(platform);
    setStats((prev) => ({ ...prev, [platform]: followers }));
  };

  const badgeTitle = getBadgeTitle(stats);
  return (
    <View className="bg-white px-4 py-3 mb-3">
      <View className="flex flex-row items-center justify-between mb-3">
        <Text className="text-gray-800 font-semibold text-xl">
          Social Stats
        </Text>
        <TouchableOpacity
          className="mt-1 px-1"
          onPress={() => Linking.openURL("http://192.168.1.33:3000/stats_info")}
        >
          <Ionicons
            name="information-circle-outline"
            size={22}
            color="#4b5563"
          />
        </TouchableOpacity>
      </View>
      <Text className="text-center text-base font-bold text-sky-600 p-2 mb-2">
        {badgeTitle}
      </Text>
      <View className="gap-y-4 px-2 py-3">
        {filteredLinks?.map(({ platform }) => {
          const platformDetails = links[platform.toLowerCase()] || {};
          return (
            <View
              key={platform}
              className="flex-row items-center justify-between"
            >
              <View className="flex flex-row">
                {platformDetails.icon || (
                  <Ionicons
                    name="help-circle"
                    size={18}
                    color="#4b5563"
                    marginRight={8}
                  />
                )}
                <Text className="capitalize ml-1 text-gray-800">
                  {platform}
                </Text>
              </View>
              {stats[platform] ? (
                // <Text
                //   className="text-base font-medium text-gray-800"
                //   // style={{ color: platformColors[platform] }}
                // >
                //   {formatNumber(stats[platform])} followers
                // </Text>
                <Text className="text-base font-medium text-gray-800">
                  <AnimatedCounter value={stats[platform]} /> followers
                </Text>
              ) : (
                <TouchableOpacity
                  className=" bg-sky-600 border border-gray-200 rounded-2xl py-1 px-3"
                  // style={{ backgroundColor: platformColors[platform] }}
                  onPress={() => handleFetch(platform)}
                >
                  <Text className="text-sm font-medium text-white">{`Fetch stats`}</Text>
                  {/* <Text className="text-sm font-medium text-white">{`Fetch from ${platform}`}</Text> */}
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default SocialStats2;
