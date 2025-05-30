import React, { useEffect, useCallback, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

import { fetchUserPosts, selectAllUserPosts } from "../../slices/postsSlice";

import UserPostExcerpt from "./UserPostExcerpt";
import EmptyState from "../Others/EmptyState";
import ErrorDisplayComponent from "../Others/ErrorDisplayComponent";
import LoadingIndicator from "../Others/LoadingIndicator";

const UserPostsList = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      await dispatch(fetchUserPosts({ page: 1 })).unwrap(); // Fetch data and unwrap the result
    } catch (error) {
      console.error("Failed to fetch posts:", error); // Handle error
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const posts = useSelector(selectAllUserPosts);
  const nextPage = useSelector((state) => state.post.userPosts.nextPage);
  const fetchPostsError = useSelector((state) => state.post.userPosts.error);

  const handleLoadMore = async () => {
    if (nextPage && !loadingMore) {
      setLoadingMore(true);
      const nextPageNumber = new URL(nextPage).searchParams.get("page");
      try {
        await dispatch(fetchUserPosts({ page: nextPageNumber })).unwrap();
      } catch (error) {
        console.error("Error loading more posts:", error);
      } finally {
        setLoadingMore(false);
      }
    }
  };

  const renderItem = ({ item }) => {
    return <UserPostExcerpt key={`userpost-${item.id}`} postId={item.id} />;
  };

  const handleRetry = async () => {
    fetchData(); // Re-fetch posts on retry
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  if (fetchPostsError) {
    return <ErrorDisplayComponent onRetry={handleRetry} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        ListEmptyComponent={
          <EmptyState
            message="No posts yet"
            details="Start posting to engage with others!"
            icon="file-text"
          />
        }
        contentContainerStyle={
          posts.length === 0 ? { flex: 1 } : {} // Ensures centering when the list is empty
        }
        onEndReached={handleLoadMore} // Trigger loading more posts
        onEndReachedThreshold={0.5} // Load more when the list is 50% from the bottom
        ListFooterComponent={
          loadingMore ? (
            <View className="justify-center items-center bg-white">
              <ActivityIndicator size="large" color="#0284c7" />
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default UserPostsList;
