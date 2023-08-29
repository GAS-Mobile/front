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

export const CPFInput = ({cpf, setCpf, cpfError}) => {
  const handleCpfChange = (text) => {
    const numericOnly = text.replace(/\D/g, '')
    let formattedCpf = ''
  
    if (numericOnly.length <= 3) {
      formattedCpf = numericOnly
    } else if (numericOnly.length <= 6) {
      formattedCpf = numericOnly.slice(0, 3) + '.' + numericOnly.slice(3)
    } else if (numericOnly.length <= 9) {
      formattedCpf =
        numericOnly.slice(0, 3) +
        '.' +
        numericOnly.slice(3, 6) +
        '.' +
        numericOnly.slice(6)
    } else {
      formattedCpf =
        numericOnly.slice(0, 3) +
        '.' +
        numericOnly.slice(3, 6) +
        '.' +
        numericOnly.slice(6, 9) +
        '-' +
        numericOnly.slice(9, 11)
    }
  
    setCpf(formattedCpf)
  }
  return (
    <TextInput
      style={styles.input}
      label="CPF (Apenas os números)"
      value={cpf}
      onChangeText={(textInput) => handleCpfChange(textInput)}
      inputMode='numeric'
      mode='outlined'
      activeOutlineColor='#189A46'
      theme={{ roundness: 50 }} 
      error={cpfError}
      maxLength={14}
    />
  )
}

export const NameInput = ({name, setName, nameError}) => {
  return (
    <TextInput
      style={styles.input}
      label="Nome"
      value={name}
      onChangeText={(textInput) => setName(textInput)}
      mode='outlined'
      activeOutlineColor='#189A46'
      theme={{ roundness: 50 }} 
      error={nameError}
    />
  )
}