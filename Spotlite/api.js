import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const instance = axios.create({
  baseURL: "http://192.168.1.35:8000/api",
});

const logoutUser = async () => {
  try {
    // Remove access_token and refresh_token from SecureStore
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");

    // Redirect to the home page (or login screen)
    router.replace("/SignIn");
    // Assuming you are using React Navigation to manage navigation
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

instance.interceptors.request.use(
  async (config) => {
    const accessToken = await SecureStore.getItemAsync("access_token");
    const refreshToken = await SecureStore.getItemAsync("refresh_token");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error("Axios Error:", error); // Log the full error
    console.error("Error Response:", error.response); // Log the response if available
    console.error("Error Message:", error.message); // Log the error message

    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = await SecureStore.getItemAsync("refresh_token");

      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://192.168.1.35:8000/api/token/refresh/",
            { refresh: refreshToken }
          );

          const newAccessToken = response.data.access;
          const newRefreshToken = response.data.refresh;

          // Save the new tokens
          await SecureStore.setItemAsync("access_token", newAccessToken);
          await SecureStore.setItemAsync("refresh_token", newRefreshToken);

          // Retry the original request with new access token
          return instance(originalRequest);
        } catch (refreshError) {
          console.log("Error refreshing token:", refreshError);
          // Handle refresh token error (e.g., redirect to login page)
        }
      } else {
        console.log("No refresh token available");
        // Handle case where no refresh token is available (e.g., logout user)
        // logoutUser();
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
