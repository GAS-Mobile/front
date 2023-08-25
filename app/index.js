import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, Stack } from 'expo-router';

const Home = () => {
  const navigate = useRouter()

  return (
    <View style={styles.container}>
      <Stack.Screen options={{
        headerShown: false,
      }}/>

      <Image
        style={styles.logo}
        source={require('../assets/icon.png')}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={styles.signinButton}
          onPress={() => navigate.push('signin')}
        >
          <Text style={styles.signinButtonText}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.signupButton}
          onPress={() => navigate.push('signup')}
        >
          <Text style={styles.signupButtonText}>
            Cadastro
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#189A46',
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 160
  },
  logo: {
    height: '20%',
    width: '40%',
    borderRadius: 100,
    resizeMode: 'contain',
    top: 200
  },
  buttonsContainer:{
    width: '100%',
    height: "80%",
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  signinButton:{
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    width: '90%',
    borderRadius: 50,
  },
  signinButtonText:{
    fontWeight: '500',
    fontSize: 24,
    color: '#fff',
  },
  signupButton:{
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    width: '90%',
    borderRadius: 50,
  },
  signupButtonText:{
    fontWeight: '500',
    fontSize: 24,
    color: '#189A46',
  },
})

export default Home;