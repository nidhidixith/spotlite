import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text } from "react-native";
import UserPostExcerpt from "../../../components/Posts/UserPostExcerpt";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts, selectAllUserPosts } from "../../../slices/postsSlice";

const PostDetails = () => {
  let { postId } = useLocalSearchParams();
  postId = Number(postId);
  console.log("PostId is: ", postId);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchUserPosts());
  // }, [dispatch]);

  const posts = useSelector(selectAllUserPosts);
  console.log("All user posts: ", posts);

  return <UserPostExcerpt key={`userpost-${postId}`} postId={postId} />;
};

export default PostDetails;
