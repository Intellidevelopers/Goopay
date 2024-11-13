import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import colors from '../components/colors';

const Card = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Cards</Text>
        <View style={styles.headerIcons}>
          <MaterialCommunityIcons name='bell-badge' size={26} style={styles.bell} />
          <MaterialIcons name="wifi-tethering" size={24} color="gray" />
        </View>
      </View>

      {/* Active Card Section */}
      <View style={styles.createHeading}>
        <Text style={styles.sectionTitle1}>Active Cards</Text>
        <TouchableOpacity>
          <Ionicons name='add-circle-outline' color={'gray'} size={30} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.cardContainer} onPress={() => navigation.navigate('CardDetails')}>
        <View style={styles.cardDetails}>
          <Image
            source={require('../assets/Simple.png')} // Replace with the actual Verve card image
            style={styles.cardImage}
          />
          <View style={styles.cardInfo}>
            <Text style={styles.cardNumber}>506124********4925</Text>
            <Image/> 
            <Text style={styles.cardSerial}>Serial No. <Text style={styles.serialNo}>1290789359</Text></Text>
            <View style={styles.cardStatus}>
              <Text style={styles.statusText}>Active</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward-outline" size={20} color="#0057FF" />
        </View>
      </TouchableOpacity>

      {/* Recent Transactions Section */}
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <View style={styles.transactionContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="time-outline" size={16} color="gray" />
        </View>
        <Text style={styles.noTransactionsText}>No recent transactions yet</Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    marginTop: 40
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle1: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginTop: 20,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
  },
  cardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: 'contain',
    marginTop: -25
  },
  cardInfo: {
    flex: 1,
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardSerial: {
    fontSize: 12,
    color: 'gray',
  },
  cardStatus: {
    backgroundColor: '#DFF6E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 5,
    marginTop: 5,
    width: 50,
    alignItems: 'center',
  },
  statusText: {
    color: colors.success,
    fontSize: 12,
  },
  transactionContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noTransactionsText: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 10,
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: 'gray',
  },
  activeNavText: {
    color: '#0056E1',
  },
  serialNo:{
    fontWeight: 'bold',
    color: '#555'
  },
  iconContainer:{
    width: 30,
    height: 30,
    backgroundColor: colors.input,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bell:{
    color: colors.deepDeem
  },
  createHeading:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginBottom: 10,
    marginTop: 20
  }
});
