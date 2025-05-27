import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import instance from "../api";
import * as SecureStore from "expo-secure-store";

const notificationsAdapter = createEntityAdapter({
  // sortComparer: (a, b) => b.created_at.localeCompare(a.created_at),
});

// Define initial states
const initialState = {
  notifications: notificationsAdapter.getInitialState({
    loading: false,
    error: null,
    nextPage: null,

    fetchUndeliveredNotificationCountStatus: false,
    fetchUndeliveredNotificationCountError: null,
  }),
  newNotificationCount: 0,
  newNotificationsAvailable: false,
};

export const fetchUndeliveredNotificationCount = createAsyncThunk(
  "notifications/fetchUndeliveredNotificationCount",
  async (_, { rejectWithValue }) => {
    try {
      // const response = await instance.get(
      //   "/notifications/undelivered-notifications-count/"
      // );
      const response = await instance.get("/notifications/undelivered/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchNotifications = createAsyncThunk(
  "notifications/fetchNotifications",
  async ({ page = 1 }, { rejectWithValue }) => {
    // const response = await instance.get("/notifications/get-notifications/");
    // const response = await instance.get(
    //   `/notifications/get-notifications/?page=${page}`
    // );
    const response = await instance.get(`/notifications/?page=${page}`);
    return response.data;
  }
);

export const savePushToken = createAsyncThunk(
  "notifications/savePushToken",
  async ({ pushToken }, { rejectWithValue }) => {
    console.log("I am inside save push token");
    // const response = await instance.post(
    //   "/notifications/save-push-token/",
    //   { pushToken },
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    // );
    const response = await instance.post(
      "/notifications/push-tokens/",
      { pushToken },
      {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      }
    );

    await SecureStore.setItemAsync("push_token", pushToken);

    return response.data;
  }
);

export const unregisterPushToken = createAsyncThunk(
  "notifications/unregisterPushToken",
  async ({ pushToken }, { rejectWithValue }) => {
    const response = await instance.post(
      "/notifications/unregister-push-token/",
      { pushToken },
      {
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      }
    );

    return response.data;
  }
);

export const markAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async ({ notificationId }, { rejectWithValue }) => {
    try {
      // const response = await instance.patch(
      //   `/notifications/mark-as-read/${notificationId}/`,
      //   null,
      //   {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   }
      // );
      const response = await instance.patch(
        `/notifications/${notificationId}/`,
        null,
        {
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        }
      );

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
      notificationsAdapter.removeAll(state.notifications);
      state.notifications.loading = false;
      state.notifications.error = null;
      // state.newNotificationCount = 0;
      state.newNotificationsAvailable = false;
    },
    clearNotifications: (state) => {
      notificationsAdapter.removeAll(state.notifications);
      // state.newNotificationCount = 0;
      state.newNotificationsAvailable = false;
    },
    addNotification: (state, action) => {
      // console.log("Adding notification:", action.payload);
      // notificationsAdapter.addOne(state.notifications, action.payload);
      // console.log("Notification added:", action.payload);
      state.newNotificationCount += 1;
      state.newNotificationsAvailable = true;
    },
    resetNewNotificationCount: (state) => {
      state.newNotificationCount = 0;
      // state.newNotificationsAvailable = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUndeliveredNotificationCount.pending, (state) => {
        state.notifications.fetchUndeliveredNotificationCountStatus = true;
        state.notifications.fetchUndeliveredNotificationCountError = null;
      })
      .addCase(fetchUndeliveredNotificationCount.fulfilled, (state, action) => {
        state.notifications.fetchUndeliveredNotificationCountStatus = false;
        const { undelivered_notifications_count } = action.payload;
        console.log(
          "undelivered_notifications_count: ",
          undelivered_notifications_count
        );
        state.newNotificationCount += undelivered_notifications_count;
        state.newNotificationsAvailable = true;
      })
      .addCase(fetchUndeliveredNotificationCount.rejected, (state, action) => {
        state.notifications.fetchUndeliveredNotificationCountStatus = false;
        state.notifications.fetchUndeliveredNotificationCountError =
          action.error.message;
      })

      .addCase(fetchNotifications.pending, (state) => {
        state.notifications.loading = true;
        state.notifications.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications.loading = false;
        const { results, next } = action.payload;
        notificationsAdapter.addMany(state.notifications, results);
        state.notifications.nextPage = next;
        // state.newNotificationsAvailable = false;
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

      // For unregistering Push Token
      .addCase(unregisterPushToken.pending, (state) => {
        // state.otherUserPosts.loading = true;
        // state.otherUserPosts.error = null;
      })
      .addCase(unregisterPushToken.fulfilled, (state, action) => {
        // state.otherUserPosts.loading = false;
        // otherUserPostsAdapter.upsertOne(state.otherUserPosts, action.payload);
      })
      .addCase(unregisterPushToken.rejected, (state, action) => {
        // state.otherUserPosts.loading = false;
        // state.otherUserPosts.error = action.payload || action.error.message;
        console.log(
          "Push token error: ",
          action.payload || action.error.message
        );
      })

      // For Mark as read
      .addCase(markAsRead.pending, (state) => {
        // state.otherUserPosts.loading = true;
        // state.otherUserPosts.error = null;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        // state.otherUserPosts.loading = false;
        // otherUserPostsAdapter.upsertOne(state.otherUserPosts, action.payload);
        const fullNotificationId = action.meta.arg.notificationId;
        if (fullNotificationId) {
          const fullNotification =
            state.notifications.entities[fullNotificationId];
          if (fullNotification) {
            fullNotification.is_read = true;
          }
        }
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
