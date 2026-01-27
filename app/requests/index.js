import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Chip, IconButton } from 'react-native-paper';
import { api } from '../../lib/axios';
import { useAuth } from '../../hooks/useAuth';
import Loading from '../../components/loading';
import { formatDate } from '../../utils/formatters';
import { styles } from '../../styles/requestsListStyles';

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { handleUnauthorizedRequest } = useAuth();
  const router = useRouter();

  const fetchRequests = async () => {
    const response = await api
      .get('/requests/')
      .then((response) => {
        setRequests(response?.data?.analysisRequests || []);
        return { status: response?.status, data: response?.data };
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          handleUnauthorizedRequest();
        }
        return { status: error?.response?.status, data: error?.response?.data };
      });
    setLoading(false);
    setRefreshing(false);
    return response;
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRequests();
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

  const renderRequestCard = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/requests/${item._id}`)}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <View style={{ flex: 1, marginRight: 12 }}>
          <Text style={styles.companyName} numberOfLines={1}>
            {item.company?.tradeName || item.company?.name || 'Empresa'}
          </Text>
        </View>
        <Chip
          mode="flat"
          style={[styles.statusChip, { backgroundColor: getStatusColor(item.status) }]}
          textStyle={styles.statusChipText}
        >
          {getStatusText(item.status)}
        </Chip>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>CNPJ:</Text>
          <Text style={styles.value} numberOfLines={1}>{item.company?.cnpj || 'N/A'}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Solicitado em:</Text>
          <Text style={styles.value}>{formatDate(item.createdAt)}</Text>
        </View>

        {item.updatedAt && item.updatedAt !== item.createdAt && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Atualizado em:</Text>
            <Text style={styles.value}>{formatDate(item.updatedAt)}</Text>
          </View>
        )}

        {item.motive && (
          <View style={styles.motiveContainer}>
            <Text style={styles.label}>Motivo:</Text>
            <Text style={styles.motiveText} numberOfLines={2}>
              {item.motive}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Stack.Screen
          options={{
            headerShown: true,
            title: 'Minhas Solicitações',
            headerStyle: { backgroundColor: '#189A46' },
            headerTintColor: '#fff',
          }}
        />
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Minhas Solicitações',
          headerStyle: { backgroundColor: '#189A46' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '600' },
        }}
      />

      {requests.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Você ainda não possui solicitações</Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => router.push('/home')}
          >
            <Text style={styles.emptyButtonText}>Buscar empresas</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={requests}
          renderItem={renderRequestCard}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#189A46']}
              tintColor="#189A46"
            />
          }
        />
      )}
    </View>
  );
};

export default RequestsList;
