import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import colors from '../components/colors';
import { AntDesign, Fontisto, Ionicons } from '@expo/vector-icons';


const SocialBooster = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>SocialBooster</Text>
        </View>
        <TouchableOpacity style={styles.hamburgerButton}>
            <Fontisto name="bell" size={24} style={styles.hamburgerIcon} />
        </TouchableOpacity>
        </View>


      <View style={styles.header}>
        <Text style={styles.title}>SocialBooster balance</Text>
        <Text style={styles.balance}>₦0.00</Text>
        <Text style={styles.note}>Boost your social media accounts easily</Text>
      </View>

      <TouchableOpacity style={styles.enableButton}>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Ionicons name='wallet' size={24} color={colors.deepDeem}/>
            <Text style={styles.enableText}>Top up wallet</Text>
        </View>
        <AntDesign name='right' size={15}/>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Instagram')}>
            <View style={styles.iconContainer}>
                <Image source={require('../assets/icons/instagram.png')} style={styles.logo}/>
            </View>
          <Text style={styles.actionText}>Instagram</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Facebook')}>
            <View style={styles.iconContainer}>
                <Image source={require('../assets/icons/facebook.png')} style={styles.logo}/>
            </View>
          <Text style={styles.actionText}>Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Twitter')}>
            <View style={styles.iconContainer}>
                <Image source={require('../assets/icons/twitter.png')} style={styles.logo}/>
            </View>
          <Text style={styles.actionText}>Twitter</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Tiktok')}>
            <View style={styles.iconContainer}>
                <Image source={require('../assets/icons/tiktok.png')} style={styles.logo}/>
            </View>
          <Text style={styles.actionText}>Tiktok Fol..</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Youtube')}>
            <View style={styles.iconContainer}>
                <Image source={require('../assets/icons/youtube.png')} style={styles.logo}/>
            </View>
          <Text style={styles.actionText}>Youtube</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Spotify')}>
            <View style={styles.iconContainer}>
                <Image source={require('../assets/icons/spotify.png')} style={styles.spotify}/>
            </View>
          <Text style={styles.actionText}>Spotify</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.overview}>
        <Text style={styles.overviewTitle}>Service Overview</Text>
        <View style={styles.overviewRow}>
          <Text style={styles.overviewLabel}>Purchased This Week</Text>
          <Text style={styles.overviewValue}>₦0.00</Text>
        </View>
        <View style={styles.overviewRow}>
          <Text style={styles.overviewLabel}>Total Spent</Text>
          <Text style={styles.overviewValue}>₦0.00</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.helpButton}>
        <Text style={styles.helpText}>How SocialBooster works</Text>
        <AntDesign name='right' size={15}/>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SocialBooster;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    flex: 1
  },
  header: {
    backgroundColor: colors.periwinkle,
    padding: 16,
    borderRadius: 15,
    marginBottom: 16,
    marginTop: 20
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  balanceText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  balance: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  note: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 8,
  },
  enableButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E6EBF5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  enableText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  arrow: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  overview: {
    backgroundColor: '#E6EBF5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 20
  },
  overviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  overviewLabel: {
    fontSize: 14,
    color: '#333',
  },
  overviewValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  helpButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E6EBF5',
    padding: 16,
    borderRadius: 8,
  },
  helpText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  iconContainer:{
    padding: 8,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  spotify:{
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Distribute space evenly between elements
    paddingVertical: 10,
    backgroundColor: '#fff', // Optional for background consistency
    paddingTop: 30
  },
  backButton: {
    padding: 8,
  },
  backIcon: {
    color: colors.periwinkle, // Ensure the icon matches the design
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  hamburgerButton: {
    padding: 8,
  },
  hamburgerIcon: {
    color: colors.deepDeem,
  },
  
});
