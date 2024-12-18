import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../components/colors';

// Utility function to format numbers as currency
const formatCurrency = (amount) => {
  return parseFloat(amount)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const BoosterSuccess = ({ navigation, route }) => {
  const { amount, name, quantity } = route.params; // Access the passed parameters

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark-circle" size={100} color="#28A745" />
      </View>
      
      <Text style={styles.title}>Order Successful</Text>
      <Text style={styles.message}>
        Congratulations! Your order of <Text style={styles.amount}>{quantity} followers.</Text> to <Text style={styles.recipient}>{name}</Text> was successful.
      </Text>

      <TouchableOpacity style={styles.dismissButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.dismissButtonText}>Dismiss</Text>
      </TouchableOpacity>
    </View>
  );
};


export default BoosterSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    backgroundColor: '#E0F7E7',
    borderRadius: 100,
    padding: 15,
    marginBottom: 20,
    marginTop: 'auto'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  amount: {
    fontWeight: 'bold',
    color: '#000',
  },
  recipient: {
    fontWeight: 'bold',
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  actionButtonText: {
    fontSize: 12,
    color: colors.black,
    marginLeft: 5,
    fontWeight: '500'
  },
  dismissButton: {
    backgroundColor: '#E0E7FF',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginTop: 'auto',
    width: '100%',
    alignItems: 'center',
  },
  dismissButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
  },
  iconContain:{
    backgroundColor: colors.label,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
