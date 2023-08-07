import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Basic validation checks
    if (!email || !name || !cpf || !password) {
      Alert.alert('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Please enter a valid Email');
      return;
    }

    if (!validateCpf(cpf)) {
      Alert.alert('Please enter a valid CPF (11 digits, only numbers).');
      return;
    }

    // Your signup logic here (e.g., call an API to create the user)
    // Replace the following line with your actual signup logic
    console.log('Signup data:', { email, name, cpf, password });

    // Clear the form after successful signup (optional)
    setEmail('');
    setName('');
    setCpf('');
    setPassword('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^\w+@w+\.\w+$/;
    return emailRegex.test(email);
  };

  const validateCpf = (inputCpf) => {
    const cpfRegex = /^[0-9]{11}$/;
    return cpfRegex.test(inputCpf);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        inputMode='email'
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF (11 digits, only numbers)"
        value={cpf}
        onChangeText={setCpf}
        inputMode='numeric'
        maxLength={11}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default Signup;
