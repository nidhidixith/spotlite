import React, { useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import PostCarousel from "../../components/Posts/PostCarousel";
import { Link } from "expo-router";
import { TimeAgo } from "../../components/TimeAgo";

import PostButtons from "../Buttons/PostButtons";

const GeneralPostExcerpt = ({ post }) => {
  const uniqueKey = `post-${post?.id}`;
  const [showMore, setShowMore] = useState(false);

  const handleShowMoreLessButtonClick = () => {
    setShowMore(!showMore);
  };

  return (
    <View key={uniqueKey}>
      <View className="bg-white px-4 py-2">
        <View className="flex flex-row items-center">
          {post?.profile_pic && (
            <Image
              className="w-[50px] h-[50px] rounded-full mr-3"
              source={{ uri: post?.profile_pic }}
              resizeMode="cover"
            />
          )}

          <View className="flex-1">
            <View className="flex flex-row items-center">
              <Link
                href={{
                  pathname: "/display-profile/[userId]",
                  params: { userId: post?.user_id },
                }}
                onPress={() => console.log("Link pressed")}
              >
                <Text className="font-semibold text-base text-gray-800">
                  {post?.display_name}
                </Text>
              </Link>
              <Text className="text-xs text-gray-500">{" • "}</Text>
              <Text className="text-xs text-gray-500">
                {post?.primary_interest}
              </Text>
            </View>

            <Text className="text-xs text-gray-500 italic">
              <TimeAgo timestamp={post?.created_at} />
            </Text>
          </View>
        </View>

        {/* Post text */}
        {post?.text && (
          <View className="text-justify mt-2">
            {post?.text?.length > 250 ? (
              <Text className="text-sm text-gray-800 text-justify">
                {showMore ? post.text : post.text.substring(0, 250)}

                <Text
                  className="text-blue-600 text-sm italic"
                  onPress={handleShowMoreLessButtonClick}
                >
                  {showMore ? " Show less" : " ...Show more"}
                </Text>
              </Text>
            ) : (
              <Text className="text-sm text-gray-800 text-justify">
                {post?.text}
              </Text>
            )}
          </View>
        )}
      </View>
      <PostCarousel mediaFiles={post?.media_files} />
      <PostButtons post={post} />
    </View>
  );
};

export default GeneralPostExcerpt;
