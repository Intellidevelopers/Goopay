import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import colors from '../components/colors';
import { AntDesign, Feather } from 'react-native-vector-icons';
import useTransactionStore from '../store/transactionStore';
import { StatusBar } from 'expo-status-bar';

const Tab = createMaterialTopTabNavigator();

const transactionsData = [
  { id: '1', name: '10GB - 30 Days', amount: '-₦800.00', date: '12:24 PM, 02/11/2024', status: 'success', type: 'sent', refNumber: '067234567829', transactionId: 'TXN206744901', bank: 'Data Subscription' },
  { id: '2', name: 'Hosea Mathias', amount: '+₦360,000.00', date: '10:30 PM, 29/09/2024', status: 'failed', type: 'sent', refNumber: '000034567829', transactionId: 'TXN290811002', bank: 'Fidelity bank' },
  { id: '3', name: 'Hosea Mathias', amount: '+₦360,000.00', date: '10:30 PM, 29/09/2024', status: 'pending', type: 'received', refNumber: '000034567829', transactionId: 'TXN290811002', bank: 'Fidelity bank' },
  { id: '4', name: 'Hosea Mathias', amount: '+₦360,000.00', date: '10:30 PM, 29/09/2024', status: 'pending', type: 'received', refNumber: '000034567829', transactionId: 'TXN290811002', bank: 'Fidelity bank' },
  // Additional transactions...
];

const getStatusColor = (status) => {
  switch (status) {
    case 'success': return '#2ecc71';
    case 'failed': return 'red';
    case 'pending': return 'orange';
    default: return 'black';
  }
};

// Transaction Item Component
const TransactionItem = ({ name, amount, date, status, type, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.transactionItem}>
    <View style={styles.iconCircle}>
      {type === 'sent' ? (
        <Feather name="arrow-up-right" size={24} color="red" />
      ) : (
        <Feather name="arrow-down-left" size={24} color="#2ecc71" />
      )}
    </View>
    <View style={styles.transactionDetails}>
      <Text style={styles.transactionName}>{name}</Text>
      <Text style={styles.transactionDate}>{date}</Text>
    </View>
    <View>
      <Text style={[styles.transactionAmount, type === 'sent' ? styles.expense : styles.income]}>{amount}</Text>
      <Text style={[styles.transactionstatus, { color: getStatusColor(status) }]}>{status}</Text>
    </View>
  </TouchableOpacity>
);

// Transactions List Component
const TransactionsList = ({ statusFilter }) => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  const setSelectedTransaction = useTransactionStore((state) => state.setSelectedTransaction);

  // Filter transactions based on search text and status filter
  const filteredTransactions = transactionsData.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()) &&
    (statusFilter === 'all' || item.status === statusFilter)
  );

  const handleTransactionPress = (transaction) => {
    setSelectedTransaction(transaction);
    navigation.navigate('TransactionDetails');
  };

  return (
    <View style={styles.content}>
      <View style={styles.searchInputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search transactions"
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor={'#888'}
        />
        <TouchableOpacity>
          <AntDesign name='search1' size={20} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem {...item} onPress={() => handleTransactionPress(item)} />
        )}
      />
      <StatusBar backgroundColor={colors.white}/>
    </View>
  );
};

// Transaction Screens
const AllTransactions = () => <TransactionsList statusFilter="all" />;
const SuccessTransactions = () => <TransactionsList statusFilter="success" />;
const FailedTransactions = () => <TransactionsList statusFilter="failed" />;
const PendingTransactions = () => <TransactionsList statusFilter="pending" />;

// Main Transactions Component
const Transactions = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator screenOptions={{ tabBarLabelStyle: { fontSize: 13, fontWeight: '500', marginTop: 50 } }}>
        <Tab.Screen name="All" component={AllTransactions} />
        <Tab.Screen name="Success" component={SuccessTransactions} />
        <Tab.Screen name="Failed" component={FailedTransactions} />
        <Tab.Screen name="Pending" component={PendingTransactions} />
      </Tab.Navigator>
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
  },
  input: {
    flex: 1,
    width: '100%',
  },
  searchInputContainer: {
    backgroundColor: colors.label,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 30,
    padding: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '95%',
    alignSelf: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  income: {
    color: '#2ecc71',
  },
  expense: {
    color: 'red',
  },
  transactionstatus: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  content: {
    backgroundColor: colors.greyBackground,
    flex: 1,
  },
  status:{
    textAlign: 'right'
  },
});