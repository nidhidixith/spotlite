import React from "react";
import { Stack } from "expo-router";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const AppLayout = () => {
  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="(menu)"
            options={{ headerShown: false, animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="(create)"
            options={{ headerShown: false }}
            // options={{ title: "Menu", animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="display-profile/[userId]"
            options={{ headerTitle: "" }}
          />
          <Stack.Screen name="post/[id]" options={{ headerTitle: "" }} />
          <Stack.Screen name="event/[id]" options={{ headerTitle: "" }} />
          <Stack.Screen
            name="display-event/[eventId]"
            options={{ headerTitle: "", animation: "slide_from_bottom" }}
          />
          <Stack.Screen
            name="display-user-event/[eventId]"
            options={{ headerTitle: "", animation: "slide_from_bottom" }}
          />
          <Stack.Screen name="search/[query]" options={{ headerTitle: "" }} />
          <Stack.Screen
            name="(complete-profile)"
            options={{ headerShown: false }}
            // options={{ title: "Menu", animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="(display-posts)"
            options={{ headerShown: false }}
            // options={{ title: "Menu", animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="(user-connections)"
            options={{ headerShown: false }}
            // options={{ title: "Menu", animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="(others-connections)"
            options={{ headerShown: false }}
            // options={{ title: "Menu", animation: "slide_from_right" }}
          />
          <Stack.Screen
            name="(display-events)"
            options={{ headerShown: false }}
            // options={{ title: "Menu", animation: "slide_from_right" }}
          />

          <Stack.Screen
            name="(edit-profile)"
            options={{ headerShown: false }}
            // options={{ title: "Menu", animation: "slide_from_right" }}
          />

          <Stack.Screen
            name="(full-media-view)"
            options={{ headerShown: false }}
            // options={{ title: "Menu", animation: "slide_from_right" }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default AppLayout;
