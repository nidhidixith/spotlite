import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import {
  clearEventInterests,
  fetchInterests,
  selectInterestsByEvent,
} from "../../slices/eventsSlice";

import NameProfilePic from "../NameProfilePic";
import LoadingIndicator from "../Others/LoadingIndicator";
import ErrorDisplayComponent from "../Others/ErrorDisplayComponent";

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

  const fetchInterestedStatus = useSelector(
    (state) => state.event.eventInterests.loading
  );

  const fetchInterestedError = useSelector(
    (state) => state.event.eventInterests.error
  );

  if (fetchInterestedStatus) {
    return <LoadingIndicator />;
  }

  if (fetchInterestedError) {
    return <ErrorDisplayComponent />;
  }

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
      />
    </View>
  );
};

export default InterestedModal;
