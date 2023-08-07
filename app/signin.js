import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper'

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [viewPassword, setViewPassword] = useState(true);

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const toggleViewPassword = () => {
    setViewPassword(!viewPassword);
  }

  return (
    <View style={styles.container}>
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
        />

        <TextInput
          style={styles.input}
          label="Senha"
          secureTextEntry={viewPassword}
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
  },
  titleContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    marginBottom: 60,
  },
  inputsContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 28,
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