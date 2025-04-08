import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import axios from "axios";
import instance from "../api";
import { jwtDecode } from "jwt-decode";
import * as SecureStore from "expo-secure-store";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  registerStatus: "idle",
  registerError: null,

  loginStatus: "idle",
  loginError: null,

  logoutStatus: "idle",
  logoutError: null,

  deleteUserStatus: "idle",
  deleteUserError: null,

  currentUserId: null,
  isAuthenticated: false,
  userLoaded: false,
});

// Action to load user information from SecureStore
export const loadUserFromLocalStorage = () => async (dispatch) => {
  try {
    const accessToken = await SecureStore.getItemAsync("access_token");

    if (accessToken) {
      // Decode the token to get user info
      const decodedAccessToken = jwtDecode(accessToken);
      const user_id = decodedAccessToken.user_id;

      // Dispatch action to set the user in Redux
      dispatch(usersSlice.actions.setUser({ id: user_id }));
      state.currentUserId = user_id;
    } else {
      console.error("No access token found");
    }
  } catch (error) {
    console.error("Error loading token from SecureStore:", error);
  }
};

// Action to clear user information from localStorage upon logout
const clearLocalStorage = async () => {
  await SecureStore.deleteItemAsync("access_token");
  await SecureStore.deleteItemAsync("refresh_token");
};

export const registerUser = createAsyncThunk(
  "users/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://192.168.1.33:8000/api/register/",
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await SecureStore.setItemAsync("access_token", response.data.access);
      await SecureStore.setItemAsync("refresh_token", response.data.refresh);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "users/loginUser",
  async (userData, { rejectWithValue }) => {
    console.log("I am inside Login");
    try {
      const response = await axios.post(
        "http://192.168.1.33:8000/api/token/",
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await SecureStore.setItemAsync("access_token", response.data.access);
      await SecureStore.setItemAsync("refresh_token", response.data.refresh);

      return response.data;
    } catch (error) {
      // If there's an error, reject the thunk with the error message
      // Return a serializable error message
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "users/logoutUser",
  async (refreshToken, { rejectWithValue }) => {
    try {
      const response = await instance.post(
        "/logout/",
        // "http://192.168.1.36:8000/api/logout/",
        {
          refresh_token: refreshToken,
        }
      );

      clearLocalStorage();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (refreshToken, { rejectWithValue }) => {
    console.log("RefreshToken from delete user slice: ", refreshToken); // Add this line
    try {
      const response = await instance.delete(
        "/delete-user/",
        // "http://192.168.1.36:8000/api/delete-user/",
        {
          data: { refresh_token: refreshToken }, // Pass refresh_token inside 'data' field
        }
      );

      clearLocalStorage();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser(state, action) {
      usersAdapter.upsertOne(state, action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.registerStatus = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerStatus = "succeeded";

        const accessToken = action.payload.access;
        const decodedAccessToken = jwtDecode(accessToken);

        const user_id = decodedAccessToken.user_id;
        usersAdapter.upsertOne(state, { id: user_id });

        state.currentUserId = user_id;

        state.isAuthenticated = true;
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.registerError = action.payload.error;
      })

      .addCase(loginUser.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        const accessToken = action.payload.access;
        const decodedAccessToken = jwtDecode(accessToken);

        const user_id = decodedAccessToken.user_id;
        usersAdapter.upsertOne(state, { id: user_id });

        state.currentUserId = user_id;

        // const allUsers = usersAdapter.getSelectors().selectAll(state);
        // console.log("All users in the adapter:", allUsers);
        // console.log("Current userId from slice:", state.currentUserId);

        state.isAuthenticated = true;
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.loginError = action.payload;
      })

      .addCase(logoutUser.pending, (state) => {
        state.logoutStatus = "loading";
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        return initialState;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutStatus = "failed";
        state.logoutError = action.payload.error;
      })

      .addCase(deleteUser.pending, (state) => {
        state.deleteUserStatus = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        return initialState;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.deleteUserStatus = "failed";
        state.deleteUserError = action.payload.error;
      });
  },
});

export const { setUser } = usersSlice.actions;

export default usersSlice.reducer;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users);

export const selectCurrentUserId = (state) => state.users.currentUserId;
