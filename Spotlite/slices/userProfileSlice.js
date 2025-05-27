import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import instance from "../api";

const userProfileAdapter = createEntityAdapter();
const otherUserProfileAdapter = createEntityAdapter();
const questionsAdapter = createEntityAdapter();
const answersAdapter = createEntityAdapter();

const initialState = {
  userProfile: userProfileAdapter.getInitialState({
    profileCompletionStatus: "idle",
    profileCompletionError: null,

    fetchProfileStatus: "idle",
    fetchProfileError: null,

    editProfileStatus: "idle",
    editProfileError: null,

    deleteProfileStatus: "idle",
    deleteProfileError: null,
  }),

  otherUserProfile: otherUserProfileAdapter.getInitialState({
    fetchOtherProfileStatus: "idle",
    fetchOtherProfileError: null,
  }),

  questions: questionsAdapter.getInitialState({
    fetchQuestionsStatus: "idle",
    fetchQuestionsError: null,
  }),
  answers: answersAdapter.getInitialState({
    createAnswerStatus: "idle",
    createAnswerError: null,
  }),
};

export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      // const response = await instance.get("/get-user-profile/");
      const response = await instance.get("/profile/me/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOtherUserProfile = createAsyncThunk(
  "otherUserProfile/fetchOtherUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      // const response = await instance.get(`/get-other-user-profile/${userId}/`);
      const response = await instance.get(`/users/${userId}/profile/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const completeUserProfile = createAsyncThunk(
  "userProfile/completeUserProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      // const response = await instance.post("/complete-profile/", profileData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      const response = await instance.post("/profile/complete/", profileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async (_, { rejectWithValue }) => {
    try {
      // const response = await instance.get("/get-questions/");
      const response = await instance.get("/questions/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createOrUpdateAnswers = createAsyncThunk(
  "answers/createOrUpdateAnswers  ",
  async (answerData, { rejectWithValue }) => {
    try {
      // const response = await instance.post(
      //   "/create-or-update-answers/",
      //   answerData,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      const response = await instance.post("/answers/", answerData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editProfile = createAsyncThunk(
  "userProfile/editProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      // const response = await instance.put("/edit-profile/", profileData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      const response = await instance.put("/profile/", profileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const userProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetUserProfile(state) {
      return initialState;
    },
    clearUserProfile: (state) => {
      userProfileAdapter.removeAll(state.userProfile);
    },
    clearQuestions: (state) => {
      questionsAdapter.removeAll(state.questions);
    },
    clearAnswers: (state) => {
      answersAdapter.removeAll(state.answers);
    },
    clearOtherUserProfile: (state) => {
      otherUserProfileAdapter.removeAll(state.otherUserProfile);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(completeUserProfile.pending, (state, action) => {
        state.userProfile.profileCompletionStatus = "loading";
      })
      .addCase(completeUserProfile.fulfilled, (state, action) => {
        state.userProfile.profileCompletionStatus = "succeeded";
        // userProfileAdapter.upsertOne(state.userProfile, action.payload);
        state.userProfile.profileCompletionError = null;
      })
      .addCase(completeUserProfile.rejected, (state, action) => {
        state.userProfile.profileCompletionStatus = "failed";
        state.userProfile.profileCompletionError =
          action.payload || action.error.message;
      })

      // For logged-in user
      .addCase(fetchUserProfile.pending, (state, action) => {
        state.userProfile.fetchProfileStatus = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userProfile.fetchProfileStatus = "succeeded";
        userProfileAdapter.upsertOne(state.userProfile, action.payload);
        state.userProfile.fetchProfileError = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.userProfile.fetchProfileStatus = "failed";
        state.userProfile.fetchProfileError = action.error.message;
      })

      // For other user profile
      .addCase(fetchOtherUserProfile.pending, (state, action) => {
        state.otherUserProfile.fetchOtherProfileStatus = "loading";
      })
      .addCase(fetchOtherUserProfile.fulfilled, (state, action) => {
        state.otherUserProfile.fetchOtherProfileStatus = "succeeded";
        otherUserProfileAdapter.upsertOne(
          state.otherUserProfile,
          action.payload
        );
        state.otherUserProfile.fetchOtherProfileError = null;
      })
      .addCase(fetchOtherUserProfile.rejected, (state, action) => {
        state.otherUserProfile.fetchOtherProfileStatus = "failed";
        state.otherUserProfile.fetchOtherProfileError = action.error.message;
      })

      // Edit Profile
      .addCase(editProfile.pending, (state, action) => {
        state.userProfile.editProfileStatus = "loading";
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.userProfile.editProfileStatus = "succeeded";
        userProfileAdapter.upsertOne(state.userProfile, action.payload);
        state.userProfile.editProfileError = null;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.userProfile.editProfileStatus = "failed";
        state.userProfile.editProfileError = action.error.message;
      })

      // Fetch Questions
      .addCase(fetchQuestions.pending, (state, action) => {
        state.questions.fetchQuestionsStatus = "loading";
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions.fetchQuestionsStatus = "succeeded";
        questionsAdapter.upsertMany(state.questions, action.payload);
        state.questions.fetchQuestionsError = null;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.questions.fetchQuestionsStatus = "failed";
        state.questions.fetchQuestionsError =
          action.payload || action.error.message;
      })

      // Create answers
      .addCase(createOrUpdateAnswers.pending, (state, action) => {
        state.answers.createAnswerStatus = "loading";
      })
      .addCase(createOrUpdateAnswers.fulfilled, (state, action) => {
        state.answers.createAnswerStatus = "succeeded";
        // answersAdapter.upsertOne(state.answers, action.payload);
        state.answers.createAnswerError = null;
      })
      .addCase(createOrUpdateAnswers.rejected, (state, action) => {
        state.answers.createAnswerStatus = "failed";
        state.answers.createAnswerError =
          action.payload || action.error.message;
      });
  },
});

export const {
  resetUserProfile,
  clearUserProfile,
  clearOtherUserProfile,
  clearQuestions,
  clearAnswers,
} = userProfileSlice.actions;

export default userProfileSlice.reducer;

export const { selectAll: selectUserProfile } = userProfileAdapter.getSelectors(
  (state) => state.profile.userProfile
);

export const { selectAll: selectAllQuestions } = questionsAdapter.getSelectors(
  (state) => state.profile.questions
);

export const { selectAll: selectAllAnswers } = answersAdapter.getSelectors(
  (state) => state.profile.answers
);

export const {
  selectAll: selectAllOtherUserProfiles,
  selectById: selectOtherUserProfileById,
  selectIds: selectOtherUserProfileIds,
} = otherUserProfileAdapter.getSelectors(
  (state) => state.profile.otherUserProfile
);

export const selectProfileByUser = createSelector(
  [selectAllOtherUserProfiles, (state, userId) => userId],
  (profiles, userId) => profiles.filter((profile) => profile.user === userId)
);
