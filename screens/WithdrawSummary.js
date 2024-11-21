import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from '../components/colors';
import useWithdrawStore from '../store/withdrawStore';


const formatCurrency = (amount) => {
    return parseFloat(amount)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

const WithdrawSummary =  ({ navigation }) => {
    const { withdrawalDetails } = useWithdrawStore();
  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.headerContainer} onPress={() => navigation.goBack()}>
        <AntDesign name='left' size={20}/>
        <Text style={styles.title}>Confirmation</Text>
       </TouchableOpacity>

      {/* Summary Card */}
      <View style={styles.summaryCard}>
        <Text style={styles.infoText}>You are withdrawing</Text>
        <Text style={styles.amount}>₦{formatCurrency(withdrawalDetails.amount)}</Text>
        <View style={styles.recipientDetails}>
          <Text style={styles.label}>Recipient</Text>
          <Text style={styles.recipientName}>{withdrawalDetails.accountName}</Text>
          <Text style={styles.recipientBank}>{withdrawalDetails.selectedBank}</Text>
        </View>
      </View>

      {/* Proceed Button */}
      <TouchableOpacity style={styles.proceedButton} onPress={() => {
          navigation.navigate('TransactionPin');
        }}>
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WithdrawSummary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 40,
    flexDirection:  'row',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    left: 30,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 8,
    textAlign: 'center',
  },
  label:{
    fontSize: 16,
    color: '#888888',
    marginBottom: 8,
  },
  amount: {
    fontSize: 26,
    fontWeight: '900',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  recipientDetails: {
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 12,
  },
  recipientName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  recipientBank: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500'
  },
  proceedButton: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20
  },
  proceedButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
