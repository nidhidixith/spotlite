import { View, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import React, { useState, useRef, useMemo } from "react";
import { useSelector } from "react-redux";

import { selectPostById } from "../../slices/postsSlice";

import PostButtons from "../Buttons/PostButtons";
import PostCarousel from "./PostCarousel";
import { TimeAgo } from "../TimeAgo";
import GeneralPostExcerpt from "./GeneralPostExcerpt";

const PostExcerpt = React.memo(({ postId }) => {
  const userPost = useSelector((state) => selectPostById(state, postId));
  // const uniqueKey = `post-${userPost?.id}`;

  // const [showMore, setShowMore] = useState(false);

  // const handleShowMoreLessButtonClick = () => {
  //   setShowMore(!showMore);
  // };

  return (
    <GeneralPostExcerpt post={userPost} />
    // <View key={uniqueKey}>
    //   <View className="bg-white px-4 py-2">
    //     <View className="flex flex-row items-center">
    //       {userPost?.profile_pic && (
    //         <Image
    //           className="w-[50px] h-[50px] rounded-full mr-3"
    //           source={{ uri: userPost?.profile_pic }}
    //           resizeMode="cover"
    //         />
    //       )}

    //       <View className="flex-1">
    //         <View className="flex flex-row items-center">
    //           <Link
    //             href={{
    //               pathname: "/display-profile/[userId]",
    //               params: { userId: userPost?.user_id },
    //             }}
    //             onPress={() => console.log("Link pressed")}
    //           >
    //             <Text className="font-semibold text-base text-gray-800">
    //               {userPost?.display_name}
    //             </Text>
    //           </Link>
    //           <Text className="text-xs text-gray-500">{" • "}</Text>
    //           <Text className="text-xs text-gray-500">
    //             {userPost?.primary_interest}
    //           </Text>
    //         </View>

    //         <Text className="text-xs text-gray-500 italic">
    //           <TimeAgo timestamp={userPost?.created_at} />
    //         </Text>
    //       </View>

    //       {/* <TouchableOpacity className="ml-auto">
    //         <Entypo name="dots-three-vertical" size={20} color="#1f2937" />
    //       </TouchableOpacity> */}
    //     </View>

    //     {/* Post text */}
    //     {userPost?.text && (
    //       <View className="text-justify mt-2">
    //         {userPost?.text?.length > 250 ? (
    //           <Text className="text-sm text-gray-800 text-justify">
    //             {showMore ? userPost.text : userPost.text.substring(0, 250)}

    //             <Text
    //               className="text-blue-600 text-sm italic"
    //               onPress={handleShowMoreLessButtonClick}
    //             >
    //               {showMore ? " Show less" : " ...Show more"}
    //             </Text>
    //           </Text>
    //         ) : (
    //           <Text className="text-sm text-gray-800 text-justify">
    //             {userPost?.text}
    //           </Text>
    //         )}
    //       </View>
    //     )}
    //   </View>
    //   <PostCarousel mediaFiles={userPost?.media_files} />
    //   <PostButtons post={userPost} />
    // </View>
  );
});

export default PostExcerpt;
