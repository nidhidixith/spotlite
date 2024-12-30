import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  Button,
  Alert,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AntDesign from "@expo/vector-icons/AntDesign";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { addNewEvent } from "../../../slices/eventsSlice";

const CreateEvent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const dispatch = useDispatch();
  const [mediaFiles, setMediaFiles] = useState({});

  // State for date picker
  const [eventDate, setEventDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // State for time picker
  const [eventTime, setEventTime] = useState(null);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Function to handle date change
  const onEventDateChange = (event, selectedEventDate) => {
    const currentEventDate = selectedEventDate || eventDate;
    setShowDatePicker(false);
    // const formattedEventDate = currentEventDate
    //   ? `${currentEventDate.getFullYear()}-${(currentEventDate.getMonth() + 1)
    //       .toString()
    //       .padStart(2, "0")}-${currentEventDate
    //       .getDate()
    //       .toString()
    //       .padStart(2, "0")}`
    //   : "";
    setEventDate(selectedEventDate);
  };

  // Function to handle time change
  const onEventTimeChange = (event, selectedEventTime) => {
    const currentEventTime = selectedEventTime || eventTime;
    setShowTimePicker(false);
    // const formattedEventTime = currentEventTime
    //   ? `${currentEventTime
    //       .getHours()
    //       .toString()
    //       .padStart(2, "0")}:${currentEventTime
    //       .getMinutes()
    //       .toString()
    //       .padStart(2, "0")}:${currentEventTime
    //       .getSeconds()
    //       .toString()
    //       .padStart(2, "0")}`
    //   : "";
    setEventTime(selectedEventTime);
  };

  // Function to show date picker
  const showDatepickerHandler = () => {
    setShowDatePicker(true);
  };

  // Function to show time picker
  const showTimepickerHandler = () => {
    setShowTimePicker(true);
  };

  const onSubmit = async (data) => {
    // console.log(data);
    const eventData = new FormData();

    eventData.append("event_title", data.event_title);
    eventData.append("event_domain", data.event_domain);
    eventData.append("event_description", data.event_description);

    if (eventDate) {
      const formattedEventDate = eventDate
        ? `${eventDate.getFullYear()}-${(eventDate.getMonth() + 1)
            .toString()
            .padStart(2, "0")}-${eventDate
            .getDate()
            .toString()
            .padStart(2, "0")}`
        : "";
      eventData.append("event_date", formattedEventDate);
    }

    if (eventTime) {
      const formattedEventTime = eventTime
        ? `${eventTime.getHours().toString().padStart(2, "0")}:${eventTime
            .getMinutes()
            .toString()
            .padStart(2, "0")}:${eventTime
            .getSeconds()
            .toString()
            .padStart(2, "0")}`
        : "";
      eventData.append("event_time", formattedEventTime);
    }

    if (data.event_location) {
      eventData.append("event_location", data.event_location);
    }
    if (data.event_link) {
      eventData.append("event_link", data.event_link);
    }

    if (Object.keys(mediaFiles).length > 0) {
      mediaFiles.forEach((file) => {
        eventData.append("uploaded_files", file);
      });
    }
    console.log("Event data:", eventData);

    try {
      const response = await dispatch(addNewEvent(eventData)).unwrap();
      // setText("");
      // setMediaFiles({});
      Alert.alert("Event created successfully");
      router.push("(app)/(tabs)/home");
    } catch (err) {
      console.error("Failed to save the event: ", err);
      Alert.alert("Failed to create event");
      router.push("(app)/(tabs)/home");
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

  const isValidUrl = (url) => {
    if (!url) return true; // Allow empty input
    const regex = /^https:\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url) || "Invalid URL format (must start with https://)";
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="p-3">
          <View className="mb-3">
            <Text className="mb-2 font-semibold text-[16px]">
              Event Title *
            </Text>
            <Controller
              control={control}
              rules={{
                required: "This field is required",
                maxLength: {
                  value: 100,
                  message: "Maximum 100 characters allowed",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="rounded-lg border border-gray-200 p-2"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Add a suitable title for the event"
                />
              )}
              name="event_title"
            />
            {errors.event_title && (
              <Text className="text-red-500 mb-2">
                {errors.event_title.message}
              </Text>
            )}
          </View>

          <View className="mb-3">
            <Text className="mb-2 font-semibold text-[16px]">
              Event Domain *
            </Text>
            <Controller
              control={control}
              rules={{
                required: "This field is required",
                maxLength: {
                  value: 100,
                  message: "Maximum 100 characters allowed",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="rounded-lg border border-gray-200 p-2"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Singing/Dancing/Cooking/Painting/Photography..."
                />
              )}
              name="event_domain"
            />
            {errors.event_domain && (
              <Text className="text-red-500 mb-2">
                {errors.event_domain.message}
              </Text>
            )}
          </View>

          <View className="mb-3">
            <Text className="mb-2 font-semibold text-[16px]">
              Event Description *
            </Text>
            <Controller
              control={control}
              rules={{
                required: "This field is required",
                maxLength: {
                  value: 4000,
                  message: "Maximum 4000 characters allowed",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  multiline
                  numberOfLines={6}
                  className="p-2 border border-gray-200 rounded-lg"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Online/Offline, Topics, participants, purpose, Contact Info..."
                  scrollEnabled
                  style={{ textAlignVertical: "top" }}
                />
              )}
              name="event_description"
            />
            {errors.event_description && (
              <Text className="text-red-500 mb-2">
                {errors.event_description.message}
              </Text>
            )}
          </View>

          <View className="mb-3">
            <Text className="mb-2 font-semibold text-[16px]">Event Date</Text>
            <View className="flex flex-row justify-between gap-4">
              <View className="flex flex-row items-center flex-1">
                <Text className="text-[14px] mr-2">From</Text>
                <View className="flex-1">
                  <TouchableOpacity
                    className="flex flex-row items-center border border-gray-300 rounded-lg px-2 py-2"
                    onPress={showDatepickerHandler}
                  >
                    <Text className="flex-1">
                      {eventDate
                        ? eventDate.toLocaleDateString()
                        : "Select Date"}
                      {/*{fromDate ? fromDate.toLocaleDateString() : "Select Date"}*/}
                      {/* {value
                        ? new Date(value).toLocaleDateString()
                        : "Select Date"} */}
                    </Text>
                    <AntDesign name="calendar" size={16} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View className="mb-3">
            <Text className="mb-2 font-semibold text-[16px]">Event Time</Text>

            <View className="flex flex-row justify-between gap-4">
              <View className="flex flex-row items-center flex-1">
                <Text className="text-[14px] mr-2">From</Text>
                <View className="flex-1">
                  <TouchableOpacity
                    className="flex flex-row items-center border border-gray-300 rounded-lg px-2 py-2"
                    onPress={showTimepickerHandler}
                  >
                    <Text className="flex-1">
                      {eventTime
                        ? eventTime.toLocaleTimeString()
                        : "Select Time"}
                      {/* {fromTime ? fromTime.toLocaleTimeString() : "Select Time"} */}
                    </Text>
                    <AntDesign name="clockcircleo" size={16} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View className="mb-3">
            <Text className="mb-2 font-semibold text-[16px]">
              Event Location
            </Text>
            <Controller
              control={control}
              rules={{
                maxLength: {
                  value: 200,
                  message: "Maximum 200 characters allowed",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="rounded-lg border border-gray-200 p-2"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Add event location"
                />
              )}
              name="event_location"
            />
            {errors.event_location && (
              <Text className="text-red-500 mb-2">
                {errors.event_location.message}
              </Text>
            )}
          </View>

          <View className="mb-3">
            <Text className="mb-2 font-semibold text-[16px]">Event Link</Text>
            <Controller
              control={control}
              rules={{
                validate: isValidUrl,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="rounded-lg border border-gray-200 p-2"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Add Event link"
                />
              )}
              name="event_link"
            />
            {errors.event_link && (
              <Text className="text-red-500 mb-2">
                {errors.event_link.message}
              </Text>
            )}
          </View>
          <Text className="text-sky-600">* Mandatory fields</Text>
        </View>

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

        {/* Date picker */}
        {showDatePicker && (
          <DateTimePicker
            testID="datePicker"
            // value={fromDate || new Date()} // Use a fallback for `null`
            // value={new Date(fromDate) || new Date()} // Use a fallback for `null`
            // value={fromDate}
            value={eventDate ? new Date(eventDate) : new Date()}
            mode="date"
            display="default"
            onChange={onEventDateChange}
          />
        )}

        {/* Time picker */}
        {showTimePicker && (
          <DateTimePicker
            testID="timePicker"
            value={eventTime ? new Date(eventTime) : new Date()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onEventTimeChange}
          />
        )}

        <TouchableOpacity
          className={`bg-sky-600 self-end px-3 py-2 m-2 rounded-lg ${
            isDirty ? "" : "opacity-50"
          }`}
          onPress={handleSubmit(onSubmit)}
          disabled={!isDirty}
        >
          <Text className="text-lg self-center font-semibold text-white">
            Post
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreateEvent;
