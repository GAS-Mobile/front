import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import {IconButton, Avatar } from 'react-native-paper'
import { styles } from '../styles/companyCardStyles'
import { formatDate } from '../utils/formatters'
import { useRouter } from 'expo-router';

const CompanyCard = ({company}) => {
  const navigation = useRouter()

  const chooseStyleBasedOnScore = () => {
    return company.score <= 4 
    ?
    styles.companyBadScore
    :
    company.score <=7 ? styles.companyNeutralScore : styles.companyGoodScore
  }

  const evaluateCompanyBasedOnScore = () => {
    return company.score <= 4 
    ?
    'Avaliação negativa'
    :
    company.score <=7 ? 'Posição neutra' : 'Avaliação positiva'
  }
  
  return (
    <View style={styles.companyContainer}>
      <View style={styles.companyData}>
        <Avatar.Image size={50} source={require('../assets/company-logo-default.png')} />
        <View style={styles.companyTextInfo}>
          <Text style={styles.companyName}>{company.name.toUpperCase()}</Text>
          {
            company.lastAnalysisDate === null ? 
            <></>
            :
            <Text style={chooseStyleBasedOnScore()}>{evaluateCompanyBasedOnScore()}</Text>
          }
          <Text style={styles.companyLastAnalysisDate}>
            { company.lastAnalysisDate === null ? 
            'Não possui avaliações'
            :
            `Avaliada em ${formatDate(company.lastAnalysisDate)}`
            }
          </Text>
        </View>

      </View>

      <TouchableOpacity onPress={() => {
        navigation.push(`companies/${company._id}`)
      }} style={styles.showCompanyDetailsButton}>

        <Text style={styles.showCompanyDetailsText}>{'Acessar\ndetalhes'}</Text>
        <IconButton
          style={styles.showCompanyDetailsIcon}
          icon="plus-circle-outline"
          size={24}
          theme={{ colors: { onSurfaceDisabled: '#000' } }}
          disabled
        />
      </TouchableOpacity>
    </View>
  )
}

export default CompanyCard