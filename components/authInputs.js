import { TextInput } from 'react-native-paper'
import { styles } from '../styles/authStyles'

export const EmailInput = ({email, emailError , setEmail}) =>{
  return (
    <TextInput
      style={styles.input}
      label="Email"
      value={email}
      onChangeText={(textInput) => setEmail(textInput)}
      inputMode='email'
      mode='outlined'
      activeOutlineColor='#189A46'
      theme={{ roundness: 50 }} 
      error={emailError}
    />
  )
}

export const PasswordInput = ({label, password, setPassword, viewPassword, setViewPassword, passwordError}) => {
  const toggleViewPassword = () => {
    setViewPassword(!viewPassword);
  }
  return (
    <TextInput
      style={styles.input}
      label={label}
      secureTextEntry={!viewPassword}
      value={password}
      onChangeText={(textInput) => setPassword(textInput)}
      mode='outlined'
      right={ viewPassword ? 
        <TextInput.Icon icon="eye" 
          onPress={toggleViewPassword} 
          style={styles.passwordIcon}
        /> 
        : 
        <TextInput.Icon icon="eye-off" 
          onPress={toggleViewPassword} 
          style={styles.passwordIcon}
        />
      }
      activeOutlineColor='#189A46'
      theme={{ roundness: 50 }} 
      error={passwordError}
      onBlur={() => setViewPassword(false)}
    />
  )
}