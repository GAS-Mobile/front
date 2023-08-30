import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { styles } from '../../styles/analysisRequestStyle'
import { TextInput } from 'react-native-paper'
import { validateCnpj } from '../../utils/validators'
import { api } from '../../lib/axios'

const AnalysisRequestForm = () => {
  const [cnpj, setCnpj] = useState()
  const [branchLocation, setBranchLocation] = useState()
  const [motive, setMotive] = useState()

  const [errors , setErrors] = useState({
    cnpj: false,
    branchLocation: false,
    motive: false,
  })

  const clearInputs = () => {
    setCnpj('')
    setBranchLocation('')
    setMotive('')
  }

  const handleCnpjChange = (cnpj) => {
    const numericOnly = cnpj.replace(/\D/g, '')
    let formattedCNPJ = ''
  
    if (numericOnly.length <= 2) {
      formattedCNPJ = numericOnly
    } else if (numericOnly.length <= 5) {
      formattedCNPJ = 
        numericOnly.slice(0, 2) +
        '.' + 
        numericOnly.slice(2)
    } else if (numericOnly.length <= 8) {
      formattedCNPJ =
        numericOnly.slice(0, 2) +
        '.' +
        numericOnly.slice(2, 5) +
        '.' +
        numericOnly.slice(5)
    } else if (numericOnly.length <= 12){
      formattedCNPJ =
        numericOnly.slice(0, 2) +
        '.' +
        numericOnly.slice(2, 5) +
        '.' +
        numericOnly.slice(5, 8) +
        '/' +
        numericOnly.slice(8)
    } else {
      formattedCNPJ =
        numericOnly.slice(0, 2) +
        '.' +
        numericOnly.slice(2, 5) +
        '.' +
        numericOnly.slice(5, 8) +
        '/' +
        numericOnly.slice(8, 12) +
        '-' +
        numericOnly.slice(12)
    }
    setCnpj(formattedCNPJ)
  }

  const handleSend = async () => {
    setErrors({
      cnpj: false,
      branchLocation: false,
      motive: false,
    })

    if (!cnpj || !branchLocation || !motive) {
      setErrors({
        cnpj: !cnpj,
        branchLocation: !branchLocation,
        motive: !motive,
      })
      Alert.alert('Campos Obrigatórios', 'Para realizar a solicitação de análise é necessário preencher todos os campos.')
      return
    }

    if (!validateCnpj(cnpj)) {
      setErrors(prevState => {
        return {
          ...prevState,
          cnpj: true,
        }
      })
      Alert.alert('CNPJ Inválido', 'O CNPJ fornecido é inválido. Por favor, insira um CNPJ válido.')
      return
    }

    Alert.alert('Solicitação bem-sucedida', 'Parabéns! Você realizou a solicitação de análise com sucesso.')
    clearInputs()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Solicitar avaliação</Text>

      <View style={styles.formContainer}>
        {/* Deve ser autopreenchido */}
        <View >
          <Text style={styles.label}>CNPJ da Empresa</Text>
          <TextInput
            style={styles.input}
            placeholder='CNPJ da empresa'
            value={cnpj}
            onChangeText={(textInput) => handleCnpjChange(textInput)}
            mode='outlined'
            activeOutlineColor='#189A46'
            theme={{ roundness: 25 }} 
            error={errors.cnpj}
            inputMode='numeric'
            maxLength={18}
            //editable={false}
          />
        </View>

        <View >
          {/* Deve ser autopreenchida */}
          <Text style={styles.label}>Filial/Localização exata</Text>
          <TextInput
            style={styles.input}
            placeholder='Filial/Localização exata'
            value={branchLocation}
            onChangeText={(textInput) => setBranchLocation(textInput)}
            mode='outlined'
            activeOutlineColor='#189A46'
            theme={{ roundness: 25 }} 
            error={errors.branchLocation}
            //editable={false}
          />
        </View>

        <View >
          <Text style={styles.label}>Motivo da solicitação</Text>
          <TextInput
            style={styles.input}
            placeholder='Motivo da solicitação'
            value={motive}
            onChangeText={(textInput) => setMotive(textInput)}
            mode='outlined'
            activeOutlineColor='#189A46'
            theme={{ roundness: 10 }} 
            error={errors.motive}
            multiline={true}
            numberOfLines={10}
          />
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={clearInputs}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AnalysisRequestForm