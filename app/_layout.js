import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return <Stack 
    screenOptions={{
      headerStyle: {
        backgroundColor: '#f3f2f3',
      },
      headerShadowVisible: false,
    }}
  />;
}

export default Layout;