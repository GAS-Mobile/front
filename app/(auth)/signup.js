import React, { useState } from 'react'
import { Stack } from 'expo-router'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { TextInput } from 'react-native-paper'
import { styles } from '../../styles/authStyles'
import { validateEmail, validateCpf } from '../../utils/validators'
import { CPFInput, EmailInput, NameInput, PasswordInput } from '../../components/authInputs'
import { api } from '../../lib/axios'

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

  const handleSignup = async () => {
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

    await api.post('/customers/create/', {
      customer: {
        name,
        cpf,
        email,
        password,
      }
    })
    .then(response => {
      console.log(response?.data)
      Alert.alert('Cadastro realizado com sucesso!')

      setEmail('')
      setName('')
      setCpf('')
      setPassword('')
      setPasswordConfirmation('')
    })
    .catch(error => {
      console.log(error?.response?.data, 'status:', error?.response?.status)
    })
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
        <NameInput 
          name={name}
          setName={setName}
          nameError={errors.name}
        />

        <CPFInput
          cpf={cpf}
          setCpf={setCpf}
          cpfError={errors.cpf}
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