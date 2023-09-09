import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Avatar, IconButton } from 'react-native-paper'
import Header from '../../components/header'
import { styles } from '../../styles/companyProfileStyles'
import { Loading, styles as loadingStyles } from '../../components/loading'
import { api } from '../../lib/axios'
import { useRouter, useSearchParams } from 'expo-router'
import { formatDate } from '../../utils/formatters'

const CompanyProfile = ({ navigation }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [company, setCompany] = useState({})
  const [isLoadingCompanyData, setIsLoadingCompanyData] = useState(false)
  const params = useSearchParams()
  const router = useRouter()

  const chooseStatusStyleBasedOnScore = () => {
    return company.score <= 4 
    ?
    styles.companyBadStatus
    :
    company.score <=7 ? styles.companyNeutralStatus : styles.companyGoodStatus
  }

  const chooseStatusTextBasedOnScore = () => {
    return company.score <= 4 
    ?
    'Negativo'
    :
    company.score <=7 ? 'Neutro' : 'Positivo'
  }

  const fetchCompanyData = async () => {
    setIsLoadingCompanyData(true)
    
    let response = await api.get(`/companies/${params?.companyID}/`)
    .then(response => {
      setCompany(response.data.company)
      return {status: response?.status, data: response?.data}
    })
    .catch(error => {
      return {status: error?.response?.status, data: error?.response?.data}
    })
    //console.log(response)
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

  return (!isLoaded || isLoadingCompanyData ?

    <View style={loadingStyles.loadingContainer}>
      <Loading />
    </View>

    :

    <View>
      <Header navigation={navigation}/>

      <View style={styles.subHeader}>
        <IconButton
          style={styles.subHeaderBackButtonIcon}
          icon="arrow-left"
          size={26}
          iconColor="#159B46"
          onPress={() => router.back()}
        />
        <Text style={styles.subHeaderText}>
          Perfil da empresa
        </Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.companyBannerBackground}>
          <View style={styles.companyBannerData}>
            <Avatar.Image size={120} 
              source={require('../../assets/company-logo-default.png')} 
            />
            <Text style={styles.companyName}>{company.name}</Text>
          </View>
        </View> 
    
        <View style={styles.companyAboutSection}>
          <Text style={styles.sectionTitle}>SOBRE</Text>
          <Text style={styles.companyAboutText}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
          </Text>
        </View>
        {
          company.lastAnalysisDate === null ? 
          <></>
          :
          <View style={styles.companyDefaultSection}>
            <Text style={styles.sectionTitle}>Status atual</Text>
            <Text style={chooseStatusStyleBasedOnScore()}>{chooseStatusTextBasedOnScore()}</Text>
          </View>
        }

        { 
          company.lastAnalysisDate === null ? 
          <View style={styles.companyDefaultSection}>
            <Text style={styles.sectionTitle}>Não possui avaliações</Text>
          </View>
          :
          <View style={styles.companyDefaultSection}>
            <Text style={styles.sectionTitle}>Última avaliação</Text>
            <Text style={styles.sectionText}>{formatDate(company.lastAnalysisDate)}</Text>
          </View>
        }

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={()=> {
              router.push(
              {
                pathname: 'analysisRequest/',
                params: { companyID: params?.companyID }
              })
            }}>
            <Text style={styles.buttonText}>Solicitar Análise</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>

    </View>
  ) 
}

export default CompanyProfile