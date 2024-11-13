import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../components/colors';
import { AntDesign } from '@expo/vector-icons';
import useStore from '../store/topupStore';


const QuickBankDeposit = ({ navigation }) => {
    const amount = useStore((state) => state.amount);
  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity style={styles.backButtons} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
      {/* Header */}
      <Text style={styles.headerText}>Quick Bank Transfer</Text>
      <Text style={styles.subHeader}>Send the exact amount to the account below</Text>

      {/* Transfer Instruction */}
      <Text style={styles.transferText}>Transfer Exactly <Text style={styles.amountText}>₦{amount}</Text></Text>

      {/* Account Information */}
      <View style={styles.accountInfoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>₦{amount}</Text>
            <TouchableOpacity>
              <Icon name="copy-outline" size={20} color={colors.iconColor} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Bank Name</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>Wema Bank</Text>
            <TouchableOpacity>
              <Icon name="copy-outline" size={20} color={colors.iconColor} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Account Name</Text>
          <Text style={styles.value}>Goopay Checkout</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Account Number</Text>
          <View style={styles.valueContainer}>
            <Text style={styles.value}>6010608683</Text>
            <TouchableOpacity>
              <Icon name="copy-outline" size={20} color={colors.iconColor} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Transaction Warning */}
      <Text style={styles.warningText}>Use this account for this transaction only</Text>

      {/* Expiry Timer */}
      <View style={styles.expiryContainer}>
        <Icon name="time-outline" size={20} color={colors.primary} />
        <Text style={styles.expiryText}>Expires in <Text style={styles.expiryTime}>59:47</Text></Text>
      </View>

      {/* Confirmation Button */}
      <TouchableOpacity style={styles.confirmButton}>
        <Text style={styles.confirmButtonText}>I've sent the money</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuickBankDeposit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    padding: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 5,
    marginTop: 30
  },
  headerText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 5,
    marginTop: 20
  },
  subHeader: {
    fontSize: 14,
    color: colors.grayText,
    marginBottom: 15,
  },
  transferText: {
    fontSize: 14,
    color: colors.greyText,
    marginBottom: 10,
    fontWeight: '500'
  },
  amountText: {
    fontWeight: 'bold',
    color: colors.black,
  },
  accountInfoContainer: {
    width: '100%',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: colors.greyText,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
    marginRight: 8,
  },
  warningText: {
    fontSize: 14,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    alignSelf: 'flex-end',
    marginTop: '80%'
  },
  expiryText: {
    fontSize: 14,
    color: colors.black,
    marginLeft: 5,
  },
  expiryTime: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  confirmButton: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto'
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '500',
  },
});
