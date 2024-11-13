import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Entypo, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Ensure you have these icons installed
import colors from '../components/colors';
import useTransferStore from '../store/useTransferStore';

// Utility function to format numbers as currency
const formatCurrency = (amount) => {
  return parseFloat(amount)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Success = ({ navigation }) => {
  const { amount, beneficiaryName, accountNumber, bankName } = useTransferStore();

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="checkmark-circle" size={100} color="#28A745" />
      </View>
      
      <Text style={styles.title}>Transfer Successful</Text>
      <Text style={styles.message}>
        Congratulations! Your transfer of <Text style={styles.amount}>₦{formatCurrency(amount)}</Text> to <Text style={styles.recipient}>{beneficiaryName}</Text> was successful
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.iconContain}>
            <Entypo name="share" size={20} color="#007AFF" />
          </View>
          <Text style={styles.actionButtonText}>Share Receipt</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.iconContain}>
            <MaterialCommunityIcons name="download-outline" size={20} color="#007AFF" />
          </View>
          <Text style={styles.actionButtonText}>Download Receipt</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.dismissButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.dismissButtonText}>Dismiss</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Success;

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
