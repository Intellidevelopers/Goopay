import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import colors from '../components/colors';
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import useBeneficiaryStore from '../store/useBeneficiaryStore';
import useTransferStore from '../store/useTransferStore';

const CustomSwitch = ({ value, onValueChange, trackColor = { false: "#ccc", true: "#4cd137" }, thumbColor = "#fff" }) => {
    return (
      <TouchableOpacity
        onPress={() => onValueChange(!value)}
        style={{
          backgroundColor: value ? trackColor.true : trackColor.false,
          width: 45,
          height: 25,
          borderRadius: 12.5,
          justifyContent: 'center',
          alignItems: value ? 'flex-end' : 'flex-start',
          padding: 2,
        }}
      >
        <View
          style={{
            width: 21,
            height: 21,
            backgroundColor: thumbColor,
            borderRadius: 10.5,
          }}
        />
      </TouchableOpacity>
    );
  };

const TransferDetails = () => {
  const [amount, setAmount] = useState('0.00');
  const setTransferDetails = useTransferStore((state) => state.setTransferDetails); // Get the setTransferDetails function from the store
  const navigation = useNavigation();
  const [isAddedToBeneficiary, setIsAddedToBeneficiary] = useState(false);
  const { accountNumber, bankName, beneficiaryName } = useBeneficiaryStore();

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
        text2: 'The minimum transfer amount is ₦100.',
      });
    } else {
      // Set transfer details in the Zustand store
      setTransferDetails({
        amount: numericAmount,
        beneficiaryName,
        accountNumber,
        bankName,
      });

      // Navigate to the summary screen
      navigation.navigate('Summary');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButtons} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Transfer Details</Text>
      </View>

      <View style={styles.beneficiaryContainer}>
        <Text style={styles.name}>{beneficiaryName}</Text>
        <Text style={styles.bank}>{bankName}</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.enterAmountText}>Enter Amount</Text>
        <Text style={styles.amountText}>₦{amount}</Text>
      </View>

      <View style={styles.addToBeneficairyView}>
      <View style={styles.beneficiaryHeader}>
      <SimpleLineIcons name='refresh' color={colors.primary} size={20} />
      <Text style={styles.addToButtonText}>Make this a recuring transfer</Text>
      </View>
      <CustomSwitch
        value={isAddedToBeneficiary}
        onValueChange={(val) => setIsAddedToBeneficiary(val)}
        trackColor={{ false: "#d3d3d3", true: colors.primary }}
        thumbColor="#fff"
      />
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

export default TransferDetails;

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
    marginTop: '10%',
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
  beneficiaryContainer:{
    alignItems: 'center'
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bank:{
    fontSize: 16,
    color: '#555',
    fontWeight: '500'
  },
  addToBeneficairyView:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginBottom: 16,
    backgroundColor: colors.label,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    padding: 15,
    width: '90%',
    alignSelf: 'center',
  },
  beneficiaryHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  addToButtonText:{
    fontWeight: '500',
    fontSize: 13,
    color: colors.primary,
  }
});
