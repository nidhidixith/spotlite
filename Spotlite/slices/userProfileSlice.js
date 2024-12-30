import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import instance from "../api";

const userProfileAdapter = createEntityAdapter();

const otherUserProfileAdapter = createEntityAdapter();

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
};

export const fetchUserProfile = createAsyncThunk(
  "userProfile/fetchUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/get-user-profile/");
      console.log("Fetched profile:");
      console.log(response.data);
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
      const response = await instance.get(`/get-other-user-profile/${userId}/`);
      // console.log(response.data);
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
      const response = await instance.post("/complete-profile/", profileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("I am here.......");
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editProfile = createAsyncThunk(
  "userProfile/editProfile",
  async (profileData, { rejectWithValue }) => {
    console.log("Redux state profile data:", profileData);
    try {
      const response = await instance.put("/edit-profile/", profileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
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
    // clearUserProfile: userProfileAdapter.removeAll,
    clearUserProfile: (state) => {
      userProfileAdapter.removeAll(state.userProfile);
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
        userProfileAdapter.upsertOne(state.userProfile, action.payload);
        state.userProfile.profileCompletionError = null;
      })
      .addCase(completeUserProfile.rejected, (state, action) => {
        state.userProfile.profileCompletionStatus = "failed";
        // state.userProfile.profileCompletionError = action.error.message;
        state.userProfile.profileCompletionError =
          action.payload || action.error.message;
        console.log(
          "Profile Completion Error:",
          state.userProfile.profileCompletionError
        );
      })

      .addCase(fetchUserProfile.pending, (state, action) => {
        state.userProfile.fetchProfileStatus = "loading";
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userProfile.fetchProfileStatus = "succeeded";
        userProfileAdapter.upsertOne(state.userProfile, action.payload);
        console.log(
          "User Profile from adapter:",
          userProfileAdapter.getSelectors().selectAll(state.userProfile)
        );
        state.userProfile.fetchProfileError = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.userProfile.fetchProfileStatus = "failed";
        state.userProfile.fetchProfileError = action.error.message;
        console.log(
          "Profile Fetch Error:",
          state.userProfile.fetchProfileError
        );
      })

      .addCase(fetchOtherUserProfile.pending, (state, action) => {
        state.otherUserProfile.fetchOtherProfileStatus = "loading";
      })
      .addCase(fetchOtherUserProfile.fulfilled, (state, action) => {
        state.otherUserProfile.fetchOtherProfileStatus = "succeeded";
        otherUserProfileAdapter.upsertOne(
          state.otherUserProfile,
          action.payload
        );
        // console.log(
        //   "User Profile from adapter:",
        //   userProfileAdapter.getSelectors().selectAll(state)
        // );
        state.otherUserProfile.fetchOtherProfileError = null;
      })
      .addCase(fetchOtherUserProfile.rejected, (state, action) => {
        state.otherUserProfile.fetchOtherProfileStatus = "failed";
        state.otherUserProfile.fetchOtherProfileError = action.error.message;
        console.log(
          "Profile Fetch Error:",
          state.otherUserProfile.fetchOtherProfileError
        );
      })

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
        console.log("Profile Edit Error:", state.userProfile.editProfileError);
      });
  },
});

export const { resetUserProfile, clearUserProfile, clearOtherUserProfile } =
  userProfileSlice.actions;

export default userProfileSlice.reducer;

export const {
  selectAll: selectUserProfile,
  // selectById: selectUserProfileById,
  // selectIds: selectUserProfileIds,
} = userProfileAdapter.getSelectors((state) => state.profile.userProfile);

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
