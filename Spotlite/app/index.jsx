import React from "react";
import { Redirect } from "expo-router";

const index = () => {
  return <Redirect href="/(auth)/login" />;
  // return <Redirect href="/(app)/(tabs)/home" />;
  // return <Redirect href="/(app)/(complete-profile)/complete-profile" />;
};

export default index;
