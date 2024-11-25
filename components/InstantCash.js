import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
  Image
} from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import colors from '../components/colors';
import { BottomSheet, Icon } from '@rneui/themed';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import convertStore from '../store/convertStore';  // Import the store

const InstantCash = () => {
    const setAirtimeDetails = convertStore((state) => state.setAirtimeDetails); // Access set function from the store

    const navigation = useNavigation(); // <-- Access navigation here
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isPinSheetVisible, setIsPinSheetVisible] = useState(false);
  const pinRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [isConfirmEnabled, setIsConfirmEnabled] = useState(false);
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [selectedNetworkIcon, setSelectedNetworkIcon] = useState(null);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [calculatedCredit, setCalculatedCredit] = useState(0);
  const [chargeFee, setChargeFee] = useState(0);
  const [pinCode, setPinCode] = useState(['', '', '', '']);
  const [isLoadingVisible, setIsLoadingVisible] = useState(false);



  const networks = [
    { id: 'mtn', label: 'MTN', image: require('../assets/networks/mtn.png') },
    { id: 'airtel', label: 'AIRTEL', image: require('../assets/networks/airtel.png') },
    { id: '9mobile', label: '9MOBILE', image: require('../assets/networks/9mobile.png') },
    { id: 'glo', label: 'GLO', image: require('../assets/networks/glo.png') },
  ];

  const handleNetworkSelect = (network) => {
    setSelectedNetwork(network.id);
    setSelectedNetworkIcon(network.image);
    setBottomSheetVisible(true);
  };
  

  const onConfirm = () => {
    if (!selectedPhoneNumber || selectedAmount <= 0) {
      alert('Please fill out all fields.');
      return;
    }

    const fee = selectedAmount * 0.1; // 10% fee calculation
    const credit = selectedAmount - fee;

    setChargeFee(fee);
    setCalculatedCredit(credit);
    setIsSummaryVisible(true);

    setAirtimeDetails(selectedAmount, fee, credit);
  };

  const confirmTransaction = async () => {
    setIsPinSheetVisible(false); // Close the PIN bottom sheet
    setIsLoadingVisible(true); // Show the loading bottom sheet
  
    // Show the toast message
    Toast.show({
      type: 'success', // Use 'success', 'error', or 'info'
      text1: 'Transaction Successful!', // Main title
      text2: 'Your airtime share was processed successfully.', // Subtitle
      visibilityTime: 3000, // How long the toast will be visible (ms)
      position: 'bottom', // Position: 'top', 'bottom', or 'center'
    });
  
    // Delay navigation to the Success screen for 3 seconds
    setTimeout(() => {
      setIsLoadingVisible(false); // Hide the loading bottom sheet
      navigation.navigate('ConvertSuccess'); // Navigate to the Success screen
    }, 3000); // 3-second delay
  };

  const handlePinChange = (index, value) => {
    const newPin = [...pinCode];
    newPin[index] = value;
    setPinCode(newPin);

    if (value && index < 3) {
      pinRefs.current[index + 1].focus();
    } else if (!value && index > 0) {
      pinRefs.current[index - 1].focus();
    }

    setIsConfirmEnabled(newPin.every((digit) => digit !== ''));
  };

    // Recalculate credit and fee on amount change
    useEffect(() => {
        if (selectedAmount && !isNaN(selectedAmount)) {
          const fee = parseFloat(selectedAmount) * 0.1; // 10% fee
          const credit = parseFloat(selectedAmount) - fee;
          setChargeFee(fee.toFixed(2)); // Limit to 2 decimal places
          setCalculatedCredit(credit.toFixed(2)); // Limit to 2 decimal places
        } else {
          setChargeFee(0);
          setCalculatedCredit(0);
        }
      }, [selectedAmount]);

      const [pin, setPin] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="chevron-left" size={24} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Airtime 2 Cash</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Network Selection */}
      <View style={styles.networkContainer}>
        {networks.map((network) => (
          <TouchableOpacity
          key={network.id}
          style={[styles.networkButton, selectedNetwork === network.id && styles.selectedNetworkButton]}
          onPress={() => handleNetworkSelect(network)}

        >
            <Image source={network.image} style={styles.networkIcon} />
            <Text style={[styles.networkText, selectedNetwork === network.id && styles.selectedNetworkLabel]}>
              {network.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Inputs */}
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={selectedPhoneNumber}
          onChangeText={setSelectedPhoneNumber}
        />
        <Text style={styles.inputDescription}>The phone number you want to transfer from</Text>

        <TextInput
          style={styles.input}
          placeholder="Amount"
          keyboardType="numeric"
          value={selectedAmount}
          onChangeText={(value) => setSelectedAmount(value)}
        />
        <Text style={styles.inputDescription}>Airtime amount you want to transfer</Text>

        <View style={styles.resultContainer}>
          <Text style={styles.resultLabel}>You will Receive</Text>
          <Text style={styles.resultValue}>₦{calculatedCredit}</Text>
        </View>
        <Text style={styles.resultFee}>Charge Fee: ₦{chargeFee}</Text>
      <Text style={styles.inputDescription}>
        This is the amount that will be credited to your wallet
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Airtime Share PIN"
        secureTextEntry={true}
        value={pin}
        onChangeText={(text) => setPin(text)}
        />

      <Text style={styles.inputDescription}>
        This is the PIN required by your network provider to transfer airtime to us.
      </Text>
      <Text style={styles.learnMore}>
        Learn how to get your Network PIN
      </Text>
      </View>
      

      <TouchableOpacity style={styles.payButton} onPress={onConfirm}>
        <Text style={styles.payButtonText}>Pay</Text>
      </TouchableOpacity>

      {/* Transaction Summary */}
      <BottomSheet isVisible={isSummaryVisible}>
        <View style={styles.bottomSheetContainer2}>
          <View style={styles.row}>
            <Text style={styles.summaryTitle}>Transaction Summary</Text>
            <TouchableOpacity onPress={() => setIsSummaryVisible(false)}>
              <AntDesign name="close" size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.networkText}>Network</Text>
            {selectedNetworkIcon && 
            <View style={styles.summaryNetworkIcon}>
                <Image source={selectedNetworkIcon} style={styles.networkIcon} />
            </View>
            }
          </View>
          <View style={styles.row}>
            <Text style={styles.networkText}>Phone Number</Text>
            <Text>{selectedPhoneNumber}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.networkText}>Amount to Transfer</Text>
            <Text>₦{selectedAmount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.networkText}>Charge Fee</Text>
            <Text>₦{chargeFee}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.networkText}>Total to Credit</Text>
            <Text>₦{calculatedCredit}</Text>
          </View>
          <TouchableOpacity
            style={styles.sunnaryButton}
            onPress={() => {
              setIsSummaryVisible(false);
              setIsPinSheetVisible(true);
            }}
          >
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      {/* Bottom Sheet */}
      <Modal
        visible={isBottomSheetVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setBottomSheetVisible(false)}
      >
        <View style={styles.bottomSheetContainer3}>
          <View style={styles.bottomSheet}>
            <Text style={styles.bottomSheetTitle}>
              How to get your {selectedNetwork?.toUpperCase()} Share PIN
            </Text>
            <ScrollView>
              <Text style={styles.bottomSheetContent}>
                Ensure you are on any of these {selectedNetwork?.toUpperCase()} tariffs:
              </Text>
              <Text style={styles.bottomSheetContent}>- MTN Pulse</Text>
              <Text style={styles.bottomSheetContent}>- MTN XtraSpecial</Text>
              <Text style={styles.bottomSheetContent}>
                Else migrate to MTN Pulse using *123*2*2#.
              </Text>
              <Text style={styles.bottomSheetContent}>
                Create a PIN with *321*1*4# if you don’t have one.
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setBottomSheetVisible(false)}
            >
              <Text style={styles.closeButtonText}>OK Got It</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

            {/* Confirm PIN Bottom Sheet */}
            <BottomSheet isVisible={isPinSheetVisible}>
      <View style={styles.bottomSheetContainer}>
    <Icon name="lock" color="#007bff" size={50} />
    <Text style={styles.sheetTitle}>Confirm PIN</Text>
    <Text style={styles.sheetMessage}>Enter your transaction PIN to buy airtime</Text>
    
    <View style={styles.pinContainer}>
      {pinCode.map((value, index) => (
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
          value={pinCode[index]}
          onChangeText={(text) => handlePinChange(index, text)}
        />
      ))}
    </View>

    {loading ? ( // Loading spinner conditionally rendered
      <ActivityIndicator size="large" color={colors.primary} style={styles.loadingIndicator} />
    ) : (
      <View style={styles.sheetActions}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => setIsPinSheetVisible(false)}>
          <Text style={styles.closeBtnText}>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            { backgroundColor: isConfirmEnabled ? colors.primary : '#EDF1F7' },
          ]}
          onPress={confirmTransaction}
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

      {/* Loading Indicator Bottom Sheet */}
        <BottomSheet isVisible={isLoadingVisible}>
            <View style={styles.loadingBottomSheetContainer}>
                <ActivityIndicator size="large" color={colors.primary} style={styles.loadingIndicator} />
                <Text style={styles.loadingMessage}>Processing your transaction</Text>
                <Text style={styles.subText}>Please wait...</Text>
            </View>
        </BottomSheet>
      </ScrollView>
    </View>
  );
};

export default InstantCash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: colors.greyBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // centers items horizontally in the header
    marginTop: 40,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: -10, // position the back button on the left side
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  backIcon: {
    color: colors.black,
    backgroundColor: colors.input,
    padding: 10,
    borderRadius: 30
  },
  networkContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 15
  },
  networkButton: {
    flexBasis: '48%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    marginBottom: 10, // Adds spacing between rows
    flexDirection:'row',
    justifyContent: 'space-around'
  },
  selectedNetworkButton: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  networkLabel: {
    fontSize: 14,
    color: '#333',
  },
  selectedNetworkLabel: {
    color: colors.primary,
  },
  input: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 5,
    backgroundColor: colors.input,
    fontSize: 14,
  },
  inputDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 22,
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: colors.label,
  },
  resultLabel: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',

  },
  resultValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  learnMore: {
    fontSize: 14,
    color: '#007BFF',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  bottomSheetContainer3: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bottomSheetContent: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content:{
    paddingBottom: 20,
    backgroundColor: '#fff',
    paddingTop: 30,
    padding: 10,
    borderRadius: 15,
    marginBottom: 20
  },
  
  bottomSheetContainer2: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: '100%',
    marginTop: 'auto' // Limits the height to 60% of the screen height
  },
  bottomSheetSubviews:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryTitle:{
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: '#ddd'
  },
  
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  networkText: {
    color: '#000',
    fontWeight: '500',
  },
  networkIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  sunnaryButton:{
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  payButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 'auto', // Added spacing to the button from the bottom
  },
  payButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '500' 
  },
  confirmText:{
    color: colors.white,
    fontWeight: '500',
    fontSize: 16,
  },
  resultFee:{
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  summaryNetworkIcon:{
    backgroundColor: colors.label,
    padding: 5,
    borderRadius: 30
  },
  bottomSheetContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingBottom: 30,
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
    color: colors.white
  },
  sheetActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  closeBtn: {
    backgroundColor: colors.label,
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  closeBtnText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '500',
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
  },
});
