import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";

const AboutPage = () => {
  return (
    <ScrollView className="flex-1 bg-white p-2">
      {/* Header Section */}

      {/* <Text className="text-sky-600 text-xl font-bold text-center">
          About Spotlite
        </Text> */}
      <Text className="text-xl mb-2 mt-4 text-sky-600 font-bold text-center">
        About Spotlite
      </Text>

      {/* Content Section */}
      <View className="px-4 py-3">
        {/* Main Text */}
        <Text className="text-gray-800 text-sm  mb-4 text-justify">
          Welcome to <Text className="font-bold">Spotlite</Text>, the ultimate
          platform for artists, content creators, and influencers to shine.
          Spotlite is designed to celebrate you—your art, your passion, and your
          journey—by showcasing what truly defines you. Here, you can craft a
          profile that highlights who you are, your interests, creative works,
          and links to your other social platforms.
        </Text>

        <Text className="text-gray-800 text-sm text-justify">
          Our platform encourages authentic and original content, shining a
          light on real creativity. Whether you’re an emerging artist, a
          seasoned content creator, or an inspiring influencer, Spotlite gives
          you the space to connect, share, and grow. Build your network, share
          your stories, create posts and events, and inspire others while being
          inspired yourself.
        </Text>

        {/* Highlighted Section */}
        <View className="bg-sky-50 p-4 mt-4 rounded-md">
          <Text className="text-gray-800 text-sm text-justify">
            At Spotlite, we believe in empowering creators to take center stage
            because{" "}
            <Text className="text-gray-800 text-sm font-bold">
              your art deserves to be seen
            </Text>
            , your voice deserves to be heard, and your journey deserves to be
            celebrated.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AboutPage;
