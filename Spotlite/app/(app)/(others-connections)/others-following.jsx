import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";

import {
  clearOtherUserFollowing,
  fetchOtherUserFollowingList,
  selectAllOtherUserFollowing,
} from "../../../slices/userConnectionsSlice";

import NameProfilePic from "../../../components/NameProfilePic";
import EmptyState from "../../../components/Others/EmptyState";
import ErrorDisplayComponent from "../../../components/Others/ErrorDisplayComponent";
import LoadingIndicator from "../../../components/Others/LoadingIndicator";

const MyFollowing = () => {
  const dispatch = useDispatch();

  let { userId } = useLocalSearchParams();
  userId = Number(userId);

  useEffect(() => {
    dispatch(fetchOtherUserFollowingList({ userId }));
    return () => {
      dispatch(clearOtherUserFollowing());
    };
  }, [dispatch, userId]);

  const userFollowing = useSelector(selectAllOtherUserFollowing);

  const fetchFollowingStatus = useSelector(
    (state) => state.userConnection.otherUserFollowing.loading
  );

  const fetchFollowingError = useSelector(
    (state) => state.userConnection.otherUserFollowing.error
  );

  if (fetchFollowingStatus) {
    return <LoadingIndicator />;
  }

  if (fetchFollowingError) {
    return <ErrorDisplayComponent />;
  }

  const renderItem = ({ item }) => {
    return <NameProfilePic obj={item} index={item.id} key={item.id} />;
  };

  return (
    <View className="bg-white px-3 py-2 flex-1">
      <FlatList
        data={userFollowing}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={
          <EmptyState
            message="Not Following Anyone"
            details="This user hasn’t followed anyone yet."
            icon="users"
          />
        }
        contentContainerStyle={
          userFollowing.length === 0 ? { flex: 1 } : {} // Ensures centering when the list is empty
        }
      />
    </View>
  );
};

export default MyFollowing;
