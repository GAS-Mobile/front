import React from "react"
import { Stack } from "expo-router"
import { createDrawerNavigator } from '@react-navigation/drawer'
import AnalysisRequestForm from '../analysisRequest/index'
import DrawerContent from "../../components/drawerContent"

const Drawer = createDrawerNavigator()

const AnalysisRequestFormLayout = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />

      <Drawer.Navigator
        initialRouteName="AnalysisRequest"
        screenOptions={{
          headerShown: false
        }}
        drawerContent={(props) => <DrawerContent {...props} />}
      >
        <Drawer.Screen name="AnalysisRequest" component={AnalysisRequestForm} /> 
      </Drawer.Navigator>
    </>
  )
}

export default AnalysisRequestFormLayout 