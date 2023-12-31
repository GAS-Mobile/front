import React, { useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import { View, Text, TouchableOpacity, Alert, ActivityIndicator, ScrollView } from 'react-native'
import { styles } from '../../styles/authStyles'
import { validateEmail } from '../../utils/validators'
import { EmailInput, PasswordInput } from '../../components/authInputs'
import { api } from '../../lib/axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAuth } from '../../hooks/useAuth'

const Signin = () => {
  const {fetchUserData} = useAuth()
  const navigate = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [viewPassword, setViewPassword] = useState(false)
  const [waitingRequestResponse, setWaitingRequestResponse] = useState(false)

  const [errors , setErrors] = useState({
    email: false,
    password: false
  })

  const handleLogin = async () => {
    setErrors({
      email: false,
      password: false,
    })
    
    if (!email || !password) {
      setErrors({
        email: !email,
        password: !password,
      })
      Alert.alert('Campos Obrigatórios', 'Para realizar o login é necessário preencher todos os campos.')
      return
    }
    
    if (!validateEmail(email)) {
      setErrors(prevState => {
        return {
          ...prevState,
          email: true,
        }
      })
      Alert.alert('Email Inválido', 'O endereço de email fornecido é inválido. Por favor, insira um email válido.')
      return
    }

    setWaitingRequestResponse(true)

    await api.post('/auth/login/', {
      user: { email, password }
    })
    .then(async response => {
      //console.log(response?.data)
      await AsyncStorage.setItem('accessToken', response?.data?.accessToken)
      await AsyncStorage.setItem('refreshToken', response?.data?.refreshToken)
      api.defaults.headers.common['Authorization'] = `Bearer ${response?.data?.accessToken}`
      await fetchUserData()
      setTimeout(() => setWaitingRequestResponse(false), 300)
      Alert.alert('Login Bem-sucedido', 'Parabéns! Você realizou o login com sucesso.')
      setEmail('')
      setPassword('')
      navigate.replace('home')
    })
    .catch(error => {
      //console.log(error?.response?.data, 'status:', error?.response?.status)
      setTimeout(() => setWaitingRequestResponse(false), 300)
      if (error?.response?.status === 401) {
        Alert.alert('Falha na Autenticação', 'Usuário ou senha incorretos. Por favor, tente novamente.')
        setErrors({
          email: true,
          password: true,
        })
      } 
      else {
        Alert.alert('Falha na Autenticação', 'Ocorreu um erro durante a autenticação. Por favor, tente novamente.')
      }
    })
  }

  return (
    <ScrollView  contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          title: '',
        }}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Olá</Text>
        <Text style={styles.subtitle}>Bem vindo de volta</Text>
      </View>

      <View style={styles.inputsContainer}>
        <EmailInput 
          email={email}
          emailError={errors.email}
          setEmail={setEmail}
        />

        <PasswordInput
          label='Senha'
          password={password}
          setPassword={setPassword}
          viewPassword={viewPassword}
          setViewPassword={setViewPassword}
          passwordError={errors.password}
        />
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin} 
        disabled={waitingRequestResponse}
      >
        {
          waitingRequestResponse ?
          <ActivityIndicator color="#fff" size={28}/>
          :
          <Text style={styles.buttonText}>Entrar</Text>
        }
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => console.log("esqueci minha senha")}>
        <Text style={styles.link}>Esqueci minha senha</Text>
      </TouchableOpacity>

    </ScrollView>
  )
}

export default Signin