import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
  titleContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    marginBottom: 40,
  },
  inputsContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 50,
    fontSize: 18,
    paddingLeft: 10,
    lineHeight: 24,
  },
  passwordIcon: {
    marginTop: 12,
  },
  button: {
    backgroundColor: 'blue',
    width: '90%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  button:{
    backgroundColor: '#189A46',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    width: '90%',
    borderRadius: 50,
  },
  buttonText:{
    fontWeight: '500',
    fontSize: 20,
    color: '#fff',
  },
  link: {
    fontSize: 16,
    fontWeight: '500',
    color: '#189A46',
  }
});