import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  subHeader: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 10,
  },
  subHeaderBackButtonIcon: {
    justifyContent: 'flex-start',
    width: '10%',
  },
  subHeaderText: {
    width: '80%',
    fontSize: 20,
    fontWeight: '600',
    color: '#159B46',
    textAlign: 'center',
    alignSelf: 'center',
  },
  container: {
    backgroundColor: '#F2F2F2',
    height: '100%',
    width: '100%',
    gap: 12,
  },
  companyBanner: {
    backgroundColor: '#75B28B',
    width: '100%',
    height: '12%',
    flexDirection: 'row',
    paddingTop: 45,
    marginBottom: '16%',
    gap: 10,
    paddingHorizontal: 20,
  },
  companyName: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center',
  },
  companyAboutSection: {
    paddingHorizontal: 32,
    gap: 8,
    marginBottom: 30,
  },
  sectionTitle: {
    fontWeight: '600',
    color: '#000',
    fontSize: 16
  },
  sectionText: {
    color: '#000',
    fontSize: 16
  },
  companyAboutText: {
    textAlign: 'justify',
    fontSize: 16
  },
  companyDefaultSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 32,
    width: '80%',
    borderBottomWidth: 0.8,
    borderColor: 'rgba(126, 121, 127, 0.4)',
    paddingBottom: 12
  },
  companyGoodStatus: {
    color: '#159B46',
    fontSize: 16
  },
  companyNeutralStatus: {
    color: '#000',
    fontSize: 16
  },
  companyBadStatus: {
    color: '#FF0000',
    fontSize: 16
  },
  button:{
    backgroundColor: '#189A46',
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
    borderColor: '#fff',
    width: '48%',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 70,
  },
  buttonText:{
    fontWeight: '500',
    fontSize: 16,
    color: '#fff',
  },
})