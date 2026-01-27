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
import { api } from '../../../lib/axios';
import { useAuth } from '../../../hooks/useAuth';
import Loading from '../../../components/loading';
import { styles } from '../../../styles/analysisRequestStyle';

const EditRequest = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { handleUnauthorizedRequest } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [cnpj, setCnpj] = useState('');
  const [branchLocation, setBranchLocation] = useState('');
  const [motive, setMotive] = useState('');
  const [errors, setErrors] = useState({
    motive: false,
  });

  const fetchRequest = async () => {
    const response = await api
      .get(`/requests/${id}/`)
      .then((response) => {
        const request = response?.data?.analysisRequest;
        setCnpj(request.company?.cnpj || '');
        
        if (request.company?.headquartersLocation) {
          const loc = request.company.headquartersLocation;
          setBranchLocation(
            `${loc.street || ''}, ${loc.city || ''}. CEP: ${loc.postalCode || ''}. ${
              loc.city || ''
            } - ${loc.state || ''}.`
          );
        }
        
        setMotive(request.motive || '');
        return { status: response?.status, data: response?.data };
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          handleUnauthorizedRequest();
        } else {
          Alert.alert('Erro', 'Não foi possível carregar a solicitação');
          router.back();
        }
        return { status: error?.response?.status, data: error?.response?.data };
      });
    setLoading(false);
    return response;
  };

  useEffect(() => {
    if (id) {
      fetchRequest();
    }
  }, [id]);

  const handleSave = async () => {
    setErrors({ motive: false });
    const hasCharsInMotive = /\w/.test(motive);

    if (!motive || !hasCharsInMotive) {
      setErrors({ motive: true });
      Alert.alert(
        'Campo Obrigatório',
        'O motivo da solicitação é obrigatório.'
      );
      return;
    }

    setSaving(true);

    const updatedRequest = {
      motive: motive,
    };

    api
      .put(`/requests/${id}/`, { analysisRequest: updatedRequest })
      .then((response) => {
        setSaving(false);
        Alert.alert(
          'Sucesso',
          'Solicitação atualizada com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => router.back(),
            },
          ]
        );
      })
      .catch((error) => {
        setSaving(false);
        console.error('Erro ao atualizar:', error.response?.data);
        if (error?.response?.status === 401) {
          handleUnauthorizedRequest();
        } else if (error?.response?.status === 403) {
          Alert.alert(
            'Acesso negado',
            'Você não tem permissão para editar esta solicitação.'
          );
        } else if (error?.response?.status === 400) {
          Alert.alert(
            'Erro',
            error?.response?.data?.message || 'Não foi possível atualizar a solicitação'
          );
        } else {
          Alert.alert('Erro', 'Não foi possível atualizar a solicitação');
        }
      });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Editar Solicitação',
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
          title: 'Editar Solicitação',
          headerStyle: { backgroundColor: '#189A46' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
        }}
      />

      <ScrollView style={styles.container}>
        <Text style={styles.title}>Editar solicitação</Text>
        <Text style={styles.subtitle}>
          Você pode alterar o motivo da sua solicitação
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
            onPress={() => router.back()}
            disabled={saving}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#fff" size={20} />
            ) : (
              <Text style={styles.buttonText}>Salvar Alterações</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditRequest;
