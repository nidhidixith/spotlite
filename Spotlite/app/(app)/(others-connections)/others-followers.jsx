import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocalSearchParams } from "expo-router";

import {
  clearOtherUserFollowers,
  fetchOtherUserFollowersList,
  selectAllOtherUserFollowers,
} from "../../../slices/userConnectionsSlice";

import NameProfilePic from "../../../components/NameProfilePic";
import EmptyState from "../../../components/Others/EmptyState";
import ErrorDisplayComponent from "../../../components/Others/ErrorDisplayComponent";
import LoadingIndicator from "../../../components/Others/LoadingIndicator";

const MyFollowers = () => {
  const dispatch = useDispatch();
  let { userId } = useLocalSearchParams();
  userId = Number(userId);

  useEffect(() => {
    dispatch(fetchOtherUserFollowersList({ userId }));
    return () => {
      dispatch(clearOtherUserFollowers());
    };
  }, [dispatch, userId]);

  const userFollowers = useSelector(selectAllOtherUserFollowers);

  const fetchFollowersStatus = useSelector(
    (state) => state.userConnection.otherUserFollowers.loading
  );

  const fetchFollowersError = useSelector(
    (state) => state.userConnection.otherUserFollowers.error
  );

  if (fetchFollowersStatus) {
    return <LoadingIndicator />;
  }

  if (fetchFollowersError) {
    return <ErrorDisplayComponent />;
  }

  const renderItem = ({ item }) => {
    return <NameProfilePic obj={item} index={item.id} key={item.id} />;
  };

  return (
    <View className="bg-white px-3 py-2 flex-1">
      <FlatList
        data={userFollowers}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id}`}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        ListEmptyComponent={<EmptyState message="No followers yet!" />}
        contentContainerStyle={
          userFollowers.length === 0 ? { flex: 1 } : {} // Ensures centering when the list is empty
        }
      />
    </View>
  );
};

export default MyFollowers;
