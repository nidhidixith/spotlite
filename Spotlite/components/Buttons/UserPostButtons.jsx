import { View, Text, TouchableOpacity } from "react-native";
import React, { useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  likePost,
  unLikePost,
  selectUserPostById,
} from "../../slices/postsSlice";

import CustomBottomSheetModal from "../Modals/CustomBottomSheetModal";
import LikesModal from "../Modals/LikesModal";
import CommentsModal from "../Modals/CommentsModal";
import CommentBox from "./CommentBox";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const PostButtons = ({ post }) => {
  const dispatch = useDispatch();

  // const post = useSelector((state) => selectUserPostById(state, postId));

  let [postLikes, setPostLikes] = useState(post?.like_count);
  let [postComments, setPostComments] = useState(post?.comment_count);
  let [isPostLiked, setIsPostLiked] = useState(post?.is_liked);
  const [showCommentBox, setShowCommentBox] = useState(false);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%", "75%"], []);
  const [modalContent, setModalContent] = useState(null);

  const handleLike = () => {
    setPostLikes(postLikes + 1);
    setIsPostLiked(true);
    dispatch(likePost({ postId: post.id }));
  };

  const handleUnLike = () => {
    setPostLikes(postLikes - 1);
    setIsPostLiked(false);
    dispatch(unLikePost({ postId: post.id }));
  };

  const handleComment = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleGetLikes = () => {
    setModalContent(
      <LikesModal postId={post?.id} bottomSheetRef={bottomSheetRef} />
    );
    bottomSheetRef.current?.present();
  };

  const handleGetComments = () => {
    setModalContent(
      <CommentsModal postId={post?.id} bottomSheetRef={bottomSheetRef} />
    );
    bottomSheetRef.current?.present();
  };

  return (
    <View className="bg-white px-4 py-3">
      <View className="flex flex-row items-center">
        <View className="flex flex-row items-center mr-4">
          {isPostLiked ? (
            <TouchableOpacity onPress={handleUnLike} activeOpacity={0.5}>
              <AntDesign
                name="like1"
                size={22}
                color="#0284c7"
                marginRight={5}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleLike} activeOpacity={0.5}>
              <AntDesign
                name="like2"
                size={22}
                color="#1f2937"
                marginRight={5}
              />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={handleGetLikes} activeOpacity={0.5}>
            <Text className="text-gray-800 text-sm">
              {postLikes > 0 && `${postLikes} likes`}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex flex-row items-center mr-4">
          <TouchableOpacity onPress={handleComment}>
            <FontAwesome
              name="comment-o"
              size={22}
              color="#1f2937"
              marginRight={5}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGetComments} activeOpacity={0.5}>
            <Text className="text-gray-800 text-sm">
              {postComments > 0 && `${postComments} comments`}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {showCommentBox && (
        <CommentBox
          postId={post?.id}
          postComments={postComments}
          setPostComments={setPostComments}
        />
      )}

      <CustomBottomSheetModal snapPoints={snapPoints} ref={bottomSheetRef}>
        {modalContent}
      </CustomBottomSheetModal>
    </View>
  );
};

export default PostButtons;
