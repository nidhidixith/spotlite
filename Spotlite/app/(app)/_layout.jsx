import React, { useEffect, useState } from "react";
import { router, Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";
import LoadingIndicator from "../../components/Others/LoadingIndicator";

const AppLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) {
        router.replace("/(auth)/welcome");
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <LoadingIndicator />;
  }
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(menu)"
            options={{ headerShown: false, animation: "slide_from_right" }}
          />

          <Stack.Screen name="(create)" options={{ headerShown: false }} />
          <Stack.Screen name="(delete)" options={{ headerShown: false }} />

          <Stack.Screen
            name="display-event/[eventId]"
            options={{ headerTitle: "", animation: "slide_from_bottom" }}
          />
          <Stack.Screen
            name="display-user-event/[eventId]"
            options={{ headerTitle: "", animation: "slide_from_bottom" }}
          />

          <Stack.Screen
            name="(complete-profile)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="display-profile/[userId]"
            options={{ headerTitle: "" }}
          />
          <Stack.Screen
            name="(edit-profile)"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="(display-posts)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(display-events)"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="(user-connections)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="(others-connections)"
            options={{ headerShown: false }}
          />

          <Stack.Screen name="post/[id]" options={{ headerTitle: "" }} />
          <Stack.Screen name="event/[id]" options={{ headerTitle: "" }} />

          <Stack.Screen
            name="(full-media-view)"
            options={{ headerShown: false }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default AppLayout;
