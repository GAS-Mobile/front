import React, { useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator, Modal, TouchableOpacity, Text as RNText } from 'react-native';
import { Stack } from 'expo-router';
import { TextInput, Chip } from 'react-native-paper';
import { api } from '../lib/axios';
import { useAuth } from '../hooks/useAuth';
import CompanyCard from '../components/companyCard';
import Header from '../components/header';
import DrawerContent from '../components/drawerContent';
import { styles } from '../styles/homeStyles';

const Home = () => {
  const { handleUnauthorizedRequest } = useAuth();
  const [data, setData] = useState({ companies: [], info: {} });
  const [isLoaded, setIsLoaded] = useState(false);
  const [filterSelected, setFilterSelected] = useState('');
  const [searchInputText, setSearchInputText] = useState('');
  const [isLoadingCompanies, setIsLoadingCompanies] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [drawerVisible, setDrawerVisible] = useState(false);

  const fetchCompanies = async (page, limit, filter, query) => {
    setIsLoadingCompanies(true);
    let baseUrl = '/companies';
    let params = { page, limit };

    if (filter || query) {
      baseUrl += '/search';

      if (filter) {
        params = {
          ...params,
          sort: `${filter === 'worstCompanies' ? 'asc' : filter === 'bestCompanies' ? 'desc' : ''}`,
        };
      }
      if (query) {
        params = {
          ...params,
          q: query,
        };
      }
    }

    let response = await api
      .get(baseUrl, { params })
      .then((response) => {
        setData((prevData) => ({
          info: { ...response?.data?.info },
          companies: page === 1 ? response?.data?.companies : [...prevData.companies, ...response?.data?.companies],
        }));
        return { status: response?.status, data: response?.data };
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          handleUnauthorizedRequest();
        }
        return { status: error?.response?.status, data: error?.response?.data };
      });

    setTimeout(() => setIsLoadingCompanies(false), 300);
    return response;
  };

  const handleSubmitSearch = () => {
    const hasCharsInSearchInput = /\w/.test(searchInputText);
    if (hasCharsInSearchInput) {
      setData({ companies: [], info: {} });
      setCurrentPage(1);
      fetchCompanies(1, 10, filterSelected, searchInputText);
    }
  };

  const handleClearSearchInput = () => {
    setSearchInputText('');
    setData({ companies: [], info: {} });
    setCurrentPage(1);
    fetchCompanies(1, 10, filterSelected, '');
  };

  const handleFilterChange = (filterName) => {
    const newFilter = filterSelected === filterName ? '' : filterName;
    setFilterSelected(newFilter);
    setData({ companies: [], info: {} });
    setCurrentPage(1);
    setTimeout(() => {
      fetchCompanies(1, 10, newFilter, searchInputText);
    }, 100);
  };

  const handleEndReached = () => {
    if (currentPage < data?.info?.totalPages && data.companies.length > 0 && !isLoadingCompanies) {
      setCurrentPage((prevState) => prevState + 1);
    }
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  useEffect(() => {
    if (isLoaded) {
      if ((currentPage === 1 || currentPage <= data?.info?.totalPages) && !isLoadingCompanies) {
        fetchCompanies(currentPage, 10, filterSelected, searchInputText);
      }
    } else {
      setIsLoaded(true);
    }
  }, [isLoaded, currentPage]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      
      <Header onMenuPress={toggleDrawer} />

      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <TextInput
            style={styles.searchInput}
            mode="outlined"
            placeholder="Buscar empresa"
            placeholderTextColor="#999"
            value={searchInputText}
            onChangeText={setSearchInputText}
            onSubmitEditing={handleSubmitSearch}
            outlineColor="#ddd"
            activeOutlineColor="#189A46"
            right={
              searchInputText ? (
                <TextInput.Icon icon="close" onPress={handleClearSearchInput} />
              ) : (
                <TextInput.Icon icon="magnify" onPress={handleSubmitSearch} />
              )
            }
          />
        </View>

        <View style={styles.filtersContainer}>
          <Chip
            selected={filterSelected === 'bestCompanies'}
            onPress={() => handleFilterChange('bestCompanies')}
            style={[
              styles.filterChip,
              filterSelected === 'bestCompanies' && styles.filterChipSelected
            ]}
            textStyle={filterSelected === 'bestCompanies' ? styles.filterChipTextSelected : styles.filterChipText}
            mode={filterSelected === 'bestCompanies' ? 'flat' : 'outlined'}
          >
            Melhores
          </Chip>
          <Chip
            selected={filterSelected === 'worstCompanies'}
            onPress={() => handleFilterChange('worstCompanies')}
            style={[
              styles.filterChip,
              filterSelected === 'worstCompanies' && styles.filterChipSelected
            ]}
            textStyle={filterSelected === 'worstCompanies' ? styles.filterChipTextSelected : styles.filterChipText}
            mode={filterSelected === 'worstCompanies' ? 'flat' : 'outlined'}
          >
            Piores
          </Chip>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
          if (isCloseToBottom) {
            handleEndReached();
          }
        }}
        scrollEventThrottle={400}
      >
        <View style={styles.companiesContainer}>
          {data.companies.length === 0 && !isLoadingCompanies && isLoaded && (
            <View style={styles.emptyState}>
              <RNText style={styles.emptyStateText}>Nenhuma empresa encontrada</RNText>
            </View>
          )}
          {data.companies.map((company) => (
            <CompanyCard key={company._id} company={company} />
          ))}
          {isLoadingCompanies && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#189A46" />
            </View>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={drawerVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleDrawer}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={toggleDrawer}
        >
          <TouchableOpacity
            style={styles.drawerContainer}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <DrawerContent onClose={toggleDrawer} />
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Home;
