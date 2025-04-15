import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector, useDispatch } from "react-redux";

import {
  clearPosts,
  fetchPosts,
  selectAllPosts,
  fetchPostsStatus,
} from "../../slices/postsSlice";

import PostExcerpt from "./PostExcerpt";
import EmptyState from "../Others/EmptyState";
import ListEndComponent from "../Others/ListEndComponent";
import ErrorDisplayComponent from "../Others/ErrorDisplayComponent";
import LoadingIndicator from "../Others/LoadingIndicator";

const PostsList = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State to track refreshing
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchData = async () => {
    setLoading(true); // Start loading
    try {
      await dispatch(fetchPosts({ page: 1 })).unwrap(); // Fetch data and unwrap the result
    } catch (error) {
      console.error("Failed to fetch posts:", error); // Handle error
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const posts = useSelector(selectAllPosts);
  const fetchPostsError = useSelector((state) => state.post.posts.error);
  const nextPage = useSelector((state) => state.post.posts.nextPage);

  const handleLoadMore = async () => {
    if (nextPage && !loadingMore) {
      setLoadingMore(true);
      const nextPageNumber = new URL(nextPage).searchParams.get("page");
      try {
        await dispatch(fetchPosts({ page: nextPageNumber })).unwrap();
      } catch (error) {
        console.error("Error loading more posts:", error);
      } finally {
        setLoadingMore(false);
      }
    }
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

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      dispatch(clearPosts());
      await dispatch(fetchPosts({ page: 1 })).unwrap(); // Fetch posts and wait for completion
    } catch (error) {
      console.error("Error refreshing posts:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const renderItem = ({ item }) => {
    return <PostExcerpt key={`post-${item.id}`} postId={item.id} />;
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["left", "right", "bottom"]}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.type}-${item.id}`}
        ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <EmptyState
            message="No posts yet"
            details="Follow people to see their posts in the feed"
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
          ) : nextPage === null && posts.length !== 0 ? (
            <ListEndComponent message="You've reached the end!" />
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default PostsList;
