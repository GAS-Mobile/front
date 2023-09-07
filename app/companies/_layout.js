import React from "react"
import { Stack, Slot } from "expo-router"
import { createDrawerNavigator } from '@react-navigation/drawer'
import CompanyProfile from "./[companyID]"
import DrawerContent from "../../components/drawerContent"

const Drawer = createDrawerNavigator()

const CompaniesLayout = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      
      <Drawer.Navigator  Navigator
        screenOptions={{
          headerShown: false
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="CompanyProfile" component={CompanyProfile} /> 
      </Drawer.Navigator>
    </>
  )
}

export default CompaniesLayout 