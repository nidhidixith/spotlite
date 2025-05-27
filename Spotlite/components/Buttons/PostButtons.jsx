import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { likePost, unLikePost, selectPostById } from "../../slices/postsSlice";

import CustomBottomSheetModal from "../Modals/CustomBottomSheetModal";
import LikesModal from "../Modals/LikesModal";
import CommentsModal from "../Modals/CommentsModal";
import CommentBox from "./CommentBox";

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { debounce } from "../../utilities/debounce";

const DEBOUNCE_DELAY = 2000; // or 400 if you prefer a bit more cushion

const PostButtons = ({ post }) => {
  const dispatch = useDispatch();
  const [postLikes, setPostLikes] = useState(post?.like_count);
  const [postComments, setPostComments] = useState(post?.comment_count);
  const [isPostLiked, setIsPostLiked] = useState(post?.is_liked);
  const [showCommentBox, setShowCommentBox] = useState(false);
  // const [isButtonDisabled, setIsButtonDisabled] = useState(false); // optional: disable button briefly

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["50%", "75%"], []);
  const [modalContent, setModalContent] = useState(null);

  // debounced like handler
  // const debouncedLike = useCallback(
  //   debounce(() => {
  //     dispatch(likePost({ postId: post.id }));
  //     // setIsButtonDisabled(false);
  //   }, DEBOUNCE_DELAY),
  //   []
  // );

  // const debouncedUnLike = useCallback(
  //   debounce(() => {
  //     dispatch(unLikePost({ postId: post.id }));
  //     // setIsButtonDisabled(false);
  //   }, DEBOUNCE_DELAY),
  //   []
  // );
  const debouncedLike = useMemo(
    () =>
      debounce(() => {
        dispatch(likePost({ postId: post.id }));
      }, DEBOUNCE_DELAY),
    [dispatch, post?.id]
  );

  const debouncedUnLike = useMemo(
    () =>
      debounce(() => {
        dispatch(unLikePost({ postId: post.id }));
      }, DEBOUNCE_DELAY),
    [dispatch, post?.id]
  );

  const handleLike = () => {
    // if (isButtonDisabled) return;
    // setIsButtonDisabled(true);
    debouncedUnLike.cancel();
    setPostLikes((prev) => prev + 1);
    setIsPostLiked(true);
    debouncedLike();
  };

  const handleUnLike = () => {
    // if (isButtonDisabled) return;
    // setIsButtonDisabled(true);
    debouncedLike.cancel();
    setPostLikes((prev) => prev - 1);
    setIsPostLiked(false);
    debouncedUnLike();
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
            <TouchableOpacity
              onPress={handleUnLike}
              activeOpacity={0.5}
              // disabled={isButtonDisabled}
            >
              <AntDesign
                name="like1"
                size={22}
                color="#0284c7"
                marginRight={5}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleLike}
              activeOpacity={0.5}
              // disabled={isButtonDisabled}
            >
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
          postId={post.id}
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
