import React, { createContext, useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSegments, useRouter } from 'expo-router';
import { Alert } from "react-native";

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const segments = useSegments()
  const navigate = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)

  const isPrivateRoute = () => {
    return !(segments[0] === '(auth)' || segments.length === 0)
  }

  const validateRouteAccess = async () => {
    if (isPrivateRoute()){
      const accessToken = await AsyncStorage.getItem('accessToken')
      const refreshToken = await AsyncStorage.getItem('refreshToken')
      const hasTokensInLocalStorage = accessToken && refreshToken

      if (hasTokensInLocalStorage){
        console.log('has tokens in storage, make a request and check if the tokens are valid')
      }
      else {
        Alert.alert('Sessão expirada', 'Sua sessão expirou. Por favor, realize o login novamente para acessar sua conta.')
        navigate.replace('/signin')
      }
    }
  }

  useEffect(() => {
    if(isLoaded) validateRouteAccess()
    setIsLoaded(true)
  }, [segments])

  return (
    <AuthContext.Provider value = {{}}>
      {children}
    </AuthContext.Provider>
  )
}