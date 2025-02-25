import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import React, { useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";

import { selectPostById } from "../../slices/postsSlice";

import PostButtons from "../Buttons/PostButtons";
import PostCarousel from "./PostCarousel";
import { TimeAgo } from "../TimeAgo";

const PostExcerpt = React.memo(({ postId }) => {
  const userPost = useSelector((state) => selectPostById(state, postId));
  const uniqueKey = `post-${userPost?.id}`;

  const [showMore, setShowMore] = useState(false);

  const handleShowMoreLessButtonClick = () => {
    setShowMore(!showMore);
  };

  return (
    <View key={uniqueKey}>
      <View className="bg-white px-4 py-2">
        <View className="flex flex-row items-center mb-4">
          {userPost?.profile_pic && (
            <Image
              className="w-[50px] h-[50px] rounded-full mr-4"
              source={{ uri: userPost?.profile_pic }}
              resizeMode="cover"
            />
          )}

          <View>
            <Link
              href={{
                pathname: "/display-profile/[userId]",
                params: { userId: userPost?.user_id },
              }}
              onPress={() => console.log("Link pressed")}
            >
              <Text className="font-bold text-lg">
                {userPost?.display_name}
              </Text>
            </Link>

            <Text className="text-[12px] italic">
              <TimeAgo timestamp={userPost?.created_at} />
            </Text>
          </View>
          {/* <View className="ml-auto">
            <Entypo name="dots-three-vertical" size={22} color="black" />
          </View> */}
        </View>

        {/* Post text */}
        {userPost?.text && (
          <View className="text-justify mb-2">
            {userPost?.text?.length > 250 ? (
              <Text className="text-[16px] text-justify">
                {showMore ? userPost.text : userPost.text.substring(0, 250)}

                <Text
                  className="text-blue-700 text-base italic"
                  onPress={handleShowMoreLessButtonClick}
                >
                  {showMore ? " Show less" : " ...Show more"}
                </Text>
              </Text>
            ) : (
              <Text className="text-[16px] text-justify">{userPost?.text}</Text>
            )}
          </View>
        )}
      </View>
      <PostCarousel mediaFiles={userPost?.media_files} />
      <PostButtons post={userPost} />
    </View>
  );
});

export default PostExcerpt;
