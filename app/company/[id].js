import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Avatar, IconButton } from 'react-native-paper';
import { api } from '../../lib/axios';
import { useAuth } from '../../hooks/useAuth';
import { formatDate } from '../../utils/formatters';
import Loading from '../../components/loading';
import { styles } from '../../styles/companyProfileStyles';

const CompanyProfile = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { handleUnauthorizedRequest } = useAuth();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const chooseStatusStyleBasedOnScore = () => {
    if (!company?.score) return styles.sectionText;
    return company.score <= 4
      ? styles.companyBadStatus
      : company.score <= 7
      ? styles.companyNeutralStatus
      : styles.companyGoodStatus;
  };

  const chooseStatusTextBasedOnScore = () => {
    if (!company?.score) return 'Não avaliado';
    return company.score <= 4
      ? 'Negativo'
      : company.score <= 7
      ? 'Neutro'
      : 'Positivo';
  };

  const fetchCompany = async () => {
    setLoading(true);
    const response = await api
      .get(`/companies/${id}/`)
      .then((response) => {
        setCompany(response?.data?.company);
        return { status: response?.status, data: response?.data };
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          handleUnauthorizedRequest();
        }
        return { status: error?.response?.status, data: error?.response?.data };
      });
    setLoading(false);
    return response;
  };

  useEffect(() => {
    if (id) {
      fetchCompany();
    }
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Loading />
      </View>
    );
  }

  if (!company) {
    return (
      <View style={styles.errorContainer}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Empresa não encontrada',
            headerStyle: { backgroundColor: '#189A46' },
            headerTintColor: '#fff',
          }}
        />
        <Text style={styles.errorText}>Empresa não encontrada</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Perfil da empresa',
          headerStyle: { backgroundColor: '#189A46' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
        }}
      />

      <ScrollView style={styles.container}>
        <View style={styles.companyBannerBackground}>
          <View style={styles.companyBannerData}>
            <Avatar.Image
              size={120}
              source={require('../../assets/company-logo-default.png')}
              style={styles.avatar}
            />
            <Text style={styles.companyName}>{company.tradeName || company.name}</Text>
          </View>
        </View>

        <View style={styles.companyAboutSection}>
          <Text style={styles.sectionTitle}>SOBRE</Text>
          <Text style={styles.companyAboutText}>
            {company.description ||
              'Informações sobre a empresa serão exibidas aqui quando disponíveis.'}
          </Text>
        </View>

        <View style={styles.companyDefaultSection}>
          <Text style={styles.sectionTitle}>Razão Social</Text>
          <Text style={styles.sectionText}>{company.legalName || company.name}</Text>
        </View>

        <View style={styles.companyDefaultSection}>
          <Text style={styles.sectionTitle}>CNPJ</Text>
          <Text style={styles.sectionText}>{company.cnpj}</Text>
        </View>

        {company.lastAnalysisDate && (
          <View style={styles.companyDefaultSection}>
            <Text style={styles.sectionTitle}>Status atual</Text>
            <Text style={chooseStatusStyleBasedOnScore()}>
              {chooseStatusTextBasedOnScore()}
            </Text>
          </View>
        )}

        {company.lastAnalysisDate ? (
          <View style={styles.companyDefaultSection}>
            <Text style={styles.sectionTitle}>Última avaliação</Text>
            <Text style={styles.sectionText}>{formatDate(company.lastAnalysisDate)}</Text>
          </View>
        ) : (
          <View style={styles.companyDefaultSection}>
            <Text style={styles.sectionTitle}>Não possui avaliações</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              router.push({
                pathname: '/analysis-request',
                params: { companyID: id },
              });
            }}
          >
            <Text style={styles.buttonText}>Solicitar Análise</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CompanyProfile;
