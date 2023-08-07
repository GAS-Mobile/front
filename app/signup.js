import { StyleSheet, Text, View } from 'react-native'

const Signup = () => {
  return (
    <View style={ styles.container }>
      <Text>
        Cadastro
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default Signup