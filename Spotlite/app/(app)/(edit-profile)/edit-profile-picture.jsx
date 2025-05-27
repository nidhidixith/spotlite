import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import {
  selectUserProfile,
  editProfile,
} from "../../../slices/userProfileSlice";

import EvilIcons from "@expo/vector-icons/EvilIcons";
import defaultImage from "../../../assets/images/def.webp"; // Import default image
import LoadingIndicator from "../../../components/Others/LoadingIndicator";

import FontAwesome from "@expo/vector-icons/FontAwesome";

const EditProfilePicture = () => {
  const { handleSubmit } = useForm();
  const dispatch = useDispatch();
  const profile = useSelector(selectUserProfile);

  const [image, setImage] = useState(profile[0]?.profile_pic);
  const [fileName, setFileName] = useState(null);
  const [fileType, setFileType] = useState(null);

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
      }
    }
    return true;
  };

  const pickImage = async () => {
    const granted = await requestPermissions();
    if (!granted) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri, mimeType } = result.assets[0];
      setImage(uri);
      setFileName(uri.split("/").pop());
      setFileType(mimeType);
    }
  };

  const editProfileStatus = useSelector(
    (state) => state.profile.userProfile.editProfileStatus
  );

  const editProfileError = useSelector(
    (state) => state.profile.userProfile.editProfileError
  );

  if (editProfileStatus === "loading") {
    return <LoadingIndicator />;
  }
  const onSubmit = async () => {
    const profileData = new FormData();
    if (image !== defaultImage) {
      const fileExtension = fileName?.split(".").pop().toLowerCase();

      // Validate MIME type
      if (
        fileType !== "image/jpg" &&
        fileType !== "image/jpeg" &&
        fileType !== "image/png" &&
        fileType !== "image/webp"
      ) {
        alert(
          `${fileExtension} file type not supported. Check the Supported file types tip.`
        );
        return;
      }

      // Validate file extension
      const allowedExtensions = ["jpg", "jpeg", "png", "webp"];

      if (!allowedExtensions.includes(fileExtension)) {
        alert(
          `${fileExtension} file type not supported. Please check the Supported file types tip.`
        );
        return;
      }
      profileData.append("profile_pic", {
        uri: image,
        name: fileName,
        type: fileType,
      });
    } else {
      profileData.append("remove_profile_pic", true);
    }
    console.log(profileData);
    try {
      const response = await dispatch(editProfile(profileData)).unwrap();
      Alert.alert("Edit Successful");
      router.replace("(app)/(edit-profile)/edit-profile");
    } catch (err) {
      console.error("Request failed", err);
      console.log(err);

      const errorMessage =
        (typeof err === "string" && err) || // If `err` is a string, use it
        err?.message || // If `err` has a `message` property
        JSON.stringify(err) || // Convert `err` to string if it's an object
        "An unknown error occurred. Try again later"; // Fallback message

      Alert.alert("Edit Failed", errorMessage); // Pass string to Alert.alert
      // Alert.alert(editProfileError);
      router.replace("(app)/(edit-profile)/edit-profile");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: "white",
      }}
    >
      <View className="flex flex-row justify-between mb-4">
        <Text className="text-gray-800 font-semibold text-lg">
          Profile Picture
        </Text>

        <TouchableOpacity onPress={pickImage}>
          <Text className="text-base text-sky-600">Edit</Text>
        </TouchableOpacity>
      </View>

      {image ? (
        <Image
          className="w-[120px] h-[120px] rounded-full self-center mb-4"
          source={typeof image === "string" ? { uri: image } : image}
          resizeMode="cover"
        />
      ) : (
        <Image
          className="w-[120px] h-[120px] rounded-full self-center mb-4"
          source={defaultImage}
          resizeMode="cover"
        />
      )}

      <Text className="text-xs text-gray-500 mb-2">
        Supported types: JPG, JPEG, PNG, WEBP
      </Text>

      <TouchableOpacity
        className="flex flex-row items-center"
        onPress={() => setImage(defaultImage)}
      >
        <FontAwesome name="trash-o" size={16} color="#ef4444" marginRight={5} />
        <Text className="text-red-500 text-sm">Remove Profile Picture</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={`border border-sky-600 bg-sky-600 rounded-lg p-1 mt-6
                    ${image === profile[0]?.profile_pic ? "opacity-50" : ""}`}
        onPress={handleSubmit(onSubmit)}
        disabled={image === profile[0]?.profile_pic} // Disable when there's no change
      >
        <Text className=" text-base text-white self-center font-medium">
          Save
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfilePicture;
