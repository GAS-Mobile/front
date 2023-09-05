import React from "react"
import { Slot, Stack } from "expo-router"
import { createDrawerNavigator } from '@react-navigation/drawer'
import Home from '../home/index'
import DrawerContent from "../../components/drawerContent"

const Drawer = createDrawerNavigator()

const HomeLayout = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      {/*<Slot />*/}

      <Drawer.Navigator
        screenOptions={{
          headerShown: false
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="Home" component={Home} /> 
      </Drawer.Navigator>
    </>
  )
}

export default HomeLayout 