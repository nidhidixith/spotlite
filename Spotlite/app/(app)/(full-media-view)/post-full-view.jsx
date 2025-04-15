import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { Video, ResizeMode, Audio } from "expo-av";

import AntDesign from "@expo/vector-icons/AntDesign";

const PostFullView = () => {
  const { index, mediaFiles } = useLocalSearchParams();

  const screenWidth = Dimensions.get("window").width;

  const [activeIndex, setActiveIndex] = useState(parseInt(index));

  const parsedMediaFiles = JSON.parse(mediaFiles);

  const [sound, setSound] = useState(null); // Added sound state
  const [isPlaying, setIsPlaying] = useState(false); // Track playing status

  const playSound = async (uri) => {
    const { sound } = await Audio.Sound.createAsync(
      { uri } // Using the dynamic URI for the audio file
    );
    setSound(sound);

    await sound.playAsync();
    setIsPlaying(true);
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
          setIsPlaying(false);
        }
      : undefined;
  }, [sound]);

  const renderItem = ({ item }) => {
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
      <TouchableOpacity style={{ flex: 1 }} activeOpacity={0.9}>
        {isVideo ? (
          <Video
            // ref={video}
            source={{ uri: item.media_file }}
            style={[styles.imageBackground, { width: screenWidth }]}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
          />
        ) : isAudio ? (
          <View
            style={[styles.imageBackground, { width: screenWidth }]}
            className="bg-black justify-center items-center"
          >
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={async () => {
                if (isPlaying) {
                  await sound.stopAsync();
                  setIsPlaying(false);
                } else {
                  await playSound(item.media_file);
                }
              }}
            >
              <AntDesign
                name={isPlaying ? "pause" : "play"}
                size={60}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <Image
            source={{ uri: item.media_file }}
            className="mb-2"
            style={[styles.imageBackground, { width: screenWidth }]}
            resizeMode="center"
          />
        )}
      </TouchableOpacity>
    );
  };

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(scrollPosition / screenWidth);
    // Update the index if necessary
    setActiveIndex(newIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={parsedMediaFiles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={parseInt(index)} // Start at the image corresponding to the passed index
        getItemLayout={(data, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })} // Improve performance by calculating item layout
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  imageBackground: {
    flex: 1,
  },
});

export default PostFullView;
