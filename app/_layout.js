import React from "react"
import { Stack } from "expo-router"
import { AuthProvider } from "../contexts/AuthContext"
import { PaperProvider } from 'react-native-paper'

const RootLayout = () => {
  return (
    <PaperProvider>
    <AuthProvider>
      <Stack 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f3f2f3',
          },
          headerShadowVisible: false,
        }}
      />
    </AuthProvider>
    </PaperProvider>
  )
}

export default RootLayout