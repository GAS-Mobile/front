import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  companyBannerBackground: {
    backgroundColor: '#189A46',
    width: '100%',
    height: 140,
    paddingHorizontal: 20,
    marginBottom: 70,
  },
  companyBannerData: {
    width: '100%',
    flexDirection: 'row',
    paddingTop: 50,
    gap: 12,
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: '#fff',
    elevation: 3,
  },
  companyName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  companyAboutSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#fff',
    marginBottom: 2,
    paddingTop: 16,
  },
  sectionTitle: {
    fontWeight: '700',
    color: '#333',
    fontSize: 14,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  sectionText: {
    color: '#666',
    fontSize: 15,
    fontWeight: '500',
  },
  companyAboutText: {
    textAlign: 'justify',
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  companyDefaultSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 0,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  companyGoodStatus: {
    color: '#189A46',
    fontSize: 15,
    fontWeight: '700',
  },
  companyNeutralStatus: {
    color: '#FF9800',
    fontSize: 15,
    fontWeight: '700',
  },
  companyBadStatus: {
    color: '#d32f2f',
    fontSize: 15,
    fontWeight: '700',
  },
  buttonContainer: {
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: '#f5f5f5',
  },
  button: {
    backgroundColor: '#189A46',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    elevation: 2,
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
    color: '#fff',
    letterSpacing: 0.5,
  },
})