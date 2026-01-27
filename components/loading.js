import React from 'react'
import LottieView from 'lottie-react-native'
import { View, StyleSheet, Text } from 'react-native'

const Loading = () => {
  return (
    <View style={styles.loadingContainer}>
      <LottieView 
        source={require('../assets/loading.json')}
        autoPlay={true}
        loop={true}
      />
      <Text style={styles.text}>Carregando...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    backgroundColor: '#fff',
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginTop: '50%',
    color: '#159B46',
    fontSize: 18,
    fontWeight: 700
  }
})

export default Loading;