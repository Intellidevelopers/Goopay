import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../components/colors';
import { StatusBar } from 'expo-status-bar';
import useOrderStore from '../store/orderStore'; // Import Zustand store


const Tiktok = ({ navigation }) => {
  const setOrder = useOrderStore((state) => state.setOrder);
  const data = [
    { id: '1', name: 'Tiktok Followers { September Recommended } A { Works on Suspended account }', price: 'NGN287.50', minimum: '50' },
    { id: '2', name: 'Tiktok Followers { Recommended } A { Fastest }', price: 'NGN64.90', minimum: '10' },
    { id: '3', name: 'Tiktok Retweets Q { Fastest }', price: 'NGN550.00', minimum: '100' },
    { id: '4', name: 'Tiktok Likes { Southern Africa }', price: 'NGN40,880.00', minimum: '1000' },
    { id: '5', name: 'Tiktok Likes { China }', price: 'NGN66.50', minimum: '5' },
    { id: '6', name: 'Tiktok Followers { Recommended } B { Fastest }', price: 'NGN95.10', minimum: '10' },
    { id: '7', name: 'Tiktok Followers { Recommended } A', price: 'NGN350.00', minimum: '100' },
    { id: '8', name: 'Tiktok Followers { Recommended } B', price: 'NGN49.80', minimum: '10' },
    { id: '9', name: 'Tiktok Retweets { Option B }', price: 'NGN43.80', minimum: '10' },
    { id: '10', name: 'ES1 - Tiktok Retweets Aa { Fastest }', price: 'NGN63.80', minimum: '10' },
    { id: '11', name: 'ES1 - Tiktok Likes Aa { Recommended }', price: 'NGN61.90', minimum: '10' },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} 
    onPress={() => 
    {setOrder(item); navigation.navigate('OrderScreen')}}>
      <View style={styles.iconContainer}>
        <Image
          source={require('../assets/icons/tiktok.png')} // Update this with the Tiktok icon path
          style={styles.icon}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.minimumText}>Minimum - {item.minimum}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.priceText}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={20} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tiktok</Text>
      </View>
      <StatusBar backgroundColor={colors.white} />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    paddingTop: 40,
    gap: 10,
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 30,
  },
  headerTitle: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: colors.white,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  iconContainer: {
    marginRight: 15,
  },
  icon: {
    width: 35,
    height: 35,
    borderRadius: 5, // No need for round icons, keep it sharp.
  },
  detailsContainer: {
    flex: 1,
  },
  itemName: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  minimumText: {
    color: '#555',
    fontSize: 12,
    marginTop: 5,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Tiktok;
