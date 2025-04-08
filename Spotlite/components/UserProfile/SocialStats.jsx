import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Linking,
} from "react-native";

import React from "react";
import { Link } from "expo-router";
import { links } from "../../utilities/links";
import { Ionicons } from "@expo/vector-icons";

const formatNumber = (num) => {
  if (num >= 1_000_000_000) return Math.floor(num / 1_000_000_000) + "B";
  if (num >= 1_000_000) return Math.floor(num / 1_000_000) + "M";
  if (num >= 1_000) return Math.floor(num / 1_000) + "K";
  return num.toString();
};

// Social stats array
const socialStats = [
  {
    platform: "Instagram",
    icon: "logo-instagram",
    color: "#E4405F",
    stats: [
      { label: "Followers", value: 200000 },
      { label: "Following", value: 500 },
      { label: "Posts", value: 150 },
    ],
  },
  {
    platform: "Facebook",
    icon: "logo-facebook",
    color: "#3b5998",
    stats: [
      { label: "Followers", value: 101111 },
      { label: "Page likes", value: 42000 },
      { label: "Page views", value: 500000 },
    ],
  },
  {
    platform: "YouTube",
    icon: "logo-youtube",
    color: "#FF0000",
    stats: [
      { label: "Subscribers", value: 1000000 },
      { label: "Videos", value: 100 },
      { label: "Channel views", value: 2000000 },
    ],
  },
  {
    platform: "TikTok",
    icon: "logo-tiktok",
    color: "#010101",
    stats: [
      { label: "Followers", value: 5000000 },
      { label: "Likes", value: 3000000 },
      { label: "Views", value: 15000000 },
    ],
  },
];

// Function to determine the user's badge based on the highest stat
const getBadgeTitle = (stats) => {
  let highestStat = 0;
  let title = "Rising Star"; // Default title

  stats.forEach(({ stats }) => {
    stats.forEach(({ value }) => {
      if (value > highestStat) highestStat = value;
    });
  });

  if (highestStat >= 10_000_000) title = "Viral Sensation";
  else if (highestStat >= 5_000_000) title = "Internet Icon";
  else if (highestStat >= 1_000_000) title = "Content King/Queen";
  else if (highestStat >= 500_000) title = "Trending Creator";
  else if (highestStat >= 100_000) title = "Influencer";
  else if (highestStat >= 50_000) title = "Up-and-Coming";

  return title;
};

const SocialStats = ({ profile }) => {
  // const stats = {
  //   instagram: { followers: 200000, following: 500, posts: 150 },
  //   facebook: { followers: 100000, likes: 42000, views: 500000 },
  //   youtube: { subscribers: 1000000, videos: 100, views: 2000000 },
  //   tiktok: { followers: 5000000, likes: 3000000, views: 15000000 },
  // };

  const badgeTitle = getBadgeTitle(socialStats);

  return (
    <View className="bg-white px-4 py-3 mb-3">
      <Text className="text-gray-800 font-semibold text-xl mb-3">
        Social Stats
      </Text>
      <Text className="text-center text-base font-bold text-sky-600 p-2 mb-2">
        🔥{"  "}
        {badgeTitle}
      </Text>

      {socialStats.map(({ platform, icon, color, stats }) => (
        <View
          key={platform}
          className="flex-row justify-between w-full items-center mb-4 px-4 py-2"
        >
          <Ionicons name={icon} size={18} color={color} />

          {stats.map(({ label, value }) => (
            <View key={label} className="items-center w-1/3">
              <Text className="text-base font-bold text-gray-900">
                {formatNumber(value)}
              </Text>

              <Text className="text-gray-500 text-xs text-center">{label}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>

    // <View className="bg-white px-4 py-2 rounded-xl mx-4 mb-4">
    //   <Text className="text-gray-800 font-semibold text-xl mb-3">
    //     Social Stats
    //   </Text>

    //   <View className=" p-3 rounded-full mb-2 self-center">
    //     <Text className="text-lg font-bold">{badge.title}</Text>
    //   </View>
    //   {/* <View className="px-2">
    //     <View className="mb-6">
    //       <Text className="text-base text-gray-900 font-bold mb-1">200K</Text>
    //       <Text className="text-gray-500 text-sm">Instagram Followers</Text>
    //     </View>
    //     <View className="mb-6">
    //       <Text className="text-base text-gray-900 font-bold mb-1">101K</Text>
    //       <Text className="text-gray-500 text-sm">Twitter Followers</Text>
    //     </View>
    //     <View className="mb-6">
    //       <Text className="text-base text-gray-900 font-bold mb-1">1M</Text>
    //       <Text className="text-gray-500 text-sm">YouTube Subscribers</Text>
    //     </View>
    //     <View className="">
    //       <Text className="text-base text-gray-900 font-bold mb-1">250</Text>
    //       <Text className="text-gray-500 text-sm">LinkedIn Connections</Text>
    //     </View>
    //   </View> */}

    //   <View className="flex-row justify-between w-full items-center mb-4  px-4 py-2 ">
    //     <Ionicons
    //       name="logo-instagram"
    //       size={18}
    //       color="#E4405F"
    //       // marginRight={8}
    //     />
    //     <View className="items-center w-1/3">
    //       {/* <Ionicons name="people-outline" size={26} color="#E1306C" /> */}
    //       <Text className="text-lg font-bold text-gray-900">200K</Text>
    //       <Text className="text-gray-500 text-xs text-center">Followers</Text>
    //     </View>

    //     <View className="items-center w-1/3">
    //       {/* <Ionicons name="person-add-outline" size={26} color="#1DA1F2" /> */}
    //       <Text className="text-lg font-bold text-gray-900">500</Text>
    //       <Text className="text-gray-500 text-xs text-center">Following</Text>
    //     </View>

    //     <View className="items-center w-1/3">
    //       {/* <Ionicons name="camera-outline" size={26} color="#FF0000" /> */}
    //       <Text className="text-lg font-bold text-gray-900">150</Text>
    //       <Text className="text-gray-500 text-xs text-center">Posts</Text>
    //     </View>
    //   </View>

    //   <View className="flex-row justify-between w-full items-center mb-4  px-4 py-2 ">
    //     <Ionicons
    //       name="logo-facebook"
    //       size={18}
    //       color="#3b5998"
    //       // marginRight={8}
    //     />
    //     <View className="items-center w-1/3">
    //       {/* <Ionicons name="people-outline" size={26} color="#E1306C" /> */}
    //       <Text className="text-lg font-bold text-gray-900">100K</Text>
    //       <Text className="text-gray-500 text-xs">Followers</Text>
    //     </View>

    //     <View className="items-center w-1/3">
    //       {/* <Ionicons name="person-add-outline" size={26} color="#1DA1F2" /> */}
    //       <Text className="text-lg font-bold text-gray-900">42K</Text>
    //       <Text className="text-gray-500 text-xs text-center">Page likes</Text>
    //     </View>

    //     <View className="items-center w-1/3">
    //       {/* <Ionicons name="camera-outline" size={26} color="#FF0000" /> */}
    //       <Text className="text-lg font-bold text-gray-900">500K</Text>
    //       <Text className="text-gray-500 text-xs">Page views</Text>
    //     </View>
    //   </View>

    //   <View className="flex-row justify-between w-full items-center mb-4  px-4 py-2 ">
    //     <Ionicons name="logo-youtube" size={18} color="#FF0000" />

    //     <View className="items-center w-1/3">
    //       {/* <Ionicons name="people-outline" size={26} color="#E1306C" /> */}
    //       <Text className="text-lg font-bold text-gray-900">1M</Text>
    //       <Text className="text-gray-500 text-xs">Subscribers</Text>
    //     </View>

    //     <View className="items-center w-1/3">
    //       {/* <Ionicons name="person-add-outline" size={26} color="#1DA1F2" /> */}
    //       <Text className="text-lg font-bold text-gray-900">100</Text>
    //       <Text className="text-gray-500 text-xs">Videos</Text>
    //     </View>

    //     <View className="items-center w-1/3">
    //       {/* <Ionicons name="camera-outline" size={26} color="#FF0000" /> */}
    //       <Text className="text-lg font-bold text-gray-900">2M</Text>
    //       <Text className="text-gray-500 text-xs">Channel views</Text>
    //     </View>
    //   </View>

    //   <View className="flex-row justify-between w-full items-center mb-4  px-4 py-2 ">
    //     <Ionicons name="logo-tiktok" size={18} color="#010101" />

    //     <View className="items-center w-1/3">
    //       {/* <Ionicons name="people-outline" size={26} color="#E1306C" /> */}
    //       <Text className="text-lg font-bold text-gray-900">5M</Text>
    //       <Text className="text-gray-500 text-xs">Followers</Text>
    //     </View>

    //     <View className="items-center w-1/3">
    //       {/* <Ionicons name="person-add-outline" size={26} color="#1DA1F2" /> */}
    //       <Text className="text-lg font-bold text-gray-900">3M</Text>
    //       <Text className="text-gray-500 text-xs">Likes</Text>
    //     </View>

    //     <View className="items-center w-1/3">
    //       {/* <Ionicons name="camera-outline" size={26} color="#FF0000" /> */}
    //       <Text className="text-lg font-bold text-gray-900">15M</Text>
    //       <Text className="text-gray-500 text-xs">Views</Text>
    //     </View>
    //   </View>
    // </View>
  );
};

export default SocialStats;

// export default function SocialStatsCard({ profile }) {
//   return (
//     <ScrollView className="bg-gray-900 text-white p-4 rounded-xl shadow-lg w-full max-w-lg mx-auto">

//       {/* Profile Header */}
//       <View className="flex items-center">
//         <Image
//           source={{ uri: profile.profile_picture }}
//           className="w-20 h-20 rounded-full border-4 border-blue-500"
//         />
//         <Text className="text-xl font-bold mt-3">{profile.display_name}</Text>
//         <Text className="text-gray-400">@{profile.first_name}</Text>
//       </View>

//       {/* Social Links */}
//       <View className="flex flex-row justify-center gap-4 mt-4">

//           <Pressable >
//             <Text className="text-pink-500 text-3xl">📷</Text>
//           </Pressable>

//           <Pressable >
//             <Text className="text-blue-400 text-3xl">🐦</Text>
//           </Pressable>

//           <Pressable >
//             <Text className="text-red-500 text-3xl">▶️</Text>
//           </Pressable>

//           <Pressable >
//             <Text className="text-blue-600 text-3xl">🔗</Text>
//           </Pressable>

//       </View>

//       {/* Stats Grid */}
//       <View className="grid grid-cols-2 gap-4 mt-6">
//         <View className="p-4 bg-gray-800 rounded-lg text-center">
//           <Text className="text-xl font-bold">200K</Text>
//           <Text className="text-gray-400">Instagram Followers</Text>
//         </View>
//         <View className="p-4 bg-gray-800 rounded-lg text-center">
//           <Text className="text-xl font-bold">101K</Text>
//           <Text className="text-gray-400">Twitter Followers</Text>
//         </View>
//         <View className="p-4 bg-gray-800 rounded-lg text-center">
//           <Text className="text-xl font-bold">1M</Text>
//           <Text className="text-gray-400">YouTube Subscribers</Text>
//         </View>
//         <View className="p-4 bg-gray-800 rounded-lg text-center">
//           <Text className="text-xl font-bold">250</Text>
//           <Text className="text-gray-400">LinkedIn Connections</Text>
//         </View>
//       </View>

//       {/* Most Viewed Content */}

//         <View className="mt-6">
//           <Text className="text-gray-400">Most Viewed Video:</Text>
//           <Pressable >
//             <Text className="text-blue-400">Most Viewed Video</Text>
//           </Pressable>
//         </View>

//     </ScrollView>
//   );
// }
