import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import instance from "../api";

const userConnectionsAdapter = createEntityAdapter();

const userFollowersAdapter = createEntityAdapter();
const userFollowingAdapter = createEntityAdapter();

const otherUserFollowersAdapter = createEntityAdapter();
const otherUserFollowingAdapter = createEntityAdapter();

// Define initial states
const initialState = {
  userConnections: userConnectionsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  userFollowers: userFollowersAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  userFollowing: userFollowingAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  otherUserFollowers: otherUserFollowersAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  otherUserFollowing: otherUserFollowingAdapter.getInitialState({
    loading: false,
    error: null,
  }),
};

export const fetchUserFollowersList = createAsyncThunk(
  "userFollowers/fetchUserFollowersList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/connections/get-followers-list/`);
      console.log(response.data);
      console.log("Fetched followers data", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserFollowingList = createAsyncThunk(
  "userFollowing/fetchUserFollowingList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get(`/connections/get-following-list/`);
      console.log("Following List from slice:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOtherUserFollowersList = createAsyncThunk(
  "otherUserFollowers/fetchOtherUserFollowersList",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/connections/get-others-followers-list/${userId}/`
      );
      console.log(response.data);
      console.log("Fetched followers data", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchOtherUserFollowingList = createAsyncThunk(
  "otherUserFollowing/fetchOtherUserFollowingList",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await instance.get(
        `/connections/get-others-following-list/${userId}/`
      );
      console.log("Following List from slice:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const follow = createAsyncThunk(
  "userConnections/follow",
  async ({ userId }, { rejectWithValue }) => {
    console.log("I am here in follow");
    try {
      const response = await instance.post(
        `/connections/follow/${userId}/`,
        null,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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

export const unfollow = createAsyncThunk(
  "userConnections/unfollow",
  async ({ userId }, { rejectWithValue }) => {
    console.log("I am here in unfollow");

    try {
      const response = await instance.delete(
        `/connections/unfollow/${userId}/`,
        null,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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

const userConnectionsSlice = createSlice({
  name: "userConnection",
  initialState,
  reducers: {
    resetUserConnections(state) {
      return initialState;
    },
    clearFollowers: userFollowersAdapter.removeAll,
    clearFollowing: userFollowingAdapter.removeAll,

    clearUserConnections: (state) => {
      userConnectionsAdapter.removeAll(state.userConnections);
    },
    clearUserFollowers: (state) => {
      userFollowersAdapter.removeAll(state.userFollowers);
    },
    clearUserFollowing: (state) => {
      userFollowingAdapter.removeAll(state.userFollowing);
    },
    clearOtherUserFollowers: (state) => {
      otherUserFollowersAdapter.removeAll(state.otherUserFollowers);
    },
    clearOtherUserFollowing: (state) => {
      otherUserFollowingAdapter.removeAll(state.otherUserFollowing);
    },
  },
  extraReducers(builder) {
    builder
      // .addCase(fetchFollowersFollowing.pending, (state, action) => {
      //   state.fetchFollowersFollowingStatus = "loading";
      // })
      // .addCase(fetchFollowersFollowing.fulfilled, (state, action) => {
      //   state.fetchFollowersFollowingStatus = "succeeded";
      //   console.log("Action Payload:", action.payload); // Check the actual data returned
      //   userConnectionsAdapter.upsertOne(state, action.payload);
      //   console.log("i am in slice");
      //   console.log(
      //     "Connections from adapter:",
      //     userConnectionsAdapter.getSelectors().selectAll(state)
      //   );
      //   state.fetchFollowersFollowingError = null;
      // })
      // .addCase(fetchFollowersFollowing.rejected, (state, action) => {
      //   state.fetchFollowersFollowingStatus = "failed";
      //   state.fetchFollowersFollowingError = action.error.message;
      //   console.log("Fetch Error:", state.fetchFollowersFollowingError);
      // })

      .addCase(follow.pending, (state, action) => {
        // state.followStatus = "loading";
      })
      .addCase(follow.fulfilled, (state, action) => {
        // state.followStatus = "succeeded";
        // userConnectionsAdapter.upsertOne(state, action.payload);
        // state.followError = null;
      })
      .addCase(follow.rejected, (state, action) => {
        // state.followStatus = "failed";
        // state.followError = action.error.message;
        // console.log("Follow Error:", state.followError);
      })

      .addCase(unfollow.pending, (state, action) => {
        // state.unFollowStatus = "loading";
      })
      .addCase(unfollow.fulfilled, (state, action) => {
        // state.unFollowStatus = "succeeded";
        // userConnectionsAdapter.setOne(state, action.payload);
        // console.log(
        //   "Following list from adapter:",
        //   userConnectionsAdapter.getSelectors().selectAll(state)
        // );
        // state.unFollowError = null;
      })
      .addCase(unfollow.rejected, (state, action) => {
        // state.unFollowStatus = "failed";
        // state.unFollowError = action.error.message;
        // console.log("UnFollow Error:", state.unFollowError);
      })

      // For Logged-in user
      .addCase(fetchUserFollowersList.pending, (state, action) => {
        state.userFollowers.loading = true;
        state.userFollowers.error = null;
      })
      .addCase(fetchUserFollowersList.fulfilled, (state, action) => {
        state.userFollowers.loading = false;
        userFollowersAdapter.upsertMany(state.userFollowers, action.payload);
      })
      .addCase(fetchUserFollowersList.rejected, (state, action) => {
        state.userFollowers.loading = false;
        state.userFollowers.error = action.error.message;
      })

      .addCase(fetchUserFollowingList.pending, (state, action) => {
        state.userFollowing.loading = true;
        state.userFollowing.error = null;
      })
      .addCase(fetchUserFollowingList.fulfilled, (state, action) => {
        state.userFollowing.loading = false;
        userFollowingAdapter.upsertMany(state.userFollowing, action.payload);
      })
      .addCase(fetchUserFollowingList.rejected, (state, action) => {
        state.userFollowing.loading = false;
        state.userFollowing.error = action.error.message;
      })

      // For other users
      .addCase(fetchOtherUserFollowersList.pending, (state, action) => {
        state.otherUserFollowers.loading = true;
        state.otherUserFollowers.error = null;
      })
      .addCase(fetchOtherUserFollowersList.fulfilled, (state, action) => {
        state.otherUserFollowers.loading = false;
        otherUserFollowersAdapter.setAll(
          state.otherUserFollowers,
          action.payload
        );
      })
      .addCase(fetchOtherUserFollowersList.rejected, (state, action) => {
        state.otherUserFollowers.loading = false;
        state.otherUserFollowers.error = action.error.message;
      })

      .addCase(fetchOtherUserFollowingList.pending, (state, action) => {
        state.otherUserFollowing.loading = true;
        state.otherUserFollowing.error = null;
      })
      .addCase(fetchOtherUserFollowingList.fulfilled, (state, action) => {
        state.userFollowing.loading = false;
        otherUserFollowingAdapter.setAll(
          state.otherUserFollowing,
          action.payload
        );
      })
      .addCase(fetchOtherUserFollowingList.rejected, (state, action) => {
        state.otherUserFollowing.loading = false;
        state.otherUserFollowing.error = action.error.message;
      });
  },
});

export const {
  resetUserConnections,
  clearUserConnections,
  clearUserFollowers,
  clearUserFollowing,
  clearOtherUserFollowers,
  clearOtherUserFollowing,
} = userConnectionsSlice.actions;

export default userConnectionsSlice.reducer;

export const {
  selectAll: selectAllConnections,
  selectById: selectConnectionById,
  selectIds: selectConnectionIds,
} = userConnectionsAdapter.getSelectors(
  (state) => state.userConnection.userConnections
);

export const {
  selectAll: selectAllUserFollowers,
  selectById: selectUserFollowerById,
  selectIds: selectUserFollowerIds,
} = userFollowersAdapter.getSelectors(
  (state) => state.userConnection.userFollowers
);

export const {
  selectAll: selectAllUserFollowing,
  selectById: selectUserFollowingById,
  selectIds: selectUserFollowingIds,
} = userFollowingAdapter.getSelectors(
  (state) => state.userConnection.userFollowing
);

export const {
  selectAll: selectAllOtherUserFollowers,
  selectById: selectOtherUserFollowerById,
  selectIds: selectOtherUserFollowerIds,
} = userFollowersAdapter.getSelectors(
  (state) => state.userConnection.otherUserFollowers
);

export const {
  selectAll: selectAllOtherUserFollowing,
  selectById: selectOtherUserFollowingById,
  selectIds: selectOtherUserFollowingIds,
} = userFollowingAdapter.getSelectors(
  (state) => state.userConnection.otherUserFollowing
);

export const selectConnectionsByUser = createSelector(
  [selectAllConnections, (state, userId) => userId],
  (connections, userId) =>
    connections.filter((connection) => connection.user_id === userId)
);
export const selectFollowersByUser = createSelector(
  [selectAllOtherUserFollowers, (state, userId) => userId],
  (followers, userId) =>
    followers.filter((follower) => follower.user_id === userId)
);
export const selectFollowingByUser = createSelector(
  [selectAllOtherUserFollowing, (state, userId) => userId],
  (followings, userId) =>
    followings.filter((following) => following.user_id === userId)
);
