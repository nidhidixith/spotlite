import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { router } from "expo-router";

import {
  selectUserProfile,
  fetchQuestions,
  selectAllQuestions,
  createOrUpdateAnswers,
} from "../../../slices/userProfileSlice";

import LoadingIndicator from "../../../components/Others/LoadingIndicator";
import ErrorDisplayComponent from "../../../components/Others/ErrorDisplayComponent";

const EditQuestionsAndAnswers = () => {
  const profile = useSelector(selectUserProfile);
  const [answers, setAnswers] = useState({});

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm();

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      await dispatch(fetchQuestions()).unwrap(); // Fetch data and unwrap the result
    } catch (error) {
      console.error("Failed to fetch questions:", error); // Handle error
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const questions = useSelector(selectAllQuestions);

  const fetchQuestionsStatus = useSelector(
    (state) => state.profile.questions.fetchQuestionsStatus
  );

  const fetchQuestionsError = useSelector(
    (state) => state.profile.questions.fetchQuestionsError
  );

  const createAnswerStatus = useSelector(
    (state) => state.profile.answers.createAnswerStatus
  );

  const createAnswerError = useSelector(
    (state) => state.profile.answers.createAnswerError
  );

  if (fetchQuestionsStatus === "loading" || createAnswerStatus === "loading") {
    return <LoadingIndicator />;
  }

  if (fetchQuestionsError) {
    return <ErrorDisplayComponent />;
  }
  const handleAnswerChange = (questionId, text) => {
    setAnswers((prev) => ({ ...prev, [questionId]: text.trim() }));
  };

  const onSubmit = async () => {
    const formData = new FormData();

    Object.entries(answers).forEach(([questionId, answer]) => {
      formData.append("answers", JSON.stringify({ questionId, answer }));
    });

    try {
      const response = await dispatch(createOrUpdateAnswers(formData)).unwrap();
      setAnswers({});
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
      router.replace("(app)/(edit-profile)/edit-profile");
    }
  };

  return (
    <View className="flex-1 bg-white p-4">
      <FlatList
        data={questions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          // Find the answer for this question from profile.questions_and_answers
          const existingAnswer = profile[0]?.questions_and_answers?.find(
            (answer) => answer.question_id === item.id
          );

          return (
            <View className="bg-white p-4 rounded-lg shadow-sm">
              <Text className="text-lg font-semibold text-gray-800 mb-2">
                {item.text}
              </Text>
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700"
                    multiline={true} // Enables multiple lines
                    // textAlignVertical="top" // Ensures text starts from the top
                    defaultValue={
                      existingAnswer ? existingAnswer.answer_text : ""
                    }
                    onChangeText={(text) => handleAnswerChange(item.id, text)}
                    returnKeyType="default" // Configures the Enter key behavior
                    blurOnSubmit={false} // Prevents dismissing the keyboard
                  />
                )}
                name="answerInput"
              />
              {errors.answerInput && (
                <Text className="text-red-500 mb-2">
                  {errors.answerInput.message}
                </Text>
              )}
            </View>
          );
        }}
        ListHeaderComponent={
          <Text className="text-2xl font-bold text-center text-sky-600 mb-4">
            Q&A Form
          </Text>
        }
        ListFooterComponent={
          <TouchableOpacity
            className="bg-sky-600 py-1 rounded-lg mt-4"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white text-lg self-center font-semibold">
              Save
            </Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

export default EditQuestionsAndAnswers;
