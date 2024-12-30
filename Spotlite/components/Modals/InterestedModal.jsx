import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  clearEventInterests,
  fetchInterests,
  selectInterestsByEvent,
} from "../../slices/eventsSlice";

import NameProfilePic from "../NameProfilePic";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

const InterestedModal = ({ eventId, bottomSheetRef }) => {
  const dispatch = useDispatch();
  let interests;
  interests = useSelector((state) => selectInterestsByEvent(state, eventId));

  useEffect(() => {
    if (eventId) {
      dispatch(fetchInterests({ eventId }));
    }
    return () => {
      dispatch(clearEventInterests());
    };
  }, [dispatch, eventId]);

  const renderItem = ({ item }) => {
    return (
      <NameProfilePic
        obj={item}
        index={item.id}
        key={item.id}
        bottomSheetRef={bottomSheetRef}
      />
    );
  };
  return (
    <View className="flex-1 px-5 py-2">
      <BottomSheetFlatList
        data={interests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}

        // ListHeaderComponent={<Text>{like_count} likes</Text>}
        // contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default InterestedModal;
