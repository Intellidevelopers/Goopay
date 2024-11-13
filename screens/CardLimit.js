import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Slider } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../components/colors';
import { BottomSheet, Icon } from '@rneui/themed';

const CardLimit = ({ navigation }) => {
  const [atmLimit, setAtmLimit] = useState(30000);
  const [posLimit, setPosLimit] = useState(200000);
  const [webLimit, setWebLimit] = useState(200000);

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
    navigation.navigate('CardDetails ')
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Card Limit</Text>
        </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      <Text style={styles.infoText}>
        In accordance with CBN guidelines, the cash withdrawal limit for your PalmPay Card at ATMs is ₦30,000 per day.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Account Limit</Text>
        <Text style={styles.sectionText}>
          Your account tier(KYC) level has a daily transaction limit of <Text style={styles.boldText}>₦200,000</Text>, which includes Card and In-App transactions.
        </Text>
        <TouchableOpacity>
        <Text style={styles.linkText}>Increase your transaction limit <AntDesign name='right'/></Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Channel Limit</Text>
        <Text style={styles.sectionText}>
          Adjust the sliders below to set your preferred limit for PalmPay Debit Card 507881********2407.
        </Text>

        <View style={styles.limitRow}>
          <Text style={styles.limitLabel}>ATM Daily Limit</Text>
          <Text style={styles.limitValue}>₦{atmLimit.toLocaleString()}</Text>
        </View>
        <Text style={styles.smallText}>ATM withdrawal weekly limit is ₦210,000</Text>
        <View style={styles.head}>
            <Text style={styles.txt}>Min</Text>
            <Text style={styles.txt}>Max</Text>
        </View>
        <Slider
          value={atmLimit}
          onValueChange={setAtmLimit}
          minimumValue={0}
          maximumValue={30000}
          step={1000}
          trackStyle={{ height: 4, backgroundColor: '#E5E5E5' }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: colors.primary }}
          minimumTrackTintColor={colors.primary}
        />
        <View style={styles.down}>
            <Text style={styles.txt}>₦0     </Text>
            <Text style={styles.txt}>₦15,000</Text>
            <Text style={styles.txt}>₦30,000</Text>
        </View>

        <View style={styles.limitRow}>
          <Text style={styles.limitLabel}>POS Daily Limit</Text>
          <Text style={styles.limitValue}>₦{posLimit.toLocaleString()}</Text>
        </View>
        <View style={styles.head}>
            <Text style={styles.txt}>Min</Text>
            <Text style={styles.txt}>Max</Text>
        </View>
        <Slider
          value={posLimit}
          onValueChange={setPosLimit}
          minimumValue={0}
          maximumValue={200000}
          step={1000}
          trackStyle={{ height: 4, backgroundColor: '#E5E5E5' }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: colors.primary }}
          minimumTrackTintColor={colors.primary}
        />
        <View style={styles.down}>
            <Text style={styles.txt}>₦0     </Text>
            <Text style={styles.txt}>₦100,000</Text>
            <Text style={styles.txt}>₦200,000</Text>
        </View>

        <View style={styles.limitRow}>
          <Text style={styles.limitLabel}>WEB Daily Limit</Text>
          <Text style={styles.limitValue}>₦{webLimit.toLocaleString()}</Text>
        </View>
        <View style={styles.head}>
            <Text style={styles.txt}>Min</Text>
            <Text style={styles.txt}>Max</Text>
        </View>
        <Slider
          value={webLimit}
          onValueChange={setWebLimit}
          minimumValue={0}
          maximumValue={200000}
          step={1000}
          trackStyle={{ height: 4, backgroundColor: '#E5E5E5' }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: colors.primary }}
          minimumTrackTintColor={colors.primary}
        />
             <View style={styles.down}>
            <Text style={styles.txt}>₦0     </Text>
            <Text style={styles.txt}>₦100,000</Text>
            <Text style={styles.txt}>₦200,000</Text>
        </View>
      </View>

      
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={() => setIsVisible(true)}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>

      <BottomSheet isVisible={isVisible}>
        <View style={styles.bottomSheetContainer}>
          <Icon name="lock" color="#007bff" size={50} />
          <Text style={styles.sheetTitle}>Confirm PIN</Text>
          <Text style={styles.sheetMessage}>Enter your transaction PIN to save card limit</Text>
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

export default CardLimit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.greyBackground,
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
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 13,
    color: colors.success,
    backgroundColor: '#E8F5E9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  section: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionText: {
    fontSize: 13,
    color: '#555555',
  },
  linkText: {
    color: colors.primary,
    marginTop: 5,
    fontSize: 13,
  },
  limitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  limitLabel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  limitValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  smallText: {
    fontSize: 12,
    color: '#FF9800',
    marginTop: 5,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  boldText:{
    fontWeight: 'bold',
    color: colors.primary,
  },
  head:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginTop: 16,
    borderRadius: 5,
    marginBottom: -8
  },
  txt:{
    color: colors.deem,
    fontSize: 12,
    marginTop: -8
  },
  down:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  content:{
    marginBottom: 20
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
});
