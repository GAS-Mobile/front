import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  companyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: '#DADADA',
    borderBottomWidth: 1,
  },
  companyData: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '75%'
  },
  companyTextInfo: {
    width: '60%'
  },
  companyName:{
    fontWeight: 700
  },
  companyGoodScore: {
    color: '#159B46'
  },
  companyNeutralScore: {
    color: '#000'
  },
  companyBadScore: {
    color: '#FF0000'
  },
  companyLastAnalysisDate: {
    color: '#7E797F',
    marginTop: 5,
  },
  showCompanyDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
  showCompanyDetailsText: {
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline'
  },
  showCompanyDetailsIcon: {
    margin: 0,
    padding: 0,
  },
})