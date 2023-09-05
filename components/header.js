import React from 'react'
import { Appbar } from 'react-native-paper'
import { StyleSheet, Image} from 'react-native'

export const Header = ({ navigation }) => {
  const toggleMenu = () => {
    navigation.openDrawer()
  }
  
  return (
    <Appbar.Header style={styles.container}>
      <Appbar.Action icon="menu" onPress={toggleMenu} size={32}/>
      <Image
        style={styles.headerLogo}
        source={require('../assets/header.png')}
        />
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    paddingVertical: 40,
  },
  headerLogo: {
    height: 50,
    resizeMode: 'contain',
    marginLeft: '10%',
    paddingVertical: 20
  },
  menu: {
    backgroundColor: '# ',
    paddingTop: '20%',
    width: '70%',
    height: '100%',
  },
})

export default Header