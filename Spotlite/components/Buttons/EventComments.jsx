import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { Link, router } from "expo-router";
import { useSelector, useDispatch } from "react-redux";
import EventCommentBox from "./EventCommentBox";

import {
  clearEventComments,
  deleteEventComment,
  // deletePostComment,
  fetchEventComments,
  selectCommentsByEvent,
} from "../../slices/eventsSlice";

import { TimeAgo } from "../TimeAgo";

import LoadingIndicator from "../Others/LoadingIndicator";
import ErrorDisplayComponent from "../Others/ErrorDisplayComponent";

import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import EmptyState from "../Others/EmptyState";

const EventComments = ({ eventId }) => {
  const dispatch = useDispatch();

  // const userId = useSelector((state) => state.users.ids[0]);
  const userId = useSelector((state) => state.users.currentUserId);

  let comments = useSelector((state) => selectCommentsByEvent(state, eventId));

  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventComments({ eventId }));
    }

    return () => {
      dispatch(clearEventComments());
    };
  }, [dispatch, eventId]);

  const showAlert = (commentId) => {
    Alert.alert(
      "Are you sure?",
      "You cannot restore the comments that have been deleted",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
        },
        {
          text: "Delete",
          onPress: () => {
            console.log("Event Id:", eventId);
            console.log("Comment Id:", commentId);
            dispatch(deleteEventComment({ eventId, commentId }));
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const fetchCommentsStatus = useSelector(
    (state) => state.event.eventComments.loading
  );

  const fetchCommentsError = useSelector(
    (state) => state.event.eventComments.error
  );

  if (fetchCommentsStatus) {
    return <LoadingIndicator />;
  }

  if (fetchCommentsError) {
    return <ErrorDisplayComponent />;
  }

  return (
    <>
      <EventCommentBox eventId={eventId} />
      {comments.length === 0 ? (
        <EmptyState
          message="No comments yet"
          details="Be the first to comment"
          icon="file-text"
        />
      ) : (
        <ScrollView className="flex-1 space-y-2">
          {comments?.map((item) => {
            const isCommentOwner = item?.user_id === userId;
            const isEventOwner = item?.event_owner_id === userId;

            console.log("isCommentOwner", isCommentOwner);
            console.log("isEventOwner", isEventOwner);
            return (
              <View key={item.id} className="flex flex-row">
                <Image
                  source={{ uri: item?.profile_pic }}
                  className="w-[40px] h-[40px] rounded-full mr-2"
                  resizeMode="cover"
                />

                <View className="flex-1 bg-gray-100 p-2 rounded-lg">
                  <View className="flex flex-row items-center">
                    <TouchableOpacity
                      onPress={() => {
                        setTimeout(() => {
                          router.push({
                            pathname: "(app)/display-profile/[userId]",
                            params: {
                              userId: item?.user_id,
                            },
                          });
                        }, 300);
                      }}
                    >
                      <Text className="text-sm font-medium">
                        {item?.display_name}
                      </Text>
                    </TouchableOpacity>
                    <Text className="text-xs italic text-gray-500 ml-auto">
                      <TimeAgo timestamp={item.created_at} />
                    </Text>
                    {(isCommentOwner || isEventOwner) && (
                      <TouchableOpacity
                        onPress={() => showAlert(item.id)}
                        className="px-2 py-1"
                      >
                        <FontAwesome name="trash" size={16} color="#ef4444" />
                      </TouchableOpacity>
                    )}
                  </View>
                  <Text className="text-xs text-gray-500 mb-2">
                    {item?.primary_interest}
                  </Text>
                  <Text className="text-sm">{item.text}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </>
  );
};

export default EventComments;
