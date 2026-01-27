import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInputWrapper: {
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#fff',
    fontSize: 15,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  filterChip: {
    borderRadius: 20,
    backgroundColor: '#fff',
    borderColor: '#189A46',
    borderWidth: 1,
  },
  filterChipSelected: {
    backgroundColor: '#189A46',
    borderColor: '#189A46',
  },
  filterChipText: {
    color: '#189A46',
    fontSize: 13,
    fontWeight: '500',
  },
  filterChipTextSelected: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  companiesContainer: {
    padding: 16,
    gap: 12,
  },
  loaderContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#999',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
  },
  drawerContainer: {
    width: '80%',
    height: '100%',
    backgroundColor: '#fff',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});