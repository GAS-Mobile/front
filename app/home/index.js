import React, { useState, useEffect,  } from 'react'
import { View, ActivityIndicator, ScrollView } from 'react-native'
import { TextInput, IconButton, Chip } from 'react-native-paper'
import Header from '../../components/header'
import CompanyCard from '../../components/companyCard'
import { styles } from '../../styles/homeStyles'
import { api } from '../../lib/axios'

const Home = ({ navigation }) => {
  const [data, setData] = useState({companies: [], info: {}})
  const [isLoaded, setIsLoaded] = useState(false)
  const [filterSelected, setFilterSelected] = useState('')
  const [searchInputText, setSearchInputText] = useState('')
  const [isLoadingCompanies , setIsLoadingCompanies] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchCompanies = async (page, limit, filter, query) => {
    setIsLoadingCompanies(true)   
    let baseUrl = '/companies'
    let params = { page, limit }

    if (filter || query){
      baseUrl += '/search'

      if (filter){
        params = {
          ...params,
          sort: `${filter === 'worstCompanies' ? 'asc' : filter === 'bestCompanies' ? 'desc' : ''}`
        }
      }
      if (searchInputText){
        params = {
          ...params,
          q: searchInputText
        }
      }
    }

    let response = await api.get(baseUrl, { params })
    .then(response => {
      setData(prevData => ({
        info: {...response?.data?.info},
        companies: [
          ...prevData.companies,
          ...response?.data?.companies
        ]
      }))      
      return {status: response?.status, data: response?.data}
    })
    .catch(error => {
      return {status: error?.response?.status, data: error?.response?.data}
    })
    
    setTimeout(() => setIsLoadingCompanies(false), 300)
    return response
  }

  const handleSubmitSearch = () => {
    const hasCharsInSearchInput = (/\w/).test(searchInputText)
    if (hasCharsInSearchInput) {
      setData({companies: [], info: {}})
      fetchCompanies(1, 10, filterSelected, searchInputText)
      setCurrentPage(1)
    }
  }

  const handleClearSearchInput = () => {
    setSearchInputText('')
    setData({companies: [], info: {}})
    fetchCompanies(1, 10, filterSelected, '')
    setCurrentPage(1) 
  }

  const handleFilterChange = (filterName) => {
    if (filterSelected === filterName){
      setFilterSelected('')
    }
    else {
      setFilterSelected(filterName)
    }
    setData({companies: [], info: {}}) 
    setCurrentPage(1)
  }

  const handleEndReached = () => {
    if (currentPage < data?.info?.totalPages && data.companies.length > 0 && !isLoadingCompanies) {
      setCurrentPage(prevState => prevState + 1)
    }
  }

  useEffect(() => {
    if(isLoaded) {
      if ((currentPage === 1 || currentPage <= data?.info?.totalPages) && !isLoadingCompanies ) {
        fetchCompanies(currentPage, 10, filterSelected, searchInputText)
      }
    }
    else {
      setIsLoaded(true)
    }
  }, [isLoaded, currentPage, filterSelected])

  return (
    <View>
      <Header navigation={navigation}/>

      <View style={styles.container}>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder='Buscar empresa'
            value={searchInputText}
            onChangeText={(textInput) => setSearchInputText(textInput)}
            mode='outlined'
            activeOutlineColor='#75B28B'
            outlineColor='#C7C7C7'
            theme={{ roundness: 25 }} 
            inputMode='search'
            maxLength={18}
            right={
              <TextInput.Icon icon="close-circle" 
                onPress={handleClearSearchInput} 
                style={styles.clearSearchInputIcon}
                color='#C7C7C7'
              />
            }
            disabled={isLoadingCompanies}
          />
          <IconButton
            style={styles.searchButton}
            icon="magnify"
            iconColor="#159B46"
            containerColor="#FFFFFF"
            size={32}
            onPress={handleSubmitSearch}
            mode="contained"
            disabled={isLoadingCompanies}
            theme={{ 
              colors: { surfaceDisabled: '#fff'}
             }}
          />
        </View>
        <View style={styles.filtersContainer}>
          <Chip 
            style={filterSelected !== 'bestCompanies' ? styles.filterChip : styles.filterChipSelected}
            onPressIn={ () => handleFilterChange('bestCompanies')}
            mode='outlined'
            textStyle={styles.filterChipText}
            disabled={isLoadingCompanies}
          > 
            Melhores empresas
          </Chip>
          <Chip 
            style={filterSelected !== 'worstCompanies' ? styles.filterChip : styles.filterChipSelected}
            onPressIn={ () => handleFilterChange('worstCompanies')}
            mode='outlined'
            textStyle={styles.filterChipText}
            disabled={isLoadingCompanies}
          > 
            Piores empresas
          </Chip>
          <IconButton
            style={styles.showMoreFiltersButton}
            icon="filter-menu-outline"
            iconColor="#fff"
            size={24}
            onPress={() => console.log('showMoreFiltersButton pressed')}
          />
        </View>
        
        <View style={styles.companiesListContainer}>
          <ScrollView
            onScroll={({ nativeEvent }) => {
              const offsetY = nativeEvent.contentOffset.y;
              const contentHeight = nativeEvent.contentSize.height;
              const windowHeight = nativeEvent.layoutMeasurement.height;

              if (offsetY + windowHeight >= contentHeight - 10) {
                handleEndReached()
              }
            }}
            scrollEventThrottle={400}
          >
            {data.companies.map((company, index) => (
              <CompanyCard company={company} key={index}/>
            ))}
            {isLoadingCompanies && (
              <View style={styles.loading}>
                <ActivityIndicator color="#159B46" size={'large'}/>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </View>
  ) 
}

export default Home