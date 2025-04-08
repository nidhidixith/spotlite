import React from "react";
import { FaInstagram, FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa6";

// Function to format large numbers
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
    icon: <FaInstagram size={16} color="#E4405F" />,
    stats: [
      { label: "Followers", value: 200000 },
      { label: "Following", value: 500 },
      { label: "Posts", value: 150 },
    ],
  },
  {
    platform: "Facebook",
    icon: <FaFacebook size={16} color="#3b5998" />,
    stats: [
      { label: "Followers", value: 101111 },
      { label: "Page likes", value: 42000 },
      { label: "Page views", value: 500000 },
    ],
  },
  {
    platform: "YouTube",
    icon: <FaYoutube size={16} color="#FF0000" />,
    stats: [
      { label: "Subscribers", value: 1000000 },
      { label: "Videos", value: 100 },
      { label: "Channel views", value: 2000000 },
    ],
  },
  {
    platform: "TikTok",
    icon: <FaTiktok size={16} color="#010101" />,
    stats: [
      { label: "Followers", value: 5000000 },
      { label: "Likes", value: 3000000 },
      { label: "Shares", value: 15000000 },
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

const SocialStats = () => {
  const badgeTitle = getBadgeTitle(socialStats);

  return (
    // <div className="bg-white px-4 py-2 rounded-xl mx-4 mb-4">
    <div className="bg-white px-4 py-3 mb-4 shadow-md rounded-lg w-full">
      <p className="text-gray-800 font-bold text-base mb-3">Social Stats</p>
      <p className="text-center text-base font-bold text-sky-600 p-2 mb-2">
        🔥 {badgeTitle}
      </p>

      {socialStats.map(({ platform, icon, color, stats }) => (
        <div key={platform} className=" flex flex-row items-center py-4">
          <div className="px-4">{icon}</div>
          <div className="  flex flex-row flex-1 items-center">
            {stats.map(({ label, value }) => (
              <div key={label} className="items-center w-1/3">
                <p className="text-sm font-bold text-gray-900 text-center">
                  {formatNumber(value)}
                </p>

                <p className="text-gray-500 text-xs text-center">{label}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SocialStats;
