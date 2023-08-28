import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { TextInput, Appbar, List, Avatar } from 'react-native-paper';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('');

  const handleSearch = () => {
    Alert.alert('Search', `Searching for: ${searchQuery}`);
  };

  const handleFilter = (type) => {
    setFilterType(type);
  };

  const mockCompanies = [
    { id: 1, name: 'Colgatex', rating: 4.5 },
    { id: 2, name: 'Coque Cole', rating: 3.8 },
    { id: 3, name: 'Pepsu', rating: 2.5 },
  ];

  return (
    <View style={styles.container}>
      {/* Header with logo */}

      <Appbar.Header  style={styles.Header} >
        <Avatar.Image size={50} source={require('../assets/logo-inital-screen.png')} />
      </Appbar.Header>

      {/* Search input and button */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar empresa"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {/* Filter buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => handleFilter('best')} style={styles.filterButton}>
          <Text style={filterType === 'best' ? styles.activeFilterText : styles.filterText}>Melhores empresas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleFilter('worst')} style={styles.filterButton}>
          <Text style={filterType === 'worst' ? styles.activeFilterText : styles.filterText}>Piores empresas</Text>
        </TouchableOpacity>
      </View>

      {/* List of companies */}
      <View style={styles.listContainer}>
        <List.Section>
          {mockCompanies.map(company => (
            <List.Item
              key={company.id}
              title={company.name}
              description={`Rating: ${company.rating}`}
              left={() => <List.Icon icon="briefcase" />}
            />
          ))}
        </List.Section>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C6E49',
  },
  Header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: '#DCDCDC',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  buttonText: {
    color: 'black',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
  },
  filterText: {
    color: 'white',
  },
  activeFilterText: {
    color: 'yellow',
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 16,
    width: '85%', // Adjusted width
    alignSelf: 'center', // Center horizontally
  },
});

export default Home;
