import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    gap: 36,
    padding: 20,
  },
  title: {
    width: '100%',
    height: 32,
    color: '#189A46',
    fontSize: 24,
    fontWeight: 600
  },
  formContainer: {
    width: '100%',
    gap: 20
  },
  label: {
    fontSize: 16,
    fontWeight: 500,
  },
  input: {
    width: '100%',
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    gap: 10,
  },  
  sendButton:{
    backgroundColor: '#189A46',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 50,
    width: '30%'
  },
  cancelButton:{
    backgroundColor: '#E93446',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 50,
    width: '28%'
  },
  buttonText:{
    fontWeight: '500',
    fontSize: 14,
    color: '#fff',
  },
});