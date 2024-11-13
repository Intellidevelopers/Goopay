import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import colors from '../components/colors';
import { AntDesign } from '@expo/vector-icons';
import { BottomSheet, Icon } from '@rneui/themed';
import useTransferStore from '../store/useTransferStore';

// Utility function to format numbers as currency
const formatCurrency = (amount) => {
  return parseFloat(amount)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const Summary = ({ navigation }) => {
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [pin, setPin] = useState(['', '', '', '']);
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { amount, beneficiaryName, accountNumber, bankName } = useTransferStore();

  const pinRefs = useRef([]);

  const handlePinChange = (index, value) => {
    let newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    if (value && index < 3) {
      pinRefs.current[index + 1].focus();
    } else if (!value && index > 0) {
      pinRefs.current[index - 1].focus();
    }

    setIsConfirmEnabled(newPin.every((digit) => digit !== ''));
  };

  const onConfirm = async () => {
    setIsVisible(false);
    setIsLoadingVisible(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));

    setTimeout(() => {
      setIsCardVisible(true);
      navigation.navigate('Success');
      setIsLoadingVisible(false);
    }, 6000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Summary</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.transferText}>Transfer Amount</Text>
        <Text style={styles.amount}>₦{formatCurrency(amount)}</Text>
      </View>

      <Text style={styles.label}>Transfer Details</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Transaction Amount:</Text>
          <Text style={styles.detailValue}>₦{formatCurrency(amount)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Charge:</Text>
          <Text style={styles.detailValue}>₦10.00</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Debit:</Text>
          <Text style={styles.detailValue}>₦{formatCurrency(amount)}</Text>
        </View>
      </View>

      <Text style={styles.label}>Beneficiary Details</Text>
      <View style={styles.beneficiaryContainer}>
        <View style={styles.beneficiaryIcon}>
          <Text style={styles.beneficiaryInitials}>JA</Text>
        </View>
        <View style={styles.beneficiaryDetails}>
          <Text style={styles.beneficiaryName}>{beneficiaryName}</Text>
          <Text style={styles.beneficiaryAccount}>{bankName} {accountNumber}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.proceedButton} onPress={() => setIsVisible(true)}>
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>

      <BottomSheet isVisible={isVisible}>
        <View style={styles.bottomSheetContainer}>
          <Icon name="lock" color="#007bff" size={50} />
          <Text style={styles.sheetTitle}>Confirm PIN</Text>
          <Text style={styles.sheetMessage}>Enter your transaction PIN to buy airtime</Text>

          <View style={styles.pinContainer}>
            {pin.map((value, index) => (
              <TextInput
                key={index}
                ref={(el) => (pinRefs.current[index] = el)}
                style={[
                  styles.pinInput,
                  {
                    borderColor: value ? colors.primary : 'transparent',
                    borderWidth: value ? 1 : 0,
                  },
                ]}
                keyboardType="numeric"
                maxLength={1}
                value={pin[index]}
                onChangeText={(text) => handlePinChange(index, text)}
              />
            ))}
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} style={styles.loadingIndicator} />
          ) : (
            <View style={styles.sheetActions}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setIsVisible(false)}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  { backgroundColor: isConfirmEnabled ? colors.primary : '#EDF1F7' },
                ]}
                onPress={onConfirm}
                disabled={!isConfirmEnabled}
              >
                <Text style={[styles.confirmText, { color: isConfirmEnabled ? colors.white : '#ccc' }]}>
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </BottomSheet>

      <BottomSheet isVisible={isLoadingVisible}>
        <View style={styles.loadingBottomSheetContainer}>
          <ActivityIndicator size="large" color={colors.primary} style={styles.loadingIndicator} />
          <Text style={styles.loadingMessage}>Processing your transaction</Text>
          <Text style={styles.subText}>Please wait...</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Summary;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // centers items horizontally in the header
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: -10, // position the back button on the left side
    padding: 10,
  },
  backIcon: {
    color: colors.primary,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  icon:{
    color: colors.primary,
  },
  amountContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  transferText: {
    color: '#666',
    fontSize: 14,
    marginBottom: 5,
  },
  amount: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1A1A1A',
  },
  detailsContainer: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    color: '#666',
    fontSize: 14,
  },
  detailValue: {
    color: '#000',
    fontSize: 14,
    fontWeight: '700'
  },
  beneficiaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  beneficiaryIcon: {
    backgroundColor: colors.label,
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  beneficiaryInitials: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 18,
  },
  beneficiaryDetails: {
    flex: 1,
  },
  beneficiaryName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  beneficiaryAccount: {
    color: '#666',
    fontSize: 12,
  },
  changeText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500'
  },
  proceedButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto'
  },
  proceedButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label:{
    color: '#444',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  bottomSheetContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingBottom: 30,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  sheetMessage: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    gap: 10
  },
  pinInput: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.label,
    textAlign: 'center',
    fontSize: 18,
    color: colors.primary,
    fontWeight: '700'
  },
  sheetActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: colors.label,
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  closeText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 16,
    fontWeight: '500',
  },
  loadingIndicator: {
    marginVertical: 20,
    alignSelf: 'center', // Center the loading indicator horizontally
  },
  loadingBottomSheetContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center', // Center the content horizontally
    justifyContent: 'center', // Center the content vertically
  },
  loadingMessage: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    textAlign: 'center',
  },
  subText:{
    marginTop: 5,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  }
});
