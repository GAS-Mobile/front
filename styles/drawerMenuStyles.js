import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#159B46',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  content: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 28,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 36,
  },
  avatar: {
    backgroundColor: 'transparent',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 12,
  },
  drawerItem: {
    paddingVertical: 12,
  },
  drawerItemText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '110%'
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff'
  },
  logoutIcon: {
    margin: 0,
    padding: 0,
  },
})