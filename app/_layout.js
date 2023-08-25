import React from "react"
import { Stack } from "expo-router"
import { AuthProvider } from "../contexts/AuthContext"

const Layout = () => {
  return (
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
  )
}

export default Layout