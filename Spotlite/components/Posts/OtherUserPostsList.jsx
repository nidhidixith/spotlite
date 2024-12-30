import React, { useEffect, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import { loadUserFromLocalStorage } from "../../slices/authSlice";
import {
  clearOtherUserPosts,
  fetchOtherUserPosts,
  selectAllOtherUserPosts,
  selectPostsByUser,
} from "../../slices/postsSlice";

import OtherUserPostExcerpt from "./OtherUserPostExcerpt";

const OtherUserPostsList = ({ userId }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchOtherUserPosts(userId));

  //   // return () => {
  //   //   dispatch(clearOtherUserPosts());
  //   // };
  // }, [dispatch, userId]);

  // const posts = useSelector(selectAllOtherUserPosts);
  const posts = useSelector((state) => selectPostsByUser(state, userId));
  console.log("Posts from Other User Posts List:", posts);

  const renderItem = ({ item }) => {
    if (posts.length === 0) {
      return <View>Loading...</View>;
    } else {
      return (
        <OtherUserPostExcerpt key={`userpost-${item.id}`} postId={item.id} />
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
      {/* {posts?.length <= 0 && <Text>No Posts yet</Text>} */}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
      />
    </SafeAreaView>
  );
};

export default OtherUserPostsList;
