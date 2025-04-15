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
  ActivityIndicator,
} from "react-native";

import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import { addNewEvent } from "../../../slices/eventsSlice";

import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useToast } from "../../../contexts/ToastContext";

const CreateEvent = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm();

  const dispatch = useDispatch();

  const { showToast } = useToast();

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
    setEventDate(selectedEventDate);
  };

  // Function to handle time change
  const onEventTimeChange = (event, selectedEventTime) => {
    const currentEventTime = selectedEventTime || eventTime;
    setShowTimePicker(false);
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

  const addEventStatus = useSelector((state) => state.event.addEventStatus);

  if (addEventStatus === "loading") {
    // Show Activity Indicator while loading
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0284c7" />
      </View>
    );
  }

  const onSubmit = async (data) => {
    const eventData = new FormData();

    eventData.append("event_title", data.event_title);
    eventData.append("event_domain", data.event_domain);
    eventData.append("event_description", data.event_description);

    if (data.event_date) {
      eventData.append("event_date", data.event_date);
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

    try {
      const response = await dispatch(addNewEvent(eventData)).unwrap();

      // Alert.alert("Event created successfully");
      showToast("Event created successfully!", "success");

      // Reset the form after successful submission
      // Manually reset form fields
      setValue("event_title", "");
      setValue("event_domain", "");
      setValue("event_description", "");
      setValue("event_location", "");
      setValue("event_link", "");
      setValue("event_date", "");
      setEventTime(null);
      setMediaFiles({});

      router.push("(app)/(display-events)/display-user-events");
    } catch (err) {
      // console.error("Failed to save the event: ", err);
      // Alert.alert("Failed to create event");
      const errorMessage =
        (typeof err === "string" && err) || // If `err` is a string, use it
        err?.message || // If `err` has a `message` property
        JSON.stringify(err) || // Convert `err` to string if it's an object
        "An unexpected error occurred.";

      // Add "Please register again" to the error message
      const finalErrorMessage = `${errorMessage} Please try again.`;
      Alert.alert("Error", finalErrorMessage);
      // router.push("(app)/(tabs)/home");
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
        <View className="px-4 py-2">
          <View className="mb-3">
            <Text className="mb-2 font-semibold text-sm text-gray-600">
              Event Title *
            </Text>
            <Controller
              control={control}
              rules={{
                required: "This field is required",
                maxLength: {
                  value: 150,
                  message: "Maximum 150 characters allowed",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm focus:border-sky-500"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Add a suitable title for the event"
                  placeholderTextColor="#9CA3AF"
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
            <Text className="mb-2 font-semibold text-sm text-gray-600">
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
                  className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm focus:border-sky-500"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Singing/Dancing/Cooking/Painting/Photography..."
                  placeholderTextColor="#9CA3AF"
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
            <Text className="mb-2 font-semibold text-sm text-gray-600">
              Event Description *
            </Text>
            <Controller
              control={control}
              rules={{
                required: "This field is required",
                maxLength: {
                  value: 5000,
                  message: "Maximum 5000 characters allowed",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  multiline
                  numberOfLines={6}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm focus:border-sky-500"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Online/Offline, Topics, participants, purpose, Contact Info..."
                  scrollEnabled
                  style={{ textAlignVertical: "top" }}
                  placeholderTextColor="#9CA3AF"
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
            <Text className="mb-2 font-semibold text-sm text-gray-600">
              Event Date
            </Text>

            <Controller
              control={control}
              name="event_date"
              rules={{
                validate: (value) => {
                  const selectedDate = new Date(value);
                  const currentDate = new Date();

                  // Reset the time part of both dates to compare only the date
                  currentDate.setHours(0, 0, 0, 0);
                  selectedDate.setHours(0, 0, 0, 0);

                  if (selectedDate < currentDate) {
                    return "Event date cannot be in the past";
                  }
                  return true; // Validation passed
                },
              }}
              render={({ field: { onChange, value } }) => (
                <>
                  <TouchableOpacity
                    className="flex flex-row items-center border border-gray-200 rounded-lg px-3 py-3 focus:border-sky-500"
                    onPress={showDatepickerHandler}
                  >
                    <Text
                      className={`text-sm flex-1 ${
                        value ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {value
                        ? new Date(value).toLocaleDateString()
                        : "Select Date"}
                    </Text>
                    <AntDesign name="calendar" size={16} color="black" />
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      testID="datePicker"
                      value={value ? new Date(value) : new Date()}
                      mode="date"
                      display="default"
                      onChange={(event, selectedDate) => {
                        const currentDate = selectedDate || value;
                        setShowDatePicker(false);

                        // Format the date as YYYY-MM-DD before sending it to the backend
                        const formattedDate = currentDate
                          ? `${currentDate.getFullYear()}-${(
                              currentDate.getMonth() + 1
                            )
                              .toString()
                              .padStart(2, "0")}-${currentDate
                              .getDate()
                              .toString()
                              .padStart(2, "0")}`
                          : "";

                        onChange(formattedDate); // Set the formatted date
                      }}
                    />
                  )}
                </>
              )}
            />
            {errors.event_date && (
              <Text className="text-red-500 mt-1">
                {errors.event_date.message}
              </Text>
            )}
          </View>

          <View className="mb-3">
            <Text className="mb-2 font-semibold text-sm text-gray-600">
              Event Time
            </Text>

            <View className="flex flex-row justify-between gap-4">
              <View className="flex flex-row items-center flex-1">
                {/* <Text className="text-[14px] mr-2">From</Text> */}
                <View className="flex-1">
                  <TouchableOpacity
                    className="flex flex-row items-center border border-gray-200 rounded-lg px-3 py-3 focus:border-sky-500"
                    onPress={showTimepickerHandler}
                  >
                    <Text
                      className={`text-sm flex-1 ${
                        eventTime ? "text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {eventTime
                        ? eventTime.toLocaleTimeString()
                        : "Select Time"}
                    </Text>
                    <AntDesign name="clockcircleo" size={16} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View className="mb-3">
            <Text className="mb-2 font-semibold text-sm text-gray-600">
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
                  className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm focus:border-sky-500"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Add event location"
                  placeholderTextColor="#9CA3AF"
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
            <Text className="mb-2 font-semibold text-sm text-gray-600">
              Event Link
            </Text>
            <Controller
              control={control}
              rules={{
                validate: isValidUrl,
                maxLength: {
                  value: 200,
                  message: "Maximum 200 characters allowed",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  className="rounded-lg border border-gray-200 px-3 py-2 text-gray-900 text-sm focus:border-sky-500"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Add Event link"
                  placeholderTextColor="#9CA3AF"
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
          <Text className="text-sm italic text-sky-600">
            * Mandatory fields
          </Text>
        </View>

        <TouchableOpacity
          className="flex flex-row flex-wrap items-center border border-gray-200 px-2 py-3"
          onPress={pickImage}
          activeOpacity={0.6}
        >
          <View className="mr-1 px-1">
            <MaterialIcons name="photo-library" size={22} color="#2AAA8A" />
          </View>
          <Text className={`text-base text-gray-800 mr-2`}>Photo/Video</Text>
          {Object.keys(mediaFiles).length > 0 && (
            <Text className="text-sky-600 text-sm">
              {Object.keys(mediaFiles).length} files selected
            </Text>
          )}
        </TouchableOpacity>

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
          className={`bg-sky-600  self-end px-4 py-2 m-2 rounded-lg ${
            isDirty ? "" : "opacity-50"
          }`}
          onPress={handleSubmit(onSubmit)}
          disabled={!isDirty}
        >
          <Text className=" text-white text-sm font-medium">Post</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CreateEvent;
