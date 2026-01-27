import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Stack, useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import { Chip, IconButton } from 'react-native-paper';
import { api } from '../../lib/axios';
import { useAuth } from '../../hooks/useAuth';
import Loading from '../../components/loading';
import { formatDate } from '../../utils/formatters';
import { styles } from '../../styles/requestDetailsStyles';

const RequestDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { handleUnauthorizedRequest } = useAuth();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRequest = async () => {
    setLoading(true);
    const response = await api
      .get(`/requests/${id}/`)
      .then((response) => {
        setRequest(response?.data?.analysisRequest);
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

  useFocusEffect(
    React.useCallback(() => {
      if (id) {
        fetchRequest();
      }
    }, [id])
  );

  const handleDelete = () => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta solicitação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const response = await api
              .delete(`/requests/${id}/`)
              .then((response) => {
                Alert.alert('Sucesso', 'Solicitação excluída com sucesso');
                router.back();
                return { status: response?.status, data: response?.data };
              })
              .catch((error) => {
                if (error?.response?.status === 401) {
                  handleUnauthorizedRequest();
                } else {
                  Alert.alert('Erro', 'Não foi possível excluir a solicitação');
                }
                return { status: error?.response?.status, data: error?.response?.data };
              });
          },
        },
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return '#FF9800';
      case 'Approved':
        return '#189A46';
      case 'Rejected':
        return '#d32f2f';
      case 'In analysis':
        return '#2196F3';
      default:
        return '#757575';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Pending':
        return 'Pendente';
      case 'Approved':
        return 'Aprovado';
      case 'Rejected':
        return 'Rejeitado';
      case 'In analysis':
        return 'Em Análise';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Detalhes da Solicitação',
            headerStyle: { backgroundColor: '#189A46' },
            headerTintColor: '#fff',
          }}
        />
        <Loading />
      </View>
    );
  }

  if (!request) {
    return (
      <View style={styles.errorContainer}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Solicitação não encontrada',
            headerStyle: { backgroundColor: '#189A46' },
            headerTintColor: '#fff',
          }}
        />
        <Text style={styles.errorText}>Solicitação não encontrada</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Detalhes da Solicitação',
          headerStyle: { backgroundColor: '#189A46' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
          headerRight: () =>
            request.status === 'Pending' || request.status === 'In analysis' ? (
              <View style={{ flexDirection: 'row' }}>
                <IconButton
                  icon="pencil"
                  iconColor="#fff"
                  size={24}
                  onPress={() => router.push(`/requests/${id}/edit`)}
                />
                <IconButton
                  icon="delete"
                  iconColor="#fff"
                  size={24}
                  onPress={handleDelete}
                />
              </View>
            ) : null,
        }}
      />

      <ScrollView style={styles.container}>
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Status da Solicitação</Text>
          <Chip
            mode="flat"
            style={[
              styles.statusChip,
              { backgroundColor: getStatusColor(request.status) },
            ]}
            textStyle={styles.statusChipText}
          >
            {getStatusText(request.status)}
          </Chip>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações da Empresa</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.value}>
              {request.company?.tradeName || request.company?.name || 'N/A'}
            </Text>
          </View>
          {request.company?.legalName && request.company.legalName !== request.company.name && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Razão Social:</Text>
              <Text style={styles.value}>{request.company.legalName}</Text>
            </View>
          )}
          <View style={styles.infoRow}>
            <Text style={styles.label}>CNPJ:</Text>
            <Text style={styles.value}>{request.company?.cnpj || 'N/A'}</Text>
          </View>
          {request.company?.industry && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Setor:</Text>
              <Text style={styles.value}>{request.company.industry}</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações da Solicitação</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Solicitado em:</Text>
            <Text style={styles.value}>{formatDate(request.createdAt)}</Text>
          </View>
          {request.updatedAt && request.updatedAt !== request.createdAt && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Atualizado em:</Text>
              <Text style={styles.value}>{formatDate(request.updatedAt)}</Text>
            </View>
          )}
          <View style={styles.infoRow}>
            <Text style={styles.label}>ID da Solicitação:</Text>
            <Text style={styles.value} numberOfLines={1}>{request._id}</Text>
          </View>
        </View>

        {request.motive && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Motivo da Solicitação</Text>
            <Text style={styles.motiveText}>{request.motive}</Text>
          </View>
        )}

        {request.analyst && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Analista Responsável</Text>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Nome:</Text>
              <Text style={styles.value}>{request.analyst.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{request.analyst.email}</Text>
            </View>
          </View>
        )}

        {request.status === 'Approved' && request.analysis && (
          <View style={styles.section}>
            <TouchableOpacity
              style={styles.analysisButton}
              onPress={() => router.push(`/company/${request.company._id}`)}
            >
              <Text style={styles.analysisButtonText}>Ver Análise Completa</Text>
              <IconButton icon="arrow-right" iconColor="#fff" size={20} />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default RequestDetails;
