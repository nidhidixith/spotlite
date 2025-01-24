import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";
import { store } from "../store";
import { Provider } from "react-redux";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  // const [loaded, error] = useFonts({
  //   rthin: Roboto_100Thin,
  //   // Roboto_100Thin_Italic,
  //   rlight: Roboto_300Light,
  //   // Roboto_300Light_Italic,
  //   rregular: Roboto_400Regular,
  //   // Roboto_400Regular_Italic,
  //   rmedium: Roboto_500Medium,
  //   // Roboto_500Medium_Italic,
  //   rbold: Roboto_700Bold,
  //   // Roboto_700Bold_Italic,
  //   rblack: Roboto_900Black,
  //   // Roboto_900Black_Italic,
  // });

  // useEffect(() => {
  //   if (loaded || error) {
  //     SplashScreen.hideAsync();
  //   }
  // }, [loaded, error]);

  // if (!loaded && !error) {
  //   return null;
  // }
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
