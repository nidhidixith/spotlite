import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useSelector, useDispatch } from "react-redux";
import { router } from "expo-router";

import {
  selectUserProfile,
  editProfile,
} from "../../../slices/userProfileSlice";

import AntDesign from "@expo/vector-icons/AntDesign";
import LoadingIndicator from "../../../components/Others/LoadingIndicator";

const EditDetails = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const profile = useSelector(selectUserProfile);

  // Function to handle date change
  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  // Function to show date picker
  const showDatepickerHandler = () => {
    setShowDatePicker(true);
  };

  const isValidUrl = (url) => {
    if (!url) return true; // Allow empty input
    const regex = /^https:\/\/[^\s/$.?#].[^\s]*$/i;
    return regex.test(url) || "Invalid URL format (must start with https://)";
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

  const onSubmit = async (data) => {
    const profileData = new FormData();

    profileData.append("first_name", data.firstName);
    profileData.append("last_name", data.lastName);
    profileData.append("display_name", data.displayName);
    profileData.append("primary_interest", data.primary_interest);
    profileData.append("location", data.location);
    profileData.append("date_of_birth", data.dob);

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
        paddingVertical: 20,
        paddingHorizontal: 20,
        backgroundColor: "white",
      }}
    >
      <View className="mb-6">
        <Text className="text-gray-600 font-semibold text-base mb-1">
          {/* <Text className="mb-2 font-semibold text-sm text-gray-600"></Text> */}
          First name *
        </Text>
        <Controller
          control={control}
          defaultValue={profile[0]?.first_name || ""}
          rules={{
            required: "First name is required",
            maxLength: {
              value: 10,
              message: "Maximum 10 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border-b-2 border-gray-200 text-gray-900 text-sm focus:border-sky-500"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="firstName"
        />
        {errors.firstName && (
          <Text className="text-red-500 mt-1">{errors.firstName.message}</Text>
        )}
      </View>

      <View className="mb-6">
        <Text className="text-gray-600 font-semibold text-base mb-1">
          Last name *
        </Text>
        <Controller
          control={control}
          defaultValue={profile[0]?.last_name || ""}
          rules={{
            required: "Last name is required",
            maxLength: {
              value: 10,
              message: "Maximum 10 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border-b-2 border-gray-200 text-gray-900 text-sm focus:border-sky-500"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="lastName"
        />
        {errors.lastName && (
          <Text className="text-red-500 mt-1">{errors.lastName.message}</Text>
        )}
      </View>

      <View className="mb-6">
        <Text className="text-gray-600 font-semibold text-base mb-1">
          Display name *
        </Text>
        <Controller
          control={control}
          defaultValue={profile[0]?.display_name || ""}
          rules={{
            required: "Display Name is required",
            maxLength: {
              value: 20,
              message: "Maximum 20 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border-b-2 border-gray-200 text-gray-900 text-sm focus:border-sky-500"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="displayName"
        />
        {errors.displayName && (
          <Text className="text-red-500 mt-1">
            {errors.displayName.message}
          </Text>
        )}
      </View>

      <View className="mb-6">
        <Text className="text-gray-600 font-semibold text-base mb-1">
          Primary Interest/Profession *
        </Text>
        <Controller
          control={control}
          defaultValue={profile[0]?.primary_interest || ""}
          rules={{
            required: "This field is required",
            maxLength: {
              value: 50,
              message: "Maximum 50 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border-b-2 border-gray-200 text-gray-900 text-sm focus:border-sky-500"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="primary_interest"
        />
        {errors.primary_interest && (
          <Text className="text-red-500 mt-1">
            {errors.primary_interest.message}
          </Text>
        )}
      </View>

      <View className="mb-6">
        <Text className="text-gray-600 font-semibold text-base mb-1">
          Location (Optional)
        </Text>
        <Controller
          control={control}
          defaultValue={profile[0]?.location || ""}
          rules={{
            maxLength: {
              value: 200,
              message: "Maximum 200 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="border-b-2 border-gray-200 text-gray-900 text-sm focus:border-sky-500"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="location"
        />
        {errors.location && (
          <Text className="text-red-500 mt-1">{errors.location.message}</Text>
        )}
      </View>

      <View className="">
        <Text className="text-gray-600 font-semibold text-base">
          Date of birth *
        </Text>
        <Controller
          control={control}
          defaultValue={profile[0]?.date_of_birth || ""}
          name="dob"
          rules={{
            required: "Date of birth is required",
            validate: (value) => {
              const selectedDate = new Date(value);
              const currentDate = new Date();

              // Reset the time part of both dates to compare only the date
              currentDate.setHours(0, 0, 0, 0);
              selectedDate.setHours(0, 0, 0, 0);

              if (selectedDate > currentDate) {
                return "Date of birth cannot be in the future";
              }
              return true; // Validation passed
            },
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                className="flex flex-row items-center border-b-2 border-gray-200 py-2"
                onPress={showDatepickerHandler}
              >
                <Text className="flex-1 text-gray-900 text-sm">
                  {/* className="border-b border-gray-200 text-gray-900 text-sm focus:border-sky-500" */}

                  {value ? new Date(value).toLocaleDateString() : "Select Date"}
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
        {errors.dob && (
          <Text className="text-red-500 mt-1">{errors.dob.message}</Text>
        )}
      </View>

      <Text className="text-sm italic text-sky-600 mt-2">
        * Mandatory fields
      </Text>

      <TouchableOpacity
        className={`border border-sky-600 bg-sky-600 rounded-lg p-1 mt-6 ${
          isDirty ? "" : "opacity-50"
        }`}
        onPress={handleSubmit(onSubmit)}
        disabled={!isDirty}
      >
        <Text className="text-base text-white self-center font-medium">
          Save
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditDetails;
