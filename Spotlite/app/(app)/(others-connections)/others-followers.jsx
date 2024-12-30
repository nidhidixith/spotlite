import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearOtherUserFollowers,
  fetchOtherUserFollowersList,
  selectAllOtherUserFollowers,
} from "../../../slices/userConnectionsSlice";
import NameProfilePic from "../../../components/NameProfilePic";
import { useLocalSearchParams } from "expo-router";

const MyFollowers = () => {
  const dispatch = useDispatch();
  let { userId } = useLocalSearchParams();
  userId = Number(userId);
  console.log("UserId:", userId);

  useEffect(() => {
    dispatch(fetchOtherUserFollowersList({ userId }));
    return () => {
      dispatch(clearOtherUserFollowers());
    };
  }, [dispatch, userId]);

  const userFollowers = useSelector(selectAllOtherUserFollowers);
  console.log("UserFollowers:", userFollowers.length);

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
        ListEmptyComponent={
          <Text className="self-center">No followers yet!</Text>
        }
      />
    </View>
  );
};

export default MyFollowers;
