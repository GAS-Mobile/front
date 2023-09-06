import React from 'react'
import { View, TouchableOpacity, Text, Alert } from 'react-native'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { Avatar, IconButton } from 'react-native-paper'
import { styles } from '../styles/drawerMenuStyles'
import { useAuth } from '../hooks/useAuth'
import { useRouter, useSegments } from 'expo-router'

export default function DrawerContent({ navigation }) {
  const {logout} = useAuth()
  const router = useRouter()
  const segments = useSegments()

  const closeDrawer = () => {
    navigation.closeDrawer()
  }

  const handleLogout = () => {
    Alert.alert('Logout com sucesso', 'Você foi desconectado da sua conta com sucesso.');
    logout()
  }

  return (
    <DrawerContentScrollView style={styles.drawerContainer}>
      <View style={styles.header}>
        <IconButton
          icon="close"
          iconColor="#fff"
          size={38}
          onPress={closeDrawer}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <Avatar.Image size={100} 
            source={require('../assets/default-user-avatar.png')} 
            style={styles.avatar}
          />
          <Text style={styles.userName}>Usuário</Text>
        </View> 

        <View style={styles.links}>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => {
              if (segments[0] !== 'home'){
                router.replace('home/')
              }
            }}
          >
            <Text style={styles.drawerItemText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => console.log('Dashboard')}
          >
            <Text style={styles.drawerItemText}>Dashboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => console.log('Status das solicitações')}
          >
            <Text style={styles.drawerItemText}>Status das solicitações</Text>
          </TouchableOpacity>
        </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Sair</Text>
            <IconButton
              style={styles.logoutIcon}
              icon="logout"
              size={24}
              theme={{ colors: { onSurfaceDisabled: '#fff' } }}
              disabled
            />
          </TouchableOpacity>

      </View>
    </DrawerContentScrollView>
  )
}
