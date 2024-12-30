import { View, Text, Image, TouchableOpacity } from "react-native";
import UserPostButtons from "../Buttons/UserPostButtons";
import PostCarousel from "./PostCarousel";
import CustomBottomSheetModal from "../Modals/CustomBottomSheetModal";
import UserPostMenuModal from "../Modals/UserPostMenuModal";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";
import React, { useState, useRef, useMemo } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { selectUserPostById } from "../../slices/postsSlice";
import { TimeAgo } from "../TimeAgo";

const UserPostExcerpt = React.memo(({ postId }) => {
  const userPost = useSelector((state) => selectUserPostById(state, postId));
  const uniqueKey = `post-${userPost?.id}`;
  const [showMore, setShowMore] = useState(false);

  const userPostUserId = userPost?.user_id;
  console.log("UserPost UserId from excerpt: ", userPostUserId);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["12%"], []);
  const [modalContent, setModalContent] = useState(null);

  const handlePostMenuClick = () => {
    setModalContent(
      <UserPostMenuModal postId={postId} bottomSheetRef={bottomSheetRef} />
    );
    bottomSheetRef.current?.present();
  };
  return (
    <View key={uniqueKey}>
      <View className="bg-white px-4 py-2">
        <View className="flex flex-row items-center mb-4">
          {userPost?.profile_pic && (
            <Image
              className="w-[50px] h-[50px] rounded-full mr-4"
              source={{ uri: userPost?.profile_pic }}
              // source={require("../../assets/images/pic1.jpg")}
              resizeMode="cover"
            />
          )}

          <View>
            <Text className="font-bold text-lg">{userPost?.display_name}</Text>

            <Text className="text-[12px] italic">
              <TimeAgo timestamp={userPost?.created_at} />
            </Text>
          </View>
          <TouchableOpacity className="ml-auto" onPress={handlePostMenuClick}>
            <Entypo name="dots-three-vertical" size={22} color="black" />
          </TouchableOpacity>
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
      <UserPostButtons postId={postId} />

      <CustomBottomSheetModal snapPoints={snapPoints} ref={bottomSheetRef}>
        {modalContent}
      </CustomBottomSheetModal>
    </View>
  );
});

export default UserPostExcerpt;
