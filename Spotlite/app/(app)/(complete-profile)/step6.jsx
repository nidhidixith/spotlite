import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useForm } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";

const Step6 = ({ handlePrevStep, handleNextStep }) => {
  const { handleSubmit } = useForm();

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [fileType, setFileType] = useState(null);

  const onSubmit = () => {
    if (image) {
      const obj = {
        profile_pic: { uri: image, name: fileName, type: fileType },
      };
      handleNextStep(obj); // Pass the object containing profile_pic
    } else {
      handleNextStep({ profile_pic: null });
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
    console.log("here");
    const granted = await requestPermissions();

    if (!granted) {
      console.log("here1");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // allowsMultipleSelection: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setFileName(result.assets[0].uri.split("/").pop());
      setFileType(result.assets[0].mimeType);
    }
  };

  return (
    <>
      <Text className="text-2xl font-semibold text-center mb-5">
        Add Profile Picture
      </Text>

      <Text className="font-semibold text-base mb-5">
        Upload your Profile Picture
      </Text>

      <View className="flex flex-row flex-wrap items-center rounded-sm bg-gray-100 px-2 py-1">
        <TouchableOpacity
          className="bg-gray-300 mr-2 p-1 rounded-sm"
          onPress={pickImage}
        >
          <Text>Choose Photo</Text>
        </TouchableOpacity>
        {image ? <Text>{fileName}</Text> : <Text>No file chosen</Text>}
      </View>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text className="italic text-center">
        Choose an engaging photo that represents you well.
      </Text>

      <View className="flex flex-row justify-between gap-x-4 mt-5">
        <TouchableOpacity
          className="bg-sky-600 rounded-lg p-2 flex-1"
          onPress={handlePrevStep}
        >
          <Text className="text-white text-lg self-center">Prev</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-sky-600 rounded-lg p-2 flex-1"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white text-lg self-center">Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
    marginVertical: 20,
  },
});

export default Step6;
