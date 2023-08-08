import React, { useState } from 'react';
import { Stack } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TextInput } from 'react-native-paper'

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

  const toggleViewPassword = () => {
    setViewPassword(!viewPassword);
  }

  const validateEmail = (email) => {
    const emailRegex = /^\w+@\w+\.\w+$/;
    return emailRegex.test(email)
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
        <TextInput
          style={styles.input}
          label="Email"
          value={email}
          onChangeText={(textInput) => setEmail(textInput)}
          inputMode='email'
          mode='outlined'
          activeOutlineColor='#189A46'
          theme={{ roundness: 50 }} 
          error={errors.email}
        />

        <TextInput
          style={styles.input}
          label="Senha"
          secureTextEntry={!viewPassword}
          value={password}
          onChangeText={(textInput) => setPassword(textInput)}
          mode='outlined'
          right={ viewPassword ? 
            <TextInput.Icon icon="eye" 
              onPress={toggleViewPassword} 
              style={styles.passwordIcon}
            /> 
            : 
            <TextInput.Icon icon="eye-off" 
              onPress={toggleViewPassword} 
              style={styles.passwordIcon}
            />
          }
          activeOutlineColor='#189A46'
          theme={{ roundness: 50 }} 
          error={errors.password}
          onBlur={() => setViewPassword(false)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => console.log("esqueci minha senha")}>
        <Text style={styles.forgotPassword}>Esqueci minha senha</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    paddingBottom: 100
  },
  titleContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    marginBottom: 40,
  },
  inputsContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 50,
    fontSize: 18,
    paddingLeft: 10,
    lineHeight: 24,
  },
  passwordIcon: {
    marginTop: 12,
  },
  button: {
    backgroundColor: 'blue',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  button:{
    backgroundColor: '#189A46',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    width: '90%',
    borderRadius: 50,
  },
  buttonText:{
    fontWeight: '500',
    fontSize: 20,
    color: '#fff',
  },
  forgotPassword: {
    fontSize: 16,
    fontWeight: '500',
    color: '#189A46',
  }
});

export default Signin;