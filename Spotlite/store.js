import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice";
import eventReducer from "./slices/eventsSlice";
import usersReducer from "./slices/authSlice";
import userprofileReducer from "./slices/userProfileSlice";
import notificationsReducer from "./slices/notificationsSlice";
import userconnectionsReducer from "./slices/userConnectionsSlice";
import searchReducer from "./slices/searchSlice";

export const store = configureStore({
  reducer: {
    post: postsReducer,
    event: eventReducer,
    users: usersReducer,
    profile: userprofileReducer,
    notification: notificationsReducer,
    userConnection: userconnectionsReducer,
    search: searchReducer,
  },
});
