import React from 'react';
import { View, TouchableOpacity, Text, Alert, ScrollView } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper';
import { styles } from '../styles/drawerMenuStyles';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'expo-router';

export default function DrawerContent({ onClose }) {
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert('Logout', 'Você foi desconectado da sua conta com sucesso.');
    logout();
    onClose();
  };

  const navigateTo = (route) => {
    router.push(route);
    onClose();
  };

  return (
    <ScrollView style={styles.drawerContainer}>
      <View style={styles.header}>
        <IconButton icon="close" iconColor="#fff" size={32} onPress={onClose} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={80}
            source={require('../assets/default-user-avatar.png')}
            style={styles.avatar}
          />
          <Text style={styles.userName}>{user?.customer?.name || 'Usuário'}</Text>
          <Text style={styles.userEmail}>{user?.customer?.email || ''}</Text>
        </View>

        <View style={styles.links}>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigateTo('/home')}
          >
            <IconButton icon="home" iconColor="#189A46" size={24} style={styles.drawerIcon} />
            <Text style={styles.drawerItemText}>Início</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigateTo('/requests')}
          >
            <IconButton
              icon="file-document-outline"
              iconColor="#189A46"
              size={24}
              style={styles.drawerIcon}
            />
            <Text style={styles.drawerItemText}>Minhas Solicitações</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <TouchableOpacity style={styles.drawerItem} onPress={handleLogout}>
            <IconButton icon="logout" iconColor="#d32f2f" size={24} style={styles.drawerIcon} />
            <Text style={[styles.drawerItemText, styles.logoutText]}>Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
