import React from 'react';
import { Appbar } from 'react-native-paper';
import { StyleSheet, Image } from 'react-native';

const Header = ({ onMenuPress }) => {
  return (
    <Appbar.Header style={styles.container}>
      <Appbar.Action icon="menu" onPress={onMenuPress} size={28} color="#333" />
      <Image
        style={styles.headerLogo}
        source={require('../assets/header.png')}
      />
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerLogo: {
    height: 40,
    resizeMode: 'contain',
    flex: 1,
    marginLeft: -20,
  },
});

export default Header;