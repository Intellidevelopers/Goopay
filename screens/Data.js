import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, ScrollView, ActivityIndicator } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from '../components/colors';
import { BottomSheet, Icon } from '@rneui/themed';
import useDataStore from '../store/useDataStore';

  const Data = ({ navigation }) => {
    // Use Zustand store to manage shared state
    const {
      selectedNetwork,
      selectedDataPlan,
      selectedAmount,
      phoneNumber,
      setSelectedNetwork,
      setSelectedDataPlan,
      setSelectedAmount,
      setPhoneNumber,
    } = useDataStore();
  
    const [isDataPlanSheetVisible, setIsDataPlanSheetVisible] = useState(false);
    const [isLoadingVisible, setIsLoadingVisible] = useState(false);
    const [isPinSheetVisible, setIsPinSheetVisible] = useState(false);
    const [pin, setPin] = useState(['', '', '', '']);
    const pinRefs = useRef([]);
    const [loading, setLoading] = useState(false);
    const [isConfirmEnabled, setIsConfirmEnabled] = useState(false);
    const [isSummaryVisible, setIsSummaryVisible] = useState(false); // New state for summary sheet
    const [selectedNetworkIcon, setSelectedNetworkIcon] = useState(null);
  
    const dataPlans = [
        { id: '1', networkId: 'mtn', plan: '500MB SME - 30 Days', amount: '₦160' },
            { id: '2', networkId: 'mtn', plan: '1GB SME - 30 Days', amount: '₦290' },
            { id: '3', networkId: 'mtn', plan: '1GB SME - 30 Days', amount: '₦290' },
            { id: '4', networkId: 'mtn', plan: '1GB SME - 30 Days', amount: '₦290' },
            { id: '5', networkId: 'mtn', plan: '1GB SME - 30 Days', amount: '₦290' },
            { id: '6', networkId: 'airtel', plan: '2GB - 30 Days', amount: '₦580' },
            { id: '7', networkId: '9mobile', plan: '5GB - 30 Days', amount: '₦1450' },
            { id: '8', networkId: '9mobile', plan: '5GB - 30 Days', amount: '₦1450' },
            { id: '9', networkId: '9mobile', plan: '5GB - 30 Days', amount: '₦1450' },
            { id: '10', networkId: '9mobile', plan: '5GB - 30 Days', amount: '₦1450' },
            { id: '11', networkId: 'glo', plan: '10GB - 30 Days', amount: '₦2900' },
            { id: '12', networkId: 'glo', plan: '10GB - 30 Days', amount: '₦2900' },
            { id: '13', networkId: 'glo', plan: '10GB - 30 Days', amount: '₦2900' },
            { id: '14', networkId: 'glo', plan: '10GB - 30 Days', amount: '₦2900' },
        // Add more plans as needed
      ];
    
      const networks = [
        { id: 'mtn', name: 'MTN', image: require('../assets/networks/mtn.png') },
        { id: 'airtel', name: 'AIRTEL', image: require('../assets/networks/airtel.png') },
        { id: '9mobile', name: '9MOBILE', image: require('../assets/networks/9mobile.png') },
        { id: 'glo', name: 'GLO', image: require('../assets/networks/glo.png') },
      ];
    
  
      const selectDataPlan = (plan, amount) => {
        setSelectedDataPlan(plan);
        setSelectedAmount(amount); // Update selectedAmount here
        setIsDataPlanSheetVisible(false);
      };
      
  
    const onConfirm = () => {
      setIsSummaryVisible(true); // Show summary sheet
    };
  
    const confirmTransaction = async () => {
      setIsPinSheetVisible(false); // Close the PIN bottom sheet
      setIsLoadingVisible(true); // Show the loading bottom sheet
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate loading time
      navigation.navigate('Home');
      setIsLoadingVisible(false); // Hide the loading bottom sheet
    };
  
    const handlePinChange = (index, value) => {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);
  
      if (value && index < 3) {
        pinRefs.current[index + 1].focus();
      } else if (!value && index > 0) {
        pinRefs.current[index - 1].focus();
      }
  
      setIsConfirmEnabled(newPin.every((digit) => digit !== ''));
    };

    const selectNetwork = (networkId) => {
        const network = networks.find((net) => net.id === networkId);
        setSelectedNetwork(networkId);
        setSelectedNetworkIcon(network.image); // Set selected network icon
      };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Data</Text>
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

        {/* Data Plan Selection */}
        <TouchableOpacity
          style={styles.dataPlanInput}
          onPress={() => setIsDataPlanSheetVisible(true)}
        >
          <Text style={styles.dataPlanText}>{selectedDataPlan || 'Choose Data Plan'}</Text>
          <AntDesign name="down" size={16} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <View style={styles.phoneNumberContainer}>
            <TextInput
              style={styles.phoneNumberInput}
              placeholder="Phone Number"
              keyboardType="numeric"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
            />
            <TouchableOpacity>
              <Ionicons name="call-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.fromAccount}>
          <Text style={styles.fromAccountText}>From</Text>
          <Text style={styles.fromAccountDetails}>Personal Account - ₦1,450,920.00</Text>
        </View>

        {/* Pay Button */}
        <TouchableOpacity
          style={styles.payButton}
          onPress={onConfirm}
        >
          <Text style={styles.payButtonText}>Pay</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Data Plan Bottom Sheet */}
      <BottomSheet isVisible={isDataPlanSheetVisible} onBackdropPress={() => setIsDataPlanSheetVisible(false)}>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheetSubviews}>
            <Text style={styles.bottomSheetTitle}>Data Plans</Text>
            <TouchableOpacity onPress={() => setIsDataPlanSheetVisible(false)}>
              <AntDesign name='close' size={20} color={colors.primary}/>
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.dataPlanScrollContent}>
            {dataPlans
              .filter((item) => item.networkId === selectedNetwork) // Filter plans based on selected network
              .map((item) => (
                <TouchableOpacity
                key={item.id}
                onPress={() => selectDataPlan(item.plan, item.amount)} // Pass amount as well
                style={styles.dataPlanItem}
              >
                <Text style={styles.dataPlanItemText}>{item.plan}</Text>
              </TouchableOpacity>
              
            ))}
          </ScrollView>
        </View>
      </BottomSheet>

      {/* Confirm PIN Bottom Sheet */}
      <BottomSheet isVisible={isPinSheetVisible}>
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
        <TouchableOpacity style={styles.closeButton} onPress={() => setIsPinSheetVisible(false)}>
          <Text style={styles.closeText}>Close</Text>
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

        {/* Transaction summary */}
{/* Transaction summary */}
<BottomSheet isVisible={isSummaryVisible}>
        <View style={styles.bottomSheetContainer2}>
          <View style={styles.bottomSheetSubviews}>
          <Text style={styles.summaryTitle}>Transaction Summary</Text>
            <TouchableOpacity onPress={() => setIsSummaryVisible(false)}>
              <AntDesign name='close' size={20} color={colors.primary}/>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <Text style={styles.networkText}>Network</Text>
            {selectedNetworkIcon && <Image source={selectedNetworkIcon} style={styles.networkIcon} />}
          </View>
          <View style={styles.row}>
            <Text style={styles.networkText}>Data Plan</Text>
            <Text style={styles.networkText}>{selectedDataPlan}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.networkText}>Amount</Text>
            <Text style={styles.networkText}>{selectedAmount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.networkText}>Phone Number</Text>
            <Text style={styles.networkText}>{phoneNumber}</Text>
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

        
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: colors.greyBackground },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerText: { fontSize: 16, fontWeight: 'bold', marginLeft: 20 },
  networkContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 'auto'},
  dataPlanInput: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, backgroundColor: colors.white, borderRadius: 10, marginBottom: 20 },
  dataPlanText: { fontSize: 16, color: '#555' },
  input: { padding: 12, backgroundColor: colors.input, borderRadius: 10, marginBottom: 20 },
  payButtonText: { color: '#fff', fontSize: 16, fontWeight: '500' },
  bottomSheetContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',    // Position the BottomSheet at the bottom
    bottom: 50,               // Align it to the bottom of the screen
    left: 0,
    right: 0,
    maxHeight: '100%',        // Optional: limit height to 60% to avoid covering the entire screen
    marginTop: 'auto',       // Ensure it stays anchored to the bottom
  },
  
  bottomSheetContainer2: {
    padding: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    maxHeight: '100%',
    marginTop: 'auto' // Limits the height to 60% of the screen height
  },
  
  bottomSheetTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 10 },
  dataPlanItem: { paddingVertical: 15 },
  dataPlanItemText: { fontSize: 16, color: '#333' },
  loadingBottomSheetContainer: { padding: 20, alignItems: 'center' },
  loadingMessage: { marginTop: 10, fontSize: 16, color: '#555' },
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
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: colors.label,
  },
  phoneNumberInput: {
    flex: 1,
    fontSize: 16,
  },
  inputContainer:{
    backgroundColor: colors.white,
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15
  },
  payButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 'auto', // Added spacing to the button from the bottom
  },
  scrollContent: {
    paddingBottom: 20, // Adjusts padding to avoid overlap with the pay button
    flex: 1,
  },
  bottomSheetSubviews:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedNetworkText:{
    color: colors.white,
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
    color: colors.white
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
  },

  row:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20
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
  sunnaryButton:{
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  }
});

export default Data;
