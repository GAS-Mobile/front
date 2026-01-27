import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { TextInput } from 'react-native-paper';
import { validateCnpj } from '../utils/validators';
import { api } from '../lib/axios';
import { useAuth } from '../hooks/useAuth';
import Loading from '../components/loading';
import { styles } from '../styles/analysisRequestStyle';

const AnalysisRequest = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoadingCompanyData, setIsLoadingCompanyData] = useState(false);
  const { user, handleUnauthorizedRequest } = useAuth();
  const [cnpj, setCnpj] = useState('');
  const [branchLocation, setBranchLocation] = useState('');
  const [motive, setMotive] = useState('');
  const [waitingRequestResponse, setWaitingRequestResponse] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();

  const fetchCompanyData = async () => {
    if (!params?.companyID) return;

    setIsLoadingCompanyData(true);

    const response = await api
      .get(`/companies/${params.companyID}/`)
      .then((response) => {
        const company = response?.data?.company;
        setCnpj(company?.cnpj || '');
        
        if (company?.headquartersLocation) {
          const loc = company.headquartersLocation;
          setBranchLocation(
            `${loc.street || ''}, ${loc.city || ''}. CEP: ${loc.postalCode || ''}. ${
              loc.city || ''
            } - ${loc.state || ''}.`
          );
        }

        return { status: response?.status, data: response?.data };
      })
      .catch((error) => {
        return { status: error?.response?.status, data: error?.response?.data };
      });

    setIsLoadingCompanyData(false);
    return response;
  };

  useEffect(() => {
    if (isLoaded && !isLoadingCompanyData) {
      fetchCompanyData();
    } else {
      setIsLoaded(true);
    }
  }, [isLoaded]);

  const [errors, setErrors] = useState({
    cnpj: false,
    branchLocation: false,
    motive: false,
  });

  const clearInputs = () => {
    setCnpj('');
    setBranchLocation('');
    setMotive('');
  };

  const handleApiErrorResponses = (statusCode, responseData) => {
    switch (statusCode) {
      case 400:
        Alert.alert(
          'Erro',
          'Para criar uma solicitação de análise, é necessário enviar o ID do cliente, o CNPJ da empresa e o motivo da solicitação de análise'
        );
        break;
      case 401:
        handleUnauthorizedRequest();
        break;
      case 403:
        Alert.alert('Acesso negado', 'Você não tem permissão para acessar esta rota.');
        break;
      case 404:
        const notFoundMessage =
          responseData.message === 'Customer not found'
            ? 'Cliente não encontrado'
            : 'Empresa não encontrada';
        Alert.alert('Não encontrado', notFoundMessage);
        break;
      case 409:
        const conflictMessage =
          responseData.message ===
          'A similar analysis request for this customer and company is already under analysis'
            ? 'Uma solicitação de análise similar para este cliente e empresa já está em análise'
            : 'Existe uma análise em andamento para a solicitação aprovada deste cliente e empresa que ainda não foi concluída';
        Alert.alert('Conflito', conflictMessage);
        break;
      case 500:
        Alert.alert('Erro interno do servidor', 'Ocorreu um erro ao solicitar a análise');
        break;
    }
  };

  const handleSend = async () => {
    setErrors({
      cnpj: false,
      branchLocation: false,
      motive: false,
    });
    const hasCharsInMotive = /\w/.test(motive);

    if (!cnpj || !branchLocation || !motive || !hasCharsInMotive) {
      setErrors({
        cnpj: !cnpj,
        branchLocation: !branchLocation,
        motive: !motive,
      });
      Alert.alert(
        'Campos Obrigatórios',
        'Para realizar a solicitação de análise é necessário preencher todos os campos.'
      );
      return;
    }

    if (!validateCnpj(cnpj)) {
      setErrors((prevState) => ({
        ...prevState,
        cnpj: true,
      }));
      Alert.alert(
        'CNPJ Inválido',
        'O CNPJ fornecido é inválido. Por favor, insira um CNPJ válido.'
      );
      return;
    }

    const analysisRequest = {
      customerID: user?.customer?._id,
      companyCNPJ: cnpj,
      motive: motive,
    };

    setWaitingRequestResponse(true);

    api
      .post('/requests/create/', { analysisRequest })
      .then((response) => {
        setWaitingRequestResponse(false);
        Alert.alert(
          'Solicitação bem-sucedida',
          'Parabéns! Você realizou a solicitação de análise com sucesso.'
        );
        clearInputs();
        router.back();
      })
      .catch((error) => {
        setWaitingRequestResponse(false);
        if (error?.response?.status && error?.response?.data) {
          handleApiErrorResponses(error.response.status, error.response.data);
        } else {
          Alert.alert('Erro interno do servidor', 'Ocorreu um erro ao solicitar a análise');
        }
      });
  };

  if (!isLoaded || isLoadingCompanyData) {
    return (
      <View style={styles.loadingContainer}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Solicitar Avaliação',
            headerStyle: { backgroundColor: '#189A46' },
            headerTintColor: '#fff',
          }}
        />
        <Loading />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Solicitar Avaliação',
          headerStyle: { backgroundColor: '#189A46' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
        }}
      />

      <ScrollView style={styles.container}>
        <Text style={styles.title}>Solicitar avaliação</Text>
        <Text style={styles.subtitle}>
          Preencha os campos abaixo para solicitar uma análise da empresa
        </Text>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>CNPJ da Empresa</Text>
            <TextInput
              style={styles.input}
              placeholder="CNPJ da empresa"
              value={cnpj}
              mode="outlined"
              activeOutlineColor="#189A46"
              outlineColor="#ddd"
              error={errors.cnpj}
              editable={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Filial/Localização</Text>
            <TextInput
              style={styles.input}
              placeholder="Filial/Localização exata"
              value={branchLocation}
              mode="outlined"
              activeOutlineColor="#189A46"
              outlineColor="#ddd"
              error={errors.branchLocation}
              editable={false}
              multiline={true}
              numberOfLines={3}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Motivo da Solicitação *</Text>
            <TextInput
              style={styles.input}
              placeholder="Descreva o motivo da solicitação..."
              value={motive}
              onChangeText={(textInput) => setMotive(textInput)}
              mode="outlined"
              activeOutlineColor="#189A46"
              outlineColor="#ddd"
              error={errors.motive}
              multiline={true}
              numberOfLines={8}
            />
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              router.back();
              clearInputs();
            }}
            disabled={waitingRequestResponse}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSend}
            disabled={waitingRequestResponse}
          >
            {waitingRequestResponse ? (
              <ActivityIndicator color="#fff" size={20} />
            ) : (
              <Text style={styles.buttonText}>Enviar Solicitação</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AnalysisRequest;
