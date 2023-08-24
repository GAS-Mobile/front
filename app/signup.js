import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { TextInput } from 'react-native-paper'
import { styles } from '../styles/authStyles'
import { validateEmail, validateCpf } from '../utils/validators'
import { EmailInput, PasswordInput } from '../components/authInputs'

const Signup = () => {
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const [viewPassword, setViewPassword] = useState(false)
  const [viewPasswordConfirmation, setViewPasswordConfirmation] = useState(false)

  const [errors , setErrors] = useState({
    name: false,
    cpf: false,
    email: false,
    password: false,
    passwordConfirmation: false,
  })

  const handleCpfChange = (text) => {
    const numericOnly = text.replace(/\D/g, '')
    let formattedCpf = ''
  
    if (numericOnly.length <= 3) {
      formattedCpf = numericOnly
    } else if (numericOnly.length <= 6) {
      formattedCpf = numericOnly.slice(0, 3) + '.' + numericOnly.slice(3)
    } else if (numericOnly.length <= 9) {
      formattedCpf =
        numericOnly.slice(0, 3) +
        '.' +
        numericOnly.slice(3, 6) +
        '.' +
        numericOnly.slice(6)
    } else {
      formattedCpf =
        numericOnly.slice(0, 3) +
        '.' +
        numericOnly.slice(3, 6) +
        '.' +
        numericOnly.slice(6, 9) +
        '-' +
        numericOnly.slice(9, 11)
    }
  
    setCpf(formattedCpf)
  }

  const handleSignup = () => {
    setErrors({
      name: false,
      cpf: false,
      email: false,
      password: false,
      passwordConfirmation: false,
    })

    if (!name || !cpf || !email || !password || !passwordConfirmation) {
      setErrors({
        name: !name,
        cpf: !cpf,
        email: !email,
        password: !password,
        passwordConfirmation: !passwordConfirmation,
      })

      Alert.alert('Para realizar o cadastro é necessário preencher todos os campos.')
      return
    }

    if (!validateCpf(cpf)) {
      setErrors(prevState => {
        return {
          ...prevState,
          cpf: true,
        }
      })

      Alert.alert('Favor inserir um CPF válido (11 digitos, apenas números).')
      return
    }    
  
    if (!validateEmail(email)) {
      setErrors(prevState => {
        return {
          ...prevState,
          email: true,
        }
      })

      Alert.alert('Favor inserir um email válido.')
      return
    }

    if (password !== passwordConfirmation) {
      setErrors(prevState => {
        return {
          ...prevState,
          passwordConfirmation: true,
        }
      })
      Alert.alert('A confirmação de senha não confere.')
      return
    }

    Alert.alert('Cadastro realizado com sucesso!')
    console.log('Name:', name)
    console.log('CPF:', cpf)
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('PasswordConfirmation:', passwordConfirmation)

    setEmail('')
    setName('')
    setCpf('')
    setPassword('')
    setPasswordConfirmation('')
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: '',
        }}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Criar conta</Text>
        <Text style={styles.subtitle}>Seja bem vindo</Text>
      </View>

      <View style={styles.inputsContainer}>
        <TextInput
          style={styles.input}
          label="Nome"
          value={name}
          onChangeText={(textInput) => setName(textInput)}
          mode='outlined'
          activeOutlineColor='#189A46'
          theme={{ roundness: 50 }} 
          error={errors.name}
        />

        <TextInput
          style={styles.input}
          label="CPF (Apenas os números)"
          value={cpf}
          onChangeText={(textInput) => handleCpfChange(textInput)}
          inputMode='numeric'
          mode='outlined'
          activeOutlineColor='#189A46'
          theme={{ roundness: 50 }} 
          error={errors.cpf}
          maxLength={14}
        />

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

        <PasswordInput 
          label='Confirmar senha'
          password={passwordConfirmation}
          setPassword={setPasswordConfirmation}
          viewPassword={viewPasswordConfirmation}
          setViewPassword={setViewPasswordConfirmation}
          passwordError={errors.passwordConfirmation}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => console.log("já tenho uma conta")}>
        <Text style={styles.link}>Já possuo uma conta</Text>
      </TouchableOpacity>

    </View>
  )
}

export default Signup