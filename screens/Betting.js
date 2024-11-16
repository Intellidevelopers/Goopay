import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from '../components/colors';
import useBettingStore from '../store/useBettingStore';

const Betting = ({ navigation }) => {
  const setSelectedBiller = useBettingStore((state) => state.setSelectedBiller);

  const billers = [
    { id: '1', name: 'SportyBet', image: require('../assets/betting/sporty.png') },
    { id: '2', name: '1xBet', image: require('../assets/betting/1xbet.png') },
    { id: '3', name: 'BangBet', image: require('../assets/betting/bangbet.png') },
    { id: '4', name: 'Bet9ja', image: require('../assets/betting/betnaija.png') },
    { id: '5', name: 'BetKing', image: require('../assets/betting/betking.png') },
  ];

  const handleBillerPress = (biller) => {
    setSelectedBiller(biller); // Set selected biller in Zustand store
    navigation.navigate('BettingDetails'); // Navigate to BillerDetails screen
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
        <Text style={styles.headerText}>Betting</Text>
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

export default Betting;


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
