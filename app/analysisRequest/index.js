import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Alert } from 'react-native'
import { styles } from '../../styles/analysisRequestStyle'
import { TextInput } from 'react-native-paper'
import { validateCnpj } from '../../utils/validators'
import { api } from '../../lib/axios'
import { useAuth } from '../../hooks/useAuth'
import { useRouter, useSearchParams } from 'expo-router'
import { Loading, styles as loadingStyles } from '../../components/loading'
import Header from '../../components/header'

const AnalysisRequestForm = ({navigation}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoadingCompanyData, setIsLoadingCompanyData] = useState(false)
  const {user, handleUnauthorizedRequest} = useAuth()
  const [cnpj, setCnpj] = useState()
  const [branchLocation, setBranchLocation] = useState()
  const [motive, setMotive] = useState()
  const router = useRouter()
  const params = useSearchParams()

  function extractCompanyID(path) {
    const regex = /companyID=([^&]+)/
    const match = path.match(regex)
  
    if (match && match[1]) {
      return match[1]
    } else {
      return null
    }
  }

  const fetchCompanyData = async () => {
    setIsLoadingCompanyData(true)

    const companyID = extractCompanyID(params?.path)
    console.log(companyID)
    
    let response = await api.get(`/companies/${companyID}/`)
    .then(response => {
      setCnpj(response?.data?.company?.cnpj)
      setBranchLocation(
        response?.data?.company?.headquartersLocation?.street +
        ", " +
        response?.data?.company?.headquartersLocation?.city +
        ". " +
        "CEP: " + response?.data?.company?.headquartersLocation?.postalCode +
        ". " +
        response?.data?.company?.headquartersLocation?.city +
        " - " +
        response?.data?.company?.headquartersLocation?.state + "."
      )

      console.log(response.data.company)
      return {status: response?.status, data: response?.data}
    })
    .catch(error => {
      return {status: error?.response?.status, data: error?.response?.data}
    })
    console.log(response)
    setTimeout(() => setIsLoadingCompanyData(false), 300)
    return response
  }

  useEffect(() => {
    if(isLoaded && !isLoadingCompanyData) {
      fetchCompanyData()
    }
    else {
      setIsLoaded(true)
    }
  }, [isLoaded])

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

  const handleApiErrorResponses = (statusCode, responseData) => {
    switch (statusCode) {
      case 400:
        Alert.alert('Erro', 'Para criar uma solicitação de análise, é necessário enviar o ID do cliente, o CNPJ da empresa e o motivo da solicitação de análise')
        break
      case 401:
        handleUnauthorizedRequest()
        break
      case 403:
        Alert.alert('Acesso negado', 'Você não tem permissão para acessar esta rota.')
        break
      case 404:
        const notFoundMessage = responseData.message === 'Customer not found' ?
                                'Cliente não encontrado'
                                :
                                'Empresa não encontrada'
        Alert.alert('Não encontrado', notFoundMessage)
        break
      case 409:
        const conflictMessage = responseData.message === 'A similar analysis request for this customer and company is already under analysis' ?
                                'Uma solicitação de análise similar para este cliente e empresa já está em análise'
                                :
                                'Existe uma análise em andamento para a solicitação aprovada deste cliente e empresa que ainda não foi concluída'
        Alert.alert('Conflito', conflictMessage)
        break
      case 500:
        Alert.alert('Erro interno do servidor', 'Ocorreu um erro ao solicitar a análise')
        break
    }
  }

  const handleSend = async () => {
    setErrors({
      cnpj: false,
      branchLocation: false,
      motive: false,
    })
    const hasCharsInMotive = (/\w/).test(motive)

    if (!cnpj || !branchLocation || !motive || !hasCharsInMotive) {
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

    const analysisRequest = {
      customerID: user?.customer?._id,
      companyCNPJ: cnpj,
      motive: motive
    }
    api.post('/requests/create/', {analysisRequest})
    .then(response => {
      Alert.alert('Solicitação bem-sucedida', 'Parabéns! Você realizou a solicitação de análise com sucesso.')
      clearInputs()
      router.back()
    })
    .catch(error => {
      if (error?.response?.status && error?.response?.data){
        handleApiErrorResponses(error.response.status, error.response.data)
      }
      else {
        Alert.alert('Erro interno do servidor', 'Ocorreu um erro ao solicitar a análise')
      }
    })

  }

  return (!isLoaded || isLoadingCompanyData ?

    <View style={loadingStyles.loadingContainer}>
      <Loading />
    </View>

    :

    <>
      <Header navigation={navigation}/>

      <View style={styles.container}>
        <Text style={styles.title}>Solicitar avaliação</Text>

        <View style={styles.formContainer}>
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
              editable={false}
            />
          </View>

          <View >
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
              editable={false}
              multiline={true}
              numberOfLines={3}
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
          <TouchableOpacity style={styles.cancelButton} onPress={() => {
            router.back()
            clearInputs()
          }}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default AnalysisRequestForm