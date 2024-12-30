import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserFollowingList,
  selectAllUserFollowing,
} from "../../../slices/userConnectionsSlice";
import NameProfilePic from "../../../components/NameProfilePic";

const MyFollowing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserFollowingList());
  }, [dispatch]);

  const userFollowing = useSelector(selectAllUserFollowing);

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
