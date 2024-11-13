import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import colors from '../components/colors';
import { AntDesign } from '@expo/vector-icons';
import useStore from '../store/topupStore'; // Import the Zustand store

const Topup = () => {
  const [amount, setAmount] = useState('0.00');
  const setStoreAmount = useStore((state) => state.setAmount); // Get the setAmount function from the store
  const navigation = useNavigation();

  const handlePress = (value) => {
    setAmount((prev) => {
      if (value === 'back') {
        return prev.length > 1 ? prev.slice(0, -1) : '0.00';
      }
      return prev === '0.00' ? value : prev + value;
    });
  };

  const handleEnterPress = () => {
    const numericAmount = parseFloat(amount);
    if (numericAmount < 100) {
      Toast.show({
        type: 'error',
        text1: 'Minimum Amount',
        text2: 'The minimum top-up amount is ₦100.',
      });
    } else {
      setStoreAmount(numericAmount); // Set the amount in the Zustand store
      navigation.navigate('QuickDeposit'); // Navigate to QuickDeposit
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButtons} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Top up Wallet</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.enterAmountText}>Enter Amount</Text>
        <Text style={styles.amountText}>₦{amount}</Text>
      </View>

      <View style={styles.keypad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'back', '0', 'enter'].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.keypadButton,
              item === 'enter' && styles.enterButton,
              item === 'back' && styles.backButton,
            ]}
            onPress={() => (item === 'enter' ? handleEnterPress() : handlePress(item))}
          >
            {item === 'back' ? (
              <Icon name="backspace-outline" size={24} color="#555" />
            ) : item === 'enter' ? (
              <Icon name="arrow-forward" size={24} color="#FFFFFF" />
            ) : (
              <Text style={styles.keypadButtonText}>{item}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <Toast />
    </View>
  );
};

export default Topup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    paddingTop: 20,
  },
  amountContainer: {
    alignItems: 'center',
    marginVertical: 30,
    marginTop: '20%',
  },
  enterAmountText: {
    fontSize: 16,
    color: 'gray',
  },
  amountText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 10,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    justifyContent: 'space-between',
    marginTop: '55%',
    alignSelf: 'center',
  },
  keypadButton: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  keypadButtonText: {
    fontSize: 20,
    color: '#333',
    fontWeight: '700',
  },
  enterButton: {
    backgroundColor: colors.primary,
  },
  backButton: {
    backgroundColor: '#D3D3D3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  backButtons: {
    position: 'absolute',
    left: 10,
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
  icon: {
    color: colors.primary,
  },
});
