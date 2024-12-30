import { View, Text, Image, Alert } from "react-native";
import React, { useEffect } from "react";
// import { comments } from "../../backend/likes";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { TimeAgo } from "../TimeAgo";
import { Link, router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import {
  clearPostComments,
  deletePostComment,
  fetchComments,
  selectAllComments,
  selectCommentsByPost,
} from "../../slices/postsSlice";
import { TouchableOpacity } from "react-native-gesture-handler";
import Entypo from "@expo/vector-icons/Entypo";

const CommentsModal = ({ postId, bottomSheetRef }) => {
  const dispatch = useDispatch();

  console.log("Bottomsheet ref:", bottomSheetRef);

  const handlePress = () => {
    router.replace({
      pathname: "(app)/display-profile/[userId]",
      params: {
        userId: userPost?.user_id,
      },
    });
  };

  const userId = useSelector((state) => state.users.ids[0]);
  console.log("userId: ", userId);

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
    // bottomSheetRef?.current?.close();
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
                router.push({
                  pathname: "(app)/display-profile/[userId]",
                  params: {
                    userId: item?.user_id,
                  },
                });

                bottomSheetRef.current?.close();
              }}
            >
              <Text className="text-md font-bold">{item?.display_name}</Text>
            </TouchableOpacity>
            <Text className="text-[10px] italic text-gray-500 ml-auto">
              <TimeAgo timestamp={item.created_at} />
            </Text>
            {(isCommentOwner || isPostOwner) && (
              <TouchableOpacity
                onPress={() => showAlert(item.id)}
                className="ml-2"
              >
                <Entypo name="trash" size={18} color="red" />
              </TouchableOpacity>
            )}
          </View>
          <Text className="text-[12px] text-gray-500 mb-2">
            {item?.primary_interest}
          </Text>
          <Text className="text-md">{item.text}</Text>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 px-5 py-2">
      <BottomSheetFlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}

        // ListHeaderComponent={<Text>{comment_count} comments</Text>}
        // contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default CommentsModal;
