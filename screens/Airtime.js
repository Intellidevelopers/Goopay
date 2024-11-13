import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useRef } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons'; // Requires expo install expo-vector-icons
import colors from '../components/colors';
import { BottomSheet, Icon } from '@rneui/themed';

const Airtime = ({ navigation }) => {
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  
  // Suggested amounts for quick selection
  const suggestedAmounts = ['₦50.00', '₦100.00', '₦200.00', '₦500.00', '₦1,000.00', '₦2,000.00'];

  // Available networks
  const networks = [
    { id: 'mtn', name: 'MTN', image: require('../assets/networks/mtn.png') },
    { id: 'airtel', name: 'AIRTEL', image: require('../assets/networks/airtel.png') },
    { id: '9mobile', name: '9MOBILE', image: require('../assets/networks/9mobile.png') },
    { id: 'glo', name: 'GLO', image: require('../assets/networks/glo.png') },
  ];

  // Handle network selection
  const selectNetwork = (networkId) => {
    setSelectedNetwork(networkId);
  };

  // Handle amount selection
  const selectAmount = (amount) => {
    setSelectedAmount(amount);
  };

  // Handle phone number selection from contacts
  const openContactPicker = () => {
    // Here, use a package like `react-native-contacts` to access the contact list
    // Set the selected phone number after choosing a contact
    // Example: setPhoneNumber('07012345678');
  };

  const [atmLimit, setAtmLimit] = useState(30000);
  const [posLimit, setPosLimit] = useState(200000);
  const [webLimit, setWebLimit] = useState(200000);
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);


  const [isVisible, setIsVisible] = useState(false);
  const [pin, setPin] = useState(['', '', '', '']);
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false); // New state for card visibility
  const [loading, setLoading] = useState(false); // New state for loading

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
    setIsVisible(false); // Close the PIN bottom sheet
    setIsLoadingVisible(true); // Show the loading bottom sheet
  
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 6000)); // Simulate loading time
  
    // After loading is done, navigate to the next screen
    setIsCardVisible(true);
    navigation.navigate('Home');
    setIsLoadingVisible(false); // Hide the loading bottom sheet
  };
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Airtime</Text>
      </View>

      {/* Network Selection */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.networkContainer}>
          {networks.map((network) => (
            <TouchableOpacity
              key={network.id}
              style={[styles.networkButton, selectedNetwork === network.id && styles.selectedNetwork]}
              onPress={() => selectNetwork(network.id)}
            >
              <Image source={network.image} style={styles.networkIcon} />
              <Text style={[styles.networkText, selectedNetwork === network.id && styles.selectedNetworkText]}>{network.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Suggested Amount Selection */}
        <Text style={styles.sectionTitle}>Choose Amount</Text>
        <View style={styles.amountContainer}>
          {suggestedAmounts.map((amount) => (
            <TouchableOpacity
              key={amount}
              style={[styles.amountButton, selectedAmount === amount && styles.selectedAmount]}
              onPress={() => selectAmount(amount)}
            >
              <Text style={[styles.amountText, selectedAmount === amount && styles.selectedAmountText]}>{amount}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Phone Number Input */}
        <View style={styles.inputContainer}>
          <View style={styles.phoneNumberContainer}>
            <TextInput
              style={styles.phoneNumberInput}
              placeholder="Phone Number"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
            <TouchableOpacity onPress={openContactPicker}>
              <Ionicons name="call-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Amount Input */}
          <TextInput
            style={styles.amountDropdown}
            placeholder="Enter Amount"
            value={selectedAmount}
            onChangeText={(text) => setSelectedAmount(text)} // Add this line to make it editable
          />
        </View>

        {/* From Account Information */}
        <View style={styles.fromAccount}>
          <Text style={styles.fromAccountText}>From</Text>
          <Text style={styles.fromAccountDetails}>Personal Account - ₦1,450,920.00</Text>
        </View>
      </ScrollView>

      {/* Pay Button */}
      <TouchableOpacity 
        style={[styles.payButton, !selectedNetwork && styles.disabledPayButton]} 
        disabled={!selectedNetwork}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.payButtonText}>Pay</Text>
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

    {loading ? ( // Loading spinner conditionally rendered
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

export default Airtime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.greyBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  networkContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  networkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%', // 2 items per row
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  selectedNetwork: {
    backgroundColor: colors.primary,
  },
  networkIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  networkText: {
    color: '#000',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 10,
  },
  amountContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  amountButton: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: colors.label,
  },
  phoneNumberInput: {
    flex: 1,
    fontSize: 16,
  },
  amountDropdown: {
    fontSize: 16,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.label,
  },
  fromAccount: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: colors.white,
  },
  fromAccountText: {
    color: '#555',
  },
  fromAccountDetails: {
    fontWeight: '500',
  },
  payButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20, // Added spacing to the button from the bottom
    position: 'absolute', // Position at the bottom
    left: 16,
    right: 16,
    bottom: 16, // Aligns button at the bottom
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  scrollContent: {
    paddingBottom: 80, // Adjusts padding to avoid overlap with the pay button
  },
  disabledPayButton: {
    backgroundColor: colors.label, // You can adjust this color to indicate disabled
  },
  selectedAmountText: {
    color: colors.white,
  },
  backButton: {
    position: 'absolute',
    left: -10, // position the back button on the left side
    padding: 10,
  },
  backIcon: {
    color: colors.primary,
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
  icon:{
    color: colors.primary,
  },
  selectedNetworkText:{
    color: colors.white,
  },
  inputContainer:{
    backgroundColor: colors.white,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15
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
