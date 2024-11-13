import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from '../components/colors';
import { useNavigation } from '@react-navigation/native';
import useBillerStore from '../store/useBillerStore';

const Electricity = ({ navigation }) => {
  const setSelectedBiller = useBillerStore((state) => state.setSelectedBiller);

  const billers = [
    { id: '1', name: 'Aba Electricity Distribution Postpaid', image: require('../assets/icons/icon.png') },
    { id: '2', name: 'Aba Electricity Distribution Prepaid', image: require('../assets/icons/icon.png') },
    { id: '3', name: 'Abuja Electricity Distribution Postpaid', image: require('../assets/icons/icon.png') },
    { id: '4', name: 'Abuja Electricity Distribution Prepaid', image: require('../assets/icons/icon.png') },
    { id: '5', name: 'Benin Electricity Distribution Company (BEDC)', image: require('../assets/icons/icon.png') },
    { id: '6', name: 'Eko Electricity Distribution Postpaid', image: require('../assets/icons/icon.png') },
    { id: '7', name: 'Eko Electricity Distribution Prepaid', image: require('../assets/icons/icon.png') },
    { id: '8', name: 'Enugu Electricity Distribution Postpaid', image: require('../assets/icons/icon.png') },
    { id: '9', name: 'Enugu Electricity Distribution Prepaid', image: require('../assets/icons/icon.png') },
  ];

  const handleBillerPress = (biller) => {
    setSelectedBiller(biller); // Set selected biller in Zustand store
    navigation.navigate('BillerDetails'); // Navigate to BillerDetails screen
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.billerItem} onPress={() => handleBillerPress(item)}>
      <Image source={item.image} style={styles.billerImage} />
      <Text style={styles.billerName}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={20} color="#888" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Electricity</Text>
      </View>
      <Text style={styles.subHeaderText}>Select Biller</Text>
      <FlatList
        data={billers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Electricity;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
  },
  backButton: {
    marginRight: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  subHeaderText: {
    marginHorizontal: 16,
    marginVertical: 10,
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  billerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
  },
  billerImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 16,
  },
  billerName: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontWeight: '500'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // centers items horizontally in the header
    marginTop: 40,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 10, // position the back button on the left side
    padding: 10,
  },
  backIcon: {
    color: colors.primary,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  icon:{
    color: colors.primary,
  },
});
