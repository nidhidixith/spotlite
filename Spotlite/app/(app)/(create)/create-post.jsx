import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { useDispatch, useSelector } from "react-redux";

import { addNewPost } from "../../../slices/postsSlice";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const CreatePost = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const [text, setText] = useState("");

  const [mediaFiles, setMediaFiles] = useState({});

  // Check if mediaFiles has any keys (indicating at least one image is present)
  const canSave =
    (text.trim() || Object.keys(mediaFiles).length > 0) &&
    addRequestStatus !== "pending";

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        const response = await dispatch(
          addNewPost({ text, mediaFiles })
        ).unwrap();
        setText("");
        setMediaFiles({});
        Alert.alert("Post successful");
        router.push("(app)/(tabs)/home");
      } catch (err) {
        console.error("Failed to save the post: ", err);
        Alert.alert("Failed to create post");
        router.push("(app)/(tabs)/home");
      } finally {
        setAddRequestStatus("idle");
      }
    }
  };

  const requestPermissions = async () => {
    if (Platform.OS !== "web") {
      const libraryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();

      if (
        libraryStatus.status !== "granted" ||
        cameraStatus.status !== "granted"
      ) {
        alert(
          "Sorry, we need camera and media library permissions to make this work! Please enable them from the app settings."
        );
        return false;
      } else {
        return true;
      }
    }
    return true;
  };

  const pickImage = async () => {
    const granted = await requestPermissions();

    if (!granted) {
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      allowsMultipleSelection: true,
      selectionLimit: 5,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => ({
        uri: asset.uri,
        name: asset.uri.split("/").pop(),
        type: asset.mimeType,
      }));

      console.log("Images:", selectedImages);
      setMediaFiles(selectedImages);
    }
  };
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <View className="flex-1">
          <TextInput
            multiline
            className="p-2 flex-1 text-base"
            placeholder="What's on your mind?"
            scrollEnabled
            style={{ textAlignVertical: "top" }}
            name="text"
            value={text}
            onChangeText={setText}
            maxLength={1000}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        className="flex flex-row flex-wrap items-center border border-gray-200 px-2 py-3"
        onPress={pickImage}
        activeOpacity={0.6}
      >
        <View className="mr-1 px-1">
          <MaterialIcons name="photo-library" size={24} color="#2AAA8A" />
        </View>
        <Text className={`text-base mr-2`}>Photo/Video</Text>
        {Object.keys(mediaFiles).length > 0 && (
          <Text className="text-button-primary">
            {Object.keys(mediaFiles).length} files selected
          </Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        className={`bg-sky-600 self-end px-3 py-2 m-2 rounded-lg ${
          canSave ? "" : "opacity-50"
        }`}
        onPress={onSavePostClicked}
        disabled={!canSave}
      >
        <Text className="text-white font-regular">Post</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreatePost;