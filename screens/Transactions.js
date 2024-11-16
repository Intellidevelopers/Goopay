import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import colors from '../components/colors';
import { AntDesign, Feather } from 'react-native-vector-icons';
import useTransactionStore from '../store/transactionStore';
import { StatusBar } from 'expo-status-bar';

const screenWidth = Dimensions.get('window').width;

// Mock transactions data
const transactionsData = [
  { id: '1', name: '10GB - 30 Days', amount: '-₦800.00', date: '12:24 PM, 02/11/2024', status: 'success', type: 'sent', refNumber: '067234567829', transactionId: 'TXN206744901', bank: 'Data Subscription' },
  { id: '2', name: 'Hosea Mathias', amount: '+₦360,000.00', date: '10:30 PM, 29/09/2024', status: 'failed', type: 'sent', refNumber: '000034567829', transactionId: 'TXN290811002', bank: 'Fidelity bank' },
  { id: '3', name: 'Hosea Mathias', amount: '+₦360,000.00', date: '10:30 PM, 29/09/2024', status: 'pending', type: 'received', refNumber: '000034567829', transactionId: 'TXN290811002', bank: 'Fidelity bank' },
  { id: '4', name: 'Hosea Mathias', amount: '+₦360,000.00', date: '10:30 PM, 29/09/2024', status: 'pending', type: 'received', refNumber: '000034567829', transactionId: 'TXN290811002', bank: 'Fidelity bank' },
  // Additional transactions...
];

// Utility function to get status color
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
      <StatusBar backgroundColor={colors.white} />
    </View>
  );
};

// Transaction Screens
const AllTransactions = () => <TransactionsList statusFilter="all" />;
const SuccessTransactions = () => <TransactionsList statusFilter="success" />;
const FailedTransactions = () => <TransactionsList statusFilter="failed" />;
const PendingTransactions = () => <TransactionsList statusFilter="pending" />;

// Custom Top Tab Bar Component
const CustomTabBar = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.tabBarContainer}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => setActiveTab(tab)}
        >
          <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// Transactions Component with Swipe Animation
const Transactions = () => {
  const [activeTab, setActiveTab] = useState('All');
  const tabOrder = ['All', 'Success', 'Failed', 'Pending'];
  const activeTabIndex = tabOrder.indexOf(activeTab);
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Function to handle swipe gestures
  const handleSwipe = (event) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX } = event.nativeEvent;
      if (translationX < -50 && activeTabIndex < tabOrder.length - 1) {
        // Swipe left to go to the next tab
        setActiveTab(tabOrder[activeTabIndex + 1]);
      } else if (translationX > 50 && activeTabIndex > 0) {
        // Swipe right to go to the previous tab
        setActiveTab(tabOrder[activeTabIndex - 1]);
      }
    }
  };

  // Function to render the selected tab's component
  const renderTabContent = () => {
    switch (activeTab) {
      case 'All':
        return <AllTransactions />;
      case 'Success':
        return <SuccessTransactions />;
      case 'Failed':
        return <FailedTransactions />;
      case 'Pending':
        return <PendingTransactions />;
      default:
        return <AllTransactions />;
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <CustomTabBar
        tabs={tabOrder}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <PanGestureHandler onHandlerStateChange={handleSwipe}>
        <Animated.View
          style={[
            styles.swipeContainer,
            {
              transform: [{ translateX: animatedValue }],
            },
          ]}
        >
          {renderTabContent()}
        </Animated.View>
      </PanGestureHandler>
      <StatusBar backgroundColor={colors.white} />
    </GestureHandlerRootView>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.white,
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary, // Replace with your primary color
  },
  tabText: {
    fontSize: 16,
    color: colors.black,
  },
  activeTabText: {
    fontWeight: 'bold',
    color: colors.primary, // Replace with your active tab text color
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
    borderRadius: 10,
    marginBottom: 20,
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
  status: {
    textAlign: 'right',
  },
  swipeContainer: {
    flex: 1,
    flexDirection: 'row',
  },
});
