import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

import AntDesign from "@expo/vector-icons/AntDesign";

const PostCarousel = ({ mediaFiles }) => {
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item, index }) => {
    const mediaFile = item.media_file.split("/").pop();

    const isVideo =
      mediaFile.endsWith(".mp4") ||
      mediaFile.endsWith(".mov") ||
      mediaFile.endsWith(".avi") ||
      mediaFile.endsWith(".webm") ||
      mediaFile.endsWith(".mkv");

    const isAudio =
      mediaFile.endsWith(".mp3") ||
      mediaFile.endsWith(".wav") ||
      mediaFile.endsWith(".ogg") ||
      mediaFile.endsWith(".flac") ||
      mediaFile.endsWith(".aac");

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          router.push({
            pathname: "(app)/(full-media-view)/post-full-view",
            params: {
              mediaFiles: JSON.stringify(mediaFiles),
              index: index,
            },
          });
        }}
      >
        {isVideo || isAudio ? (
          <View
            style={{ height: 400, width: screenWidth }}
            className="bg-black justify-center items-center"
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                router.push({
                  pathname: "(app)/(full-media-view)/post-full-view",
                  params: {
                    mediaFiles: JSON.stringify(mediaFiles),
                    index: index,
                  },
                });
              }}
            >
              <AntDesign name="play" size={60} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Image
              source={{ uri: item.media_file }}
              style={{ height: 400, width: screenWidth }}
              resizeMode="cover"
            />
          </>
        )}
      </TouchableOpacity>
    );
  };

  // Render Dot Indicators
  const renderDotIndicators = () => {
    return mediaFiles?.map((_, index) => {
      // if the active index === index

      if (activeIndex === index) {
        return (
          <View
            className="bg-gray-400 h-2 w-2 rounded-full mr-1"
            key={index}
          ></View>
        );
      } else {
        return (
          <View
            key={index}
            className="bg-gray-200 h-2 w-2 rounded-full mr-1"
          ></View>
        );
      }
    });
  };

  // Handle Scroll
  const handleScroll = (event) => {
    // Get the scroll position
    const scrollPosition = event.nativeEvent.contentOffset.x;
    // console.log({ scrollPosition });

    // Get the index of current active item
    const index = Math.round(scrollPosition / screenWidth);

    setActiveIndex(index);
  };

  return (
    <View>
      <FlatList
        data={mediaFiles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
      />
      {mediaFiles?.length > 1 && (
        <View className="flex flex-row justify-center items-center p-2 bg-white">
          {renderDotIndicators()}
        </View>
      )}
    </View>
  );
};

export default PostCarousel;
