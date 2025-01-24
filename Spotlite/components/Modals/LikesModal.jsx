import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  clearPostLikes,
  fetchLikes,
  selectLikesByPost,
} from "../../slices/postsSlice";

import NameProfilePic from "../NameProfilePic";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import LoadingIndicator from "../Others/LoadingIndicator";
import ErrorDisplayComponent from "../Others/ErrorDisplayComponent";

const LikesModal = ({ postId, bottomSheetRef }) => {
  const dispatch = useDispatch();
  let likes;
  likes = useSelector((state) => selectLikesByPost(state, postId));

  useEffect(() => {
    if (postId) {
      dispatch(fetchLikes({ postId }));
    }
    return () => {
      dispatch(clearPostLikes());
    };
  }, [dispatch, postId]);

  const fetchLikesStatus = useSelector((state) => state.post.postLikes.loading);
  const fetchLikesError = useSelector((state) => state.post.postLikes.error);

  if (fetchLikesStatus) {
    return <LoadingIndicator />;
  }

  if (fetchLikesError) {
    return <ErrorDisplayComponent />;
  }

  const renderItem = ({ item }) => {
    return (
      <NameProfilePic
        obj={item}
        index={item.id}
        key={item.id}
        bottomSheetRef={bottomSheetRef}
      />
    );
  };
  return (
    <View className="flex-1 px-5 py-2">
      <BottomSheetFlatList
        data={likes}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
};

export default LikesModal;
