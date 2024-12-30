import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearOtherUserFollowing,
  fetchOtherUserFollowingList,
  selectAllOtherUserFollowing,
} from "../../../slices/userConnectionsSlice";
import NameProfilePic from "../../../components/NameProfilePic";
import { useLocalSearchParams } from "expo-router";

const MyFollowing = () => {
  const dispatch = useDispatch();

  let { userId } = useLocalSearchParams();
  userId = Number(userId);
  console.log("UserId:", userId);

  useEffect(() => {
    dispatch(fetchOtherUserFollowingList({ userId }));
    return () => {
      dispatch(clearOtherUserFollowing());
    };
  }, [dispatch, userId]);

  const userFollowing = useSelector(selectAllOtherUserFollowing);

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
          <Text className="self-center">Not following yet!</Text>
        }
      />
    </View>
  );
};

export default MyFollowing;
