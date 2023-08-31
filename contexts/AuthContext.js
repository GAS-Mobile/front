import React, { createContext, useEffect, useState } from "react"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSegments, useRouter } from 'expo-router';
import { Alert } from "react-native";
import { api } from '../lib/axios'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
  const segments = useSegments()
  const navigate = useRouter()
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState({})

  const isPrivateRoute = () => {
    return !(segments[0] === '(auth)' || segments.length === 0)
  }
  
  const logout = async () => {
    let response = await api.delete('/auth/logout/')
    .then(async response => {
      delete api.defaults.headers.common.Authorization
      return {status: response?.status, data: response?.data}
    })
    .catch(error => {
      return {status: error?.response?.status, data: error?.response?.data}
    })
    // console.log(response)
    await AsyncStorage.removeItem('accessToken')
    await AsyncStorage.removeItem('refreshToken')
    return response
  }
  
  const fetchUserData = async () => {
    let response = await api.get('/authorized-user/')
    .then((response =>{
      return {status: response?.status, data: response?.data}
    }))
    .catch((error) => {
      return {status: error?.response?.status, data: error?.response?.data}
    })
    // console.log(response)
    return response
  }
  
  const refreshTokens = async (refreshToken) => {
    let response = await api.post('/auth/refresh-tokens/', {refreshToken})
    .then((async response =>{
      await AsyncStorage.setItem('accessToken', response?.data?.accessToken)
      await AsyncStorage.setItem('refreshToken', response?.data?.refreshToken)
      api.defaults.headers.common['Authorization'] = `Bearer ${response?.data?.accessToken}`
      return {status: response?.status, data: response?.data}
    }))
    .catch((error) => {
      return {status: error?.response?.status, data: error?.response?.data}
    })
    // console.log(response)
    return response
  }

  const validateRouteAccess = async () => {
    if (isPrivateRoute()){
      let accessToken = await AsyncStorage.getItem('accessToken')
      const refreshToken = await AsyncStorage.getItem('refreshToken')
      const hasTokensInLocalStorage = accessToken && refreshToken
      
      if (hasTokensInLocalStorage && !user?.customer){
        let fetchUserResponse = await fetchUserData()
        
        if (fetchUserResponse.status !== 200){
          const refreshTokensResponse = await refreshTokens(refreshToken)
          
          if (refreshTokensResponse.status === 200){
            accessToken = refreshTokensResponse.data.accessToken
            fetchUserResponse = await fetchUserData()
            setUser(fetchUserResponse.data)
            return
          }
        } else {
          setUser(fetchUserResponse.data)
          return
        }
      } else if (hasTokensInLocalStorage) return

      Alert.alert('Sessão Expirada', 'Sua sessão expirou. Por favor, realize o login novamente para acessar sua conta.')
      navigate.replace('/signin') 
    }
  }
  
  useEffect(() => {
    if(isLoaded) {
      validateRouteAccess()
    }
    setIsLoaded(true)
  }, [segments])

  return (
    <AuthContext.Provider value = {{user, refreshTokens, fetchUserData, logout}}>
      {children}
    </AuthContext.Provider>
  )
}