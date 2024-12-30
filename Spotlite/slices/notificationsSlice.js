import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import instance from "../api";

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

// Define initial states
const initialState = {
  notifications: notificationsAdapter.getInitialState({
    loading: false,
    error: null,
  }),
  newNotificationCount: 0,
};

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async () => {
    const response = await instance.get("/notifications/get-notifications/");
    // console.log("From postSlice:", response.data);
    return response.data;
  }
);

export const savePushToken = createAsyncThunk(
  "notifications/savePushToken",
  async ({ pushToken }, { rejectWithValue }) => {
    console.log("I am here");
    const response = await instance.post(
      "/notifications/save-push-token/",
      { pushToken },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log("From postSlice:", response.data);
    return response.data;
  }
);

export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async ({ notificationId }, { rejectWithValue }) => {
    try {
      const response = await instance.patch(
        `/notifications/mark-as-read/${notificationId}/`,
        null,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log(response.data);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const notificationsSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    resetNotifications(state) {
      // return initialState;
      notificationsAdapter.removeAll(state.notifications); // Clear all notifications
      state.notifications.loading = false; // Reset loading
      state.notifications.error = null; // Reset error
      state.newNotificationCount = 0; // Reset notification count
    },
    clearNotifications: (state) => {
      notificationsAdapter.removeAll(state.notifications);
      state.newNotificationCount = 0;
    },
    addNotification: (state, action) => {
      console.log(
        "Count from notification slice before: ",
        state.newNotificationCount
      );
      notificationsAdapter.upsertOne(state.notifications, action.payload);
      // state.notifications.count = state.notifications.count + 1;
      state.newNotificationCount += 1;
      console.log(
        "Count from notification slice after: ",
        state.newNotificationCount
      );
    },
    resetNewNotificationCount: (state) => {
      state.newNotificationCount = 0; // Reset count when the notifications tab is opened
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.notifications.loading = true;
        state.notifications.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications.loading = false;
        notificationsAdapter.upsertMany(state.notifications, action.payload);
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.notifications.loading = false;
        state.notifications.error = action.error.message;
      })

      // For Save Push Token
      .addCase(savePushToken.pending, (state) => {
        // state.otherUserPosts.loading = true;
        // state.otherUserPosts.error = null;
      })
      .addCase(savePushToken.fulfilled, (state, action) => {
        // state.otherUserPosts.loading = false;
        // otherUserPostsAdapter.upsertOne(state.otherUserPosts, action.payload);
      })
      .addCase(savePushToken.rejected, (state, action) => {
        // state.otherUserPosts.loading = false;
        // state.otherUserPosts.error = action.error.message;
      })

      // For Mark as read
      .addCase(markAsRead.pending, (state) => {
        // state.otherUserPosts.loading = true;
        // state.otherUserPosts.error = null;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        // state.otherUserPosts.loading = false;
        // otherUserPostsAdapter.upsertOne(state.otherUserPosts, action.payload);
      })
      .addCase(markAsRead.rejected, (state, action) => {
        // state.otherUserPosts.loading = false;
        // state.otherUserPosts.error = action.error.message;
      });
  },
});

export const {
  resetNotifications,
  clearNotifications,
  addNotification,
  resetNewNotificationCount,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const {
  selectAll: selectAllNotifications,
  selectById: selectNotificationById,
  selectIds: selectNotificationsIds,
} = notificationsAdapter.getSelectors(
  (state) => state.notification.notifications
);

// Direct selector to access the count
// export const selectNotificationCount = (state) => state.notification.count;
