import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from '../components/colors';
import useWithdrawStore from '../store/withdrawStore';

const Withdraw = ({ navigation }) => {
    const { setWithdrawalDetails } = useWithdrawStore();
    const [bankListVisible, setBankListVisible] = useState(false);
    const [selectedBank, setSelectedBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [amount, setAmount] = useState('');
    const [balance, setBalance] = useState(19920); // Dummy balance
  
    const banks = ['Access Bank', 'GTBank', 'Palmpay', 'First Bank', 'UBA']; // Sample bank list
  
    const validateAccountNumber = () => {
      if (accountNumber.length === 10) {
        // Simulate account name validation
        setAccountName('John Doe'); // Replace this with actual API logic
      } else {
        setAccountName('');
      }
    };
  
    const handleProceed = () => {
        if (!selectedBank || !accountNumber || !amount) {
          alert('Please fill in all fields!');
          return;
        }
      
        if (parseFloat(amount) > balance) {
          alert('Insufficient balance!');
          return;
        }
      
        // Save details to Zustand store
        setWithdrawalDetails({
          selectedBank,
          accountNumber,
          accountName: 'Adeagbo Josiah',
          amount,
        });
      
        // Navigate to summary screen
        navigation.navigate('WithdrawSummary');
      };
      

  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.headerContainer} onPress={() => navigation.goBack()}>
        <AntDesign name='left' size={20}/>
        <Text style={styles.title}>Withdraw</Text>
       </TouchableOpacity>

      {/* Recently Used Section */}
      <View style={styles.recentlyUsedContainer}>
        <Text style={styles.sectionTitle}>Recently Used</Text>
        <View style={styles.recentlyUsed}>
          <View style={styles.recentUser}>
            <View style={styles.iconContainer}>
                <Ionicons name="happy-outline" size={24} color="#000" />
            </View>
            <Text style={styles.userText}>Josiah</Text>
          </View>
          <View style={styles.recentUser}>
            <View style={styles.iconContainer}>
                <Ionicons name="happy-outline" size={24} color="#000" />
            </View>
            <Text style={styles.userText}>Adeagbo</Text>
          </View>
          <View style={styles.recentUser}>
            <View style={styles.iconContainer2}>
                <Ionicons name="ellipsis-horizontal-circle-outline" size={24} color="#000" />
            </View>
            <Text style={styles.userText}>See All</Text>
          </View>
        </View>
      </View>

      {/* Select Bank */}
      
        <View style={styles.wrapperContainer}>
      <Text style={styles.label}>Select Bank</Text>
        <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setBankListVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {selectedBank ? selectedBank : 'Select Bank'}
        </Text>
        <Ionicons name="chevron-down-outline" size={20} color="#333" />
      </TouchableOpacity>

      {/* Account Number */}
      <Text style={styles.label}>Account Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Account Number"
        keyboardType="numeric"
        maxLength={10}
        value={accountNumber}
        onChangeText={(text) => {
          setAccountNumber(text);
          validateAccountNumber();
        }}
      />
      {accountName ? <Text style={styles.accountName}>{accountName}</Text> : null}

      {/* Amount */}
      <View style={styles.amountContainer}>
      <Text style={styles.label}>Amount</Text>
        <TextInput
          style={[styles.input, styles.amountInput]}
          placeholder="Amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />
        <Text style={styles.balanceText}>Balance: ₦{balance.toFixed(2)}</Text>
      </View>
        </View>
      {/* Proceed Button */}
      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.proceedText}>Proceed</Text>
      </TouchableOpacity>

      {/* Bank List Bottom Sheet */}
      <Modal
        animationType="slide"
        visible={bankListVisible}
        transparent
        onRequestClose={() => setBankListVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Bank</Text>
            <FlatList
              data={banks}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.bankItem}
                  onPress={() => {
                    setSelectedBank(item);
                    setBankListVisible(false);
                  }}
                >
                  <Text style={styles.bankText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.greyBackground,
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
  recentlyUsedContainer: {
    marginBottom: 40,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 15,
    alignItems: 'center'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  recentlyUsed: {
    flexDirection: 'row',
    gap: 50
  },
  recentUser: {
    alignItems: 'center',

  },
  userText: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
    fontWeight: '500'
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: colors.input

  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: colors.input
  },
  accountName: {
    fontSize: 14,
    color: '#28A745',
    marginBottom: 15,
  },
  amountContainer: {
    marginBottom: 20,
  },
  amountInput: {
    marginBottom: 20,
  },
  balanceText: {
    textAlign: 'right',
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  proceedButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20
  },
  proceedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  bankItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  bankText: {
    fontSize: 16,
    color: '#333',
  },
  iconContainer:{
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer2:{
    backgroundColor: colors.warningLabel,
    padding: 15,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperContainer:{
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
  },
  label:{
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 10,
  }
});
