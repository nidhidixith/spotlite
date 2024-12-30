import React, { useEffect, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

import { loadUserFromLocalStorage } from "../../slices/authSlice";
import {
  clearUserPosts,
  fetchUserPosts,
  selectAllUserPosts,
} from "../../slices/postsSlice";

import UserPostExcerpt from "./UserPostExcerpt";

const UserPostsList = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchUserPosts());

  //   // dispatch(loadUserFromLocalStorage());

  //   // return () => {
  //   //   dispatch(clearPosts());

  //   // };
  // }, [dispatch]);

  const posts = useSelector(selectAllUserPosts);

  const renderItem = ({ item }) => {
    if (posts.length === 0) {
      return <View>Loading...</View>;
    } else {
      return <UserPostExcerpt key={`userpost-${item.id}`} postId={item.id} />;
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

export default UserPostsList;
