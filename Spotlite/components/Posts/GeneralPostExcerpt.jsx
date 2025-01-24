import React, { useMemo, useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import UserPostMenuModal from "../../components/Modals/UserPostMenuModal";
import CustomBottomSheetModal from "../../components/Modals/CustomBottomSheetModal";
import PostCarousel from "../../components/Posts/PostCarousel";
import UserPostButtons from "../../components/Buttons/UserPostButtons";
import { TimeAgo } from "../../components/TimeAgo";

import Entypo from "@expo/vector-icons/Entypo";

const GeneralPostExcerpt = ({ post }) => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["12%"], []);
  const [modalContent, setModalContent] = useState(null);

  const [showMore, setShowMore] = useState(false);

  const handleShowMoreLessButtonClick = () => {
    setShowMore(!showMore);
  };

  const handlePostMenuClick = () => {
    setModalContent(
      <UserPostMenuModal postId={post?.id} bottomSheetRef={bottomSheetRef} />
    );
    bottomSheetRef.current?.present();
  };

  return (
    <>
      <View className="bg-white px-4 py-2">
        <View className="flex flex-row items-center mb-4">
          {post?.profile_pic && (
            <Image
              className="w-[50px] h-[50px] rounded-full mr-4"
              source={{ uri: post?.profile_pic }}
              resizeMode="cover"
            />
          )}

          <View>
            <Text className="font-bold text-lg">{post?.display_name}</Text>

            <Text className="text-[12px] italic">
              <TimeAgo timestamp={post?.created_at} />
            </Text>
          </View>
          <TouchableOpacity className="ml-auto" onPress={handlePostMenuClick}>
            <Entypo name="dots-three-vertical" size={22} color="black" />
          </TouchableOpacity>
        </View>

        {/* Post text */}
        {post?.text && (
          <View className="text-justify mb-2">
            {post?.text?.length > 250 ? (
              <Text className="text-[16px] text-justify">
                {showMore ? post.text : post.text.substring(0, 250)}

                <Text
                  className="text-blue-700 text-base italic"
                  onPress={handleShowMoreLessButtonClick}
                >
                  {showMore ? " Show less" : " ...Show more"}
                </Text>
              </Text>
            ) : (
              <Text className="text-[16px] text-justify">{post?.text}</Text>
            )}
          </View>
        )}
      </View>
      <PostCarousel mediaFiles={post?.media_files} />
      <UserPostButtons post={post} />

      <CustomBottomSheetModal snapPoints={snapPoints} ref={bottomSheetRef}>
        {modalContent}
      </CustomBottomSheetModal>
    </>
  );
};

export default GeneralPostExcerpt;
