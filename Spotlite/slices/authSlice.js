import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import axios from "axios";
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
        "http://192.168.1.35:8000/api/register/",
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
        // "http://192.168.1.33:8000/api/token/",
        "http://192.168.1.35:8000/api/token/",
        userData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await SecureStore.setItemAsync("access_token", response.data.access);
      await SecureStore.setItemAsync("refresh_token", response.data.refresh);

      // console.log("Login response: ", response.data);
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
      const response = await axios.post(
        "http://192.168.1.35:8000/api/logout/",
        {
          refresh_token: refreshToken,
        }
      );

      // console.log("Logout data ", response.data);
      clearLocalStorage();
      return response.data;
    } catch (error) {
      // return rejectWithValue(error.response.data);
      // Return a serializable error message
      console.error("Error response data:", error.response?.data);
      console.error("Error message:", error.message);
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

        state.isAuthenticated = true;
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.registerError = action.payload.error;
        console.log("Register Error:", state.registerError);
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

        state.isAuthenticated = true;
        state.loginError = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.loginError = action.payload;
        console.log("Login Error:", state.loginError);
      })

      .addCase(logoutUser.pending, (state) => {
        state.logoutStatus = "loading";
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        console.log("Logout successful");
        return initialState;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.logoutStatus = "failed";
        state.logoutError = action.payload.error;
        console.log("Logout Error:", state.logoutError);
      });
  },
});

export const { setUser } = usersSlice.actions;

export default usersSlice.reducer;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users);
