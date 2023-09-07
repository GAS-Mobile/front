import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    height: '100%',
    width: '100%',
  },
  searchBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#159B46',
    width: '100%',
    paddingHorizontal: 24,
    paddingVertical: 10,
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    width: '85%',
    fontSize: 16,
    lineHeight: 32,
    height: 42,
  },
  clearSearchInputIcon: {
    margin: 0,
    marginTop: 8,
    marginLeft: 10,
  },
  searchButton : {
    width: '15%',
    borderWidth: 1.2,
    borderColor: '#C7C7C7',
    borderRadius: 50,
    height: 44,
    margin: 0,
    marginTop: 6
  },
  filtersContainer: {
    flexDirection: 'row',
    backgroundColor: '#75B28B',
    width: '100%',
    paddingVertical: 6,
    paddingHorizontal: 20,
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterChip: {
    borderRadius: 50,
    backgroundColor: 'transparent',
    color: '#fff',
    borderColor: '#fff',
  },
  filterChipSelected: {
    borderRadius: 50,
    backgroundColor: '#159B46',
    color: '#fff',
    borderColor: '#fff',
  },
  filterChipText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 600
  },
  showMoreFiltersButton: {
    margin: 0,
    padding: 0,
  },
  companiesListContainer: {
    paddingVertical: 12,
    height: '64%',
  }
})