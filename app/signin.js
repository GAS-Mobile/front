import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/authStyles'
import { validateEmail } from '../utils/validators'
import { EmailInput, PasswordInput } from '../components/authInputs'

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [viewPassword, setViewPassword] = useState(false);

  const [errors , setErrors] = useState({
    email: false,
    password: false
  })

  const handleLogin = () => {
    setErrors({
      email: false,
      password: false,
    })

    if (!email || !password) {
      setErrors({
        email: !email,
        password: !password,
      })

      Alert.alert('Para realizar o login é necessário preencher todos os campos.')
      return
    }
    
    if (!validateEmail(email)) {
      setErrors(prevState => {
        return {
          ...prevState,
          email: true,
        }
      })

      Alert.alert('Favor inserir um email válido.');
      return
    }

    Alert.alert('Login realizado com sucesso!');
    console.log('Email:', email);
    console.log('Password:', password);

    setEmail('');
    setPassword('');
  };

  return (
    <View style={styles.container}>
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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => console.log("esqueci minha senha")}>
        <Text style={styles.link}>Esqueci minha senha</Text>
      </TouchableOpacity>

    </View>
  );
};

export default Signin;