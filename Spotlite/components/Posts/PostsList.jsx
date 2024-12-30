import React, { useEffect, useCallback, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
// import { useFocusEffect } from "@react-navigation/native";

// import { loadUserFromLocalStorage } from "../../slices/authSlice";
import {
  clearPosts,
  fetchPosts,
  selectAllPosts,
  fetchPostsStatus,
} from "../../slices/postsSlice";

import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing

  useEffect(() => {
    dispatch(fetchPosts());

    // dispatch(loadUserFromLocalStorage());

    // return () => {
    //   dispatch(clearPosts());
    // };
  }, [dispatch]);

  const posts = useSelector(selectAllPosts);

  // const fetchPostsStatus = useSelector(
  //   (state) => state.userProfile.fetchProfileStatus
  // );

  // const fetchProfileError = useSelector(
  //   (state) => state.userProfile.fetchProfileError
  // );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      console.log("Refreshing posts...");
      await dispatch(fetchPosts()).unwrap(); // Fetch posts and wait for completion
      console.log("Posts refreshed successfully");
    } catch (error) {
      console.error("Error refreshing posts:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderItem = ({ item }) => {
    if (posts.length === 0) {
      return <View>Loading...</View>;
    } else {
      return <PostExcerpt key={`post-${item.id}`} postId={item.id} />;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        refreshing={refreshing} // Pass refreshing state
        onRefresh={onRefresh} // Pass onRefresh handler
      />
    </SafeAreaView>
  );
};

export default PostsList;
