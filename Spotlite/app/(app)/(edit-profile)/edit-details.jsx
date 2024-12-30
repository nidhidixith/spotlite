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
import AntDesign from "@expo/vector-icons/AntDesign";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserProfile,
  editProfile,
} from "../../../slices/userProfileSlice";
import { router } from "expo-router";

const EditDetails = () => {
  // const initialDisplayName = profile?.[0]?.display_name || "";
  // const initialPrimaryInterest = profile?.[0]?.primary_interest || "";
  // const initialLocation = profile?.[0]?.location || "";
  // const initialDob = profile?.[0]?.date_of_birth || "";

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

  const onSubmit = async (data) => {
    console.log(data);
    const profileData = new FormData();

    profileData.append("display_name", data.displayName);
    profileData.append("primary_interest", data.primary_interest);
    profileData.append("location", data.location);
    profileData.append("date_of_birth", data.dob);

    console.log("Profile data from edit details", profileData);
    try {
      const response = await dispatch(editProfile(profileData)).unwrap();
      Alert.alert("Edit Successful");
      router.push("(app)/(tabs)/home");
    } catch (err) {
      console.error("Request failed", err);
      Alert.alert("Request failed, Please try again later");
      // Alert.alert(editProfileError);
      router.push("(app)/(tabs)/home");
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
        <Text className="text-lg font-bold mb-1">Display name *</Text>
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
              className="border-b-2 border-gray-200"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="displayName"
        />
        {errors.displayName && (
          <Text className="text-red-500 mb-2">
            {errors.displayName.message}
          </Text>
        )}
      </View>

      <View className="mb-6">
        <Text className="text-lg font-bold mb-1">
          Primary Interest/Profession
        </Text>
        <Controller
          control={control}
          defaultValue={profile[0]?.primary_interest || ""}
          rules={{
            required: "This field is required",
            maxLength: {
              value: 100,
              message: "Maximum 100 characters allowed",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className=" border-b-2 border-gray-200"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="primary_interest"
        />
        {errors.primary_interest && (
          <Text className="text-red-500 mb-2">
            {errors.primary_interest.message}
          </Text>
        )}
      </View>

      <View className="mb-6">
        <Text className="text-lg font-bold mb-1">Location (Optional)</Text>
        <Controller
          control={control}
          defaultValue={profile[0]?.location || ""}
          rules={{
            validate: isValidUrl,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className=" border-b-2 border-gray-200"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="location"
        />
        {errors.location && (
          <Text className="text-red-500 mb-2">{errors.location.message}</Text>
        )}
      </View>

      <View className="mb-3">
        <Text className="text-lg font-bold mb-1">Date of birth *</Text>
        <Controller
          control={control}
          defaultValue={profile[0]?.date_of_birth || ""}
          name="dob"
          rules={{
            required: "Date of birth is required",
            // validate: isValidDate,
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                className="flex flex-row items-center border-b-2 border-gray-200  py-2"
                onPress={showDatepickerHandler}
              >
                <Text className="flex-1">
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
                  // onChange={(event, selectedDate) => {
                  //   const currentDate = selectedDate || value;
                  //   setShowDatePicker(false);
                  //   onChange(currentDate);
                  // }}
                />
              )}
            </>
          )}
        />
        {errors.dob && (
          <Text className="text-red-500 mb-2">{errors.dob.message}</Text>
        )}
      </View>

      <TouchableOpacity
        className={`bg-sky-600 py-1 rounded-lg mt-6 ${
          isDirty ? "" : "opacity-50"
        }`}
        onPress={handleSubmit(onSubmit)}
        disabled={!isDirty}
      >
        <Text className="text-lg self-center font-semibold text-white">
          Save
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditDetails;
