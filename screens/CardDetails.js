import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BottomSheet, Button, Icon } from '@rneui/themed';
import colors from '../components/colors';

const CardDetails = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [pin, setPin] = useState(['', '', '', '']);
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false); // New state for card visibility

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

  const onConfirm = () => {
    setIsCardVisible(true); // Show card details upon PIN confirmation
    setIsVisible(false); // Close the PIN bottom sheet
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Card Details</Text>
      </View>

      <View style={styles.card}>
  <View style={styles.nameContainer}>
    <Text style={styles.cardName}>Adeagbo Josiah</Text>
    <Image source={require('../assets/icons/logo.png')} style={styles.logo} />
  </View>

  <Text style={styles.label}>Card Number</Text>
  <Text style={styles.cardNumber}>
    {isCardVisible ? '5061 2453 7281 4925' : '5061 24** **** 4925'}
  </Text>
  
  {/* Always render the expiration and CVV container, but change the text based on visibility */}
  <View style={styles.expcvv}>
    <View style={styles.exp}>
      <Text style={styles.label}>Expires On</Text>
      <Text style={styles.cardExpiry}>{isCardVisible ? '12/25' : '**/**'}</Text>
    </View>
    <View style={styles.cvv}>
      <Text style={styles.label}>CVV</Text>
      <Text style={styles.cardCvv}>{isCardVisible ? '123' : '***'}</Text>
    </View>
  </View>

  <View style={styles.cardLogos}>
    <Text style={styles.cardSerial}>Serial No. {isCardVisible ? '1290789359' : '**********'}</Text>
    <Image source={require('../assets/icons/verve.png')} style={styles.verveLogo} />
  </View>
</View>


      <TouchableOpacity style={styles.showDetailsButton} onPress={() => setIsVisible(true)}>
        <MaterialIcons name="visibility" size={20} color="#007bff" />
        <Text style={styles.showDetailsText}>Show details</Text>
      </TouchableOpacity>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('CardSettings')}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="settings" size={16} color="#007bff" />
          </View>
          <Text style={styles.actionText}>Card Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Channels')}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="tune" size={20} color="#007bff" />
          </View>
          <Text style={styles.actionText}>Card Channels</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Block')}>
          <View style={styles.iconContainerBlock}>
            <MaterialIcons name="block" size={20} color="#ff4d4d" />
          </View>
          <Text style={styles.actionText}>Block Card</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <View style={styles.transactionContainer}>
        <View style={styles.iconContainer}>
          <Ionicons name="time-outline" size={16} color="gray" />
        </View>
        <Text style={styles.noTransactionsText}>No recent transactions yet</Text>
      </View>

      <BottomSheet isVisible={isVisible}>
        <View style={styles.bottomSheetContainer}>
          <Icon name="info" color="#007bff" size={50} />
          <Text style={styles.sheetTitle}>Confirm Action</Text>
          <Text style={styles.sheetMessage}>Enter your transaction PIN to see card details</Text>
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
        </View>
      </BottomSheet>
    </View>
  );
};

export default CardDetails;

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
    marginTop: 30,
    marginBottom: 30,
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
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 15,
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  cardName: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardNumber: {
    color: '#ffffff',
    fontSize: 18,
    letterSpacing: 2,
    marginBottom: 8,
    fontWeight: '700',
  },
  cardSerial: {
    color: '#f8f8f8',
    fontSize: 12,
    marginBottom: 10,
    fontWeight: '500'
  },
  cardLogos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  logo: {
    width: 80,
    height: 20,
  },
  verveLogo: {
    width: 60,
    height: 20,
  },
  showDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  showDetailsText: {
    color: colors.primary,
    fontSize: 14,
    marginLeft: 5,
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
  },
  actionText: {
    color: '#555',
    fontSize: 12,
    marginTop: 5,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginTop: 20,
    marginBottom: 10,
  },
  transactionContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noTransactionsText: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 10,
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: colors.label,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainerBlock: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: colors.warningLabel,
    justifyContent: 'center',
    alignItems: 'center',
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
  cardExpiry: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  cardCvv: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
    alignSelf: 'flex-end'
  },
  expcvv:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: 10,
    alignItems: 'center',
    gap: 50
  },
  label:{
    color: '#f8f8f8',
    fontSize: 12,
    },
    nameContainer:{
      flexDirection: 'row',
      marginBottom: 20,
      alignItems: 'center',
      gap: 110
    }
});
