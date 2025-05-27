import { View, Text, Image, Alert, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Link, router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";

import {
  clearPostComments,
  deletePostComment,
  fetchComments,
  selectAllComments,
  selectCommentsByPost,
} from "../../slices/postsSlice";

import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { TimeAgo } from "../TimeAgo";

import LoadingIndicator from "../Others/LoadingIndicator";
import ErrorDisplayComponent from "../Others/ErrorDisplayComponent";

import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import EmptyState from "../Others/EmptyState";

const CommentsModal = ({ postId, bottomSheetRef }) => {
  const dispatch = useDispatch();

  // const userId = useSelector((state) => state.users.ids[0]);
  const userId = useSelector((state) => state.users.currentUserId);

  let comments = useSelector((state) => selectCommentsByPost(state, postId));

  useEffect(() => {
    if (postId) {
      dispatch(fetchComments({ postId }));
    }

    return () => {
      dispatch(clearPostComments());
    };
  }, [dispatch, postId]);

  const showAlert = (commentId) => {
    Alert.alert(
      "Are you sure?",
      "You cannot restore the comments that have been deleted",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "Delete",
          onPress: () => {
            console.log("Post Id:", postId);
            console.log("Comment Id:", commentId);
            dispatch(deletePostComment({ postId, commentId }));
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const fetchCommentsStatus = useSelector(
    (state) => state.post.postComments.loading
  );

  const fetchCommentsError = useSelector(
    (state) => state.post.postComments.error
  );

  if (fetchCommentsStatus) {
    return <LoadingIndicator />;
  }

  if (fetchCommentsError) {
    return <ErrorDisplayComponent />;
  }

  const renderItem = ({ item }) => {
    const isCommentOwner = item?.user_id === userId;
    const isPostOwner = item?.post_owner_id === userId;

    return (
      <View className="flex flex-row">
        <Image
          source={{ uri: item?.profile_pic }}
          className="w-[40px] h-[40px] rounded-full mr-2"
          resizeMode="cover"
        />

        <View className="flex-1 bg-gray-100 p-2 rounded-lg">
          <View className="flex flex-row items-center">
            <TouchableOpacity
              onPress={() => {
                bottomSheetRef?.current?.dismiss(); // Dismiss bottom sheet first
                setTimeout(() => {
                  router.push({
                    pathname: "(app)/display-profile/[userId]",
                    params: {
                      userId: item?.user_id,
                    },
                  });
                }, 300); // Add slight delay to ensure smooth transition
              }}
            >
              <Text className="text-sm font-medium">{item?.display_name}</Text>
            </TouchableOpacity>
            <Text className="text-xs italic text-gray-500 ml-auto">
              <TimeAgo timestamp={item.created_at} />
            </Text>
            {(isCommentOwner || isPostOwner) && (
              <TouchableOpacity
                onPress={() => showAlert(item.id)}
                className="px-2 py-1"
              >
                {/* <Entypo name="trash" size={14} color="red" /> */}
                <FontAwesome name="trash" size={16} color="#ef4444" />
              </TouchableOpacity>
            )}
          </View>
          <Text className="text-xs text-gray-500 mb-2">
            {item?.primary_interest}
          </Text>
          <Text className="text-sm">{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 px-4 py-2">
      <BottomSheetFlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={
          <EmptyState
            message="No comments yet"
            details="Be the first to comment"
            icon="file-text"
          />
        }
      />
    </View>
  );
};

export default CommentsModal;
