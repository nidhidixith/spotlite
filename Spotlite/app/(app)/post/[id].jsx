import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import {
  clearSpecificPost,
  fetchSpecificPost,
  selectAllSpecificPosts,
} from "../../../slices/postsSlice";

import GeneralUserPostExcerpt from "../../../components/Posts/GeneralUserPostExcerpt";
import ErrorDisplayComponent from "../../../components/Others/ErrorDisplayComponent";
import LoadingIndicator from "../../../components/Others/LoadingIndicator";

const PostDetails = () => {
  let { postId } = useLocalSearchParams();
  postId = Number(postId);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        await dispatch(fetchSpecificPost({ postId: postId })).unwrap(); // Fetch data and unwrap the result
      } catch (error) {
        console.error("Failed to fetch post:", error); // Handle error
      } finally {
        setLoading(false); // End loading
      }
    };
    fetchData();

    return () => {
      dispatch(clearSpecificPost());
    };
  }, [dispatch, postId]);

  let userPost = useSelector(selectAllSpecificPosts);
  console.log("Specific post: ", userPost);
  userPost = userPost[0];
  const fetchPostError = useSelector((state) => state.post.specificPost.error);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (fetchPostError) {
    return <ErrorDisplayComponent />;
  }

  return <GeneralUserPostExcerpt post={userPost} />;
};

export default PostDetails;
