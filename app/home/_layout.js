import React from "react"
import { Slot, Stack } from "expo-router"

const HomeLayout = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: ''
          //headerShown: false
        }}
      />
      <Slot />
    </>
  )
}

export default HomeLayout