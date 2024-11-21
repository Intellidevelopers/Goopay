import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { Modalize } from 'react-native-modalize';
import { AntDesign, FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../components/colors';
import { BottomSheet, Switch } from '@rneui/themed';
import useBeneficiaryStore from '../store/useBeneficiaryStore';

const { height } = Dimensions.get('window');

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


const CustomTabBar = ({ index, setIndex }) => (
  <View style={styles.customTabBarContainer}>
    {['Recent', 'All Beneficiaries'].map((title, i) => (
      <TouchableOpacity
        key={i}
        style={[styles.tabButton, index === i ? styles.activeTabButton : styles.inactiveTabButton]}
        onPress={() => setIndex(i)}
      >
        <Text style={index === i ? styles.activeTabText : styles.inactiveTabText}>{title}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const BankTransfer = ({ navigation }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [index, setIndex] = useState(0);
  const modalizeRef = useRef(null);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
  const [isBankBottomSheetVisible, setIsBankBottomSheetVisible] = useState(false);
  const [beneficiaryName, setBeneficiaryName] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);
  const [isAddedToBeneficiary, setIsAddedToBeneficiary] = useState(false);
  const { setBeneficiaryDetails } = useBeneficiaryStore(); 

  const beneficiaries = [
    { id: '1', initials: 'TA', name: 'TEMIDAYO IMISI AYODELE', bank: 'OPay', account: '9163087203' },
    { id: '2', initials: 'MA', name: 'MARY ABIODUN ADEAGBO', bank: 'OPay', account: '9166349766' },
    { id: '3', initials: 'AJ', name: 'ADEAGBO JOSIAH', bank: 'OPay', account: '9166349766' },
  ];

  const recent = [
    { id: '1', initials: 'TA', name: 'TEMIDAYO IMISI AYODELE', bank: 'OPay', account: '9163087203' },
    { id: '2', initials: 'MA', name: 'MARY ABIODUN ADEAGBO', bank: 'OPay', account: '9166349766' },
    { id: '3', initials: 'OO', name: 'Ominyi Isaac Ogbu', bank: 'PalmPay', account: '7054867271' },
    { id: '4', initials: 'EA', name: 'EKENE PRINCE ANYASIE', bank: 'PalmPay', account: '7065478987' },
  ];

  const banks = [
    { id: '1', name: 'First Bank', initials: 'FB' },
    { id: '2', name: 'GTBank', initials: 'GT' },
    { id: '3', name: 'Access Bank', initials: 'AB' },
    { id: '4', name: 'Zenith Bank', initials: 'ZB' },
    { id: '5', name: 'UBA', initials: 'UB' },
    { id: '6', name: 'UBA', initials: 'UB' },
    { id: '7', name: 'UBA', initials: 'UB' },
    { id: '8', name: 'UBA', initials: 'UB' },
    { id: '9', name: 'UBA', initials: 'UB' },
  ];

  const onVerificationComplete = (verifiedDetails) => {
    // Save beneficiary details in the store or navigate directly with details
    setBeneficiaryDetails(verifiedDetails); // If using Zustand
    navigation.navigate('TransferDetails', { // Passing details directly
      beneficiaryDetails: verifiedDetails,
    });
  };

  const onAccountNumberChange = (text) => {
    setAccountNumber(text);
    if (text.length === 10) {
      setIsBankBottomSheetVisible(true);
    }
  };

  const verifyAccountNumber = () => {
    if (accountNumber.length === 10) {
      const verifiedDetails = {
        accountNumber,
        bankName: selectedBank?.name,
        beneficiaryName: 'Verified Account Holder',
      };
      setBeneficiaryName(verifiedDetails.beneficiaryName);
      setIsBottomSheetVisible(true);
      // Remove the call to `onVerificationComplete`
    } else {
      setBeneficiaryName('');
    }
  };
  
  

  const onBankSelect = (bank) => {
    setSelectedBank(bank);
    verifyAccountNumber();
    setIsBankBottomSheetVisible(false);
  };

  const onBeneficiarySelect = (beneficiary) => {
    // Set the selected beneficiary details
    setBeneficiaryName(beneficiary.name);
    setAccountNumber(beneficiary.account);
    setSelectedBank({ name: beneficiary.bank });
    
    // Show the bottom sheet
    setIsBottomSheetVisible(true);
  };


  // Handle swipe gestures
  const handleGesture = ({ nativeEvent }) => {
    const { translationX } = nativeEvent;
    if (translationX < -30 && index < 1) {
      setIndex(index + 1); // Swipe left to go to the next tab
    } else if (translationX > 30 && index > 0) {
      setIndex(index - 1); // Swipe right to go to the previous tab
    }
  };


  const handleBeneficiaryPress = (beneficiary) => {
    const beneficiaryDetails = {
      name: beneficiary.name,
      bank: beneficiary.bank,
      account: beneficiary.account,
    };
    onVerificationComplete(beneficiaryDetails);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Transfer</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
            <Ionicons name="refresh" size={24} color={colors.primary} />
            <Ionicons name="ellipsis-vertical" size={24} color={colors.primary} />
          </View>
        </View>

        {/* Transfer From Section */}
        <Text style={styles.sectionLabel}>Transfer From</Text>
        <View style={styles.transferFrom}>
          <Image source={require('../assets/icons/icon.png')} style={styles.icon} />
          <View>
            <Text style={styles.name}>JOSIAH ADEAGBO</Text>
            <Text style={styles.accountDetails}>Account Number: 8088886823</Text>
            <Text style={styles.accountDetails}>Balance: ₦3,517.86</Text>
          </View>
        </View>

        {/* New Beneficiary Section */}
        <Text style={styles.sectionLabel}>New Beneficiary</Text>
        <View style={styles.inputContainer1}>
          <View style={styles.inputContainer2}>
            <MaterialCommunityIcons name="bank" size={20} color="#888" />
            <TextInput
              style={styles.input}
              placeholder="Account Number"
              keyboardType="numeric"
              maxLength={10}
              value={accountNumber}
              onChangeText={onAccountNumberChange}
            />
          </View>
        </View>

        {/* Select Beneficiary Section */}
        <Text style={styles.sectionLabel}>Select Beneficiary</Text>
        <View style={styles.inputContainer}>
          <View style={styles.searchContainer}>
            <Ionicons name="search-outline" size={20} color="#888" />
            <TextInput style={styles.searchInput} placeholder="Search account number or name" />
          </View>
        </View>

        {/* Custom Tab Bar */}
        <CustomTabBar index={index} setIndex={setIndex} />

        {/* Gesture Handler for Swiping */}
        <PanGestureHandler onGestureEvent={handleGesture} activeOffsetX={[-30, 30]}>
          <View style={{ flex: 1 }}>
            {index === 1 ? (
              <FlatList
                data={beneficiaries}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.beneficiaryItem} onPress={() => onBeneficiarySelect(item)}>
                    <View style={styles.beneficiaryIcon}>
                      <Text style={styles.beneficiaryInitial}>{item.initials}</Text>
                    </View>
                    <View>
                      <Text style={styles.beneficiaryName}>{item.name}</Text>
                      <Text style={styles.beneficiaryDetails}>
                        {item.bank} - {item.account}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <FlatList
                data={recent}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.beneficiaryItem} onPress={() => onBeneficiarySelect(item)}>
                    <View style={styles.beneficiaryIcon}>
                      <Text style={styles.beneficiaryInitial}>{item.initials}</Text>
                    </View>
                    <View>
                      <Text style={styles.beneficiaryName}>{item.name}</Text>
                      <Text style={styles.beneficiaryDetails}>
                        {item.bank} - {item.account}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </PanGestureHandler>

        {/* Bottom Sheet */}
        <BottomSheet
          isVisible={isBankBottomSheetVisible}
          onBackdropPress={() => setIsBankBottomSheetVisible(false)}
        >
          <View style={[styles.bottomSheetContent, { height: height * 0.5 }]}>
            <Text style={styles.bottomSheetTitle}>Select Bank</Text>
            <FlatList
              data={banks}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.beneficiaryItem}
                  onPress={() => onBankSelect(item)}
                >
                  <View style={styles.beneficiaryIcon}>
                    <Text style={styles.beneficiaryInitial}>{item.initials}</Text>
                  </View>
                  <View>
                    <Text style={styles.beneficiaryName}>{item.name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </BottomSheet>
        <BottomSheet
  isVisible={isBottomSheetVisible}
  onBackdropPress={() => setIsBottomSheetVisible(false)}
>
  <View style={styles.bottomSheetContent}>
    <View style={styles.beneficiaryItem}>
      <View style={styles.beneficiaryIcon}>
        <Text style={styles.beneficiaryInitial}>
          {beneficiaryName ? beneficiaryName.charAt(0) : ''}
        </Text>
      </View>
      <View style={{}}>
        <Text style={styles.beneficiaryName}>{beneficiaryName}</Text>
        <Text style={styles.beneficiaryDetails}>
          {selectedBank?.name} - {accountNumber}
        </Text>
      </View>
      <TouchableOpacity style={styles.changeButton}>
        <Text style={styles.changeButtonText}>Change</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.addToBeneficairyView}>
      <View style={styles.beneficiaryHeader}>
        <FontAwesome6 name='users-line' color={colors.primary} size={20} />
        <Text style={styles.addToButtonText}>Add to Beneficiaries?</Text>
      </View>
      <CustomSwitch
        value={isAddedToBeneficiary}
        onValueChange={(val) => setIsAddedToBeneficiary(val)}
        trackColor={{ false: "#d3d3d3", true: colors.primary }}
        thumbColor="#fff"
      />
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.closeButton} onPress={() => setIsBottomSheetVisible(false)}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => {
          const verifiedDetails = {
            accountNumber,
            bankName: selectedBank?.name,
            beneficiaryName,
          };
          onVerificationComplete(verifiedDetails);
          setIsBottomSheetVisible(false);
        }}
      >
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  </View>
</BottomSheet>


      </View>
    </GestureHandlerRootView>
  );
};

export default BankTransfer;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.greyBackground, padding: 16 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30, marginTop: 40 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', left: 10,},
  transferFrom: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFFFFF', borderRadius: 8, marginBottom: 16 },
  name: { fontWeight: 'bold', fontSize: 16 },
  accountDetails: { color: '#666', fontSize: 12, fontWeight: '500' },
  sectionLabel: { fontSize: 14, color: '#666', marginBottom: 8, fontWeight: '500' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.white, padding: 15, borderRadius: 15, marginBottom: 16, paddingVertical: 20 },
  input: { flex: 1, marginLeft: 10 },
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.input, padding: 6, borderRadius: 12,
    paddingHorizontal: 10
   },
  searchInput: { flex: 1, marginLeft: 10 },
  customTabBarContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 },
  tabButton: { paddingVertical: 10, paddingHorizontal: 15 },
  activeTabButton: { borderBottomWidth: 2, borderBottomColor: '#4F83FF' },
  inactiveTabButton: {},
  activeTabText: { color: '#4F83FF', fontWeight: 'bold' },
  inactiveTabText: { color: '#777777' },
  beneficiaryItem: { flex: 1, flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#FFFFFF', borderRadius: 8, marginBottom: 10 },
  beneficiaryIcon: { width: 40, height: 40, backgroundColor: '#D9E6FF', borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  beneficiaryInitial: { color: '#4F83FF', fontWeight: 'bold' },
  beneficiaryName: { fontWeight: 'bold' },
  beneficiaryDetails: { color: '#666', fontSize: 12 },
  bottomSheetContent: { 
    padding: 16, 
    backgroundColor: colors.greyBackground,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  bottomSheetTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 16 },
  icon: { width: 40, height: 40, resizeMode: 'contain', marginBottom: 10, marginTop: 10, marginRight: 10 },
  inputContainer1:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 8,
    marginBottom: 16,
    paddingVertical: 20
  },
  inputContainer2:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.input,
    padding: 6,
    borderRadius: 12,
    paddingHorizontal: 10
  },
  addButton: { backgroundColor: colors.primary, padding: 12, borderRadius: 8, alignItems: 'center' },
  addButtonText: { color: '#fff', fontWeight: 'bold' },
  beneficiaryDetailText: { fontSize: 14, color: '#444', marginVertical: 4 },
  changeButtonText:{
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  changeButton:{
    padding: 15,
    marginLeft: 10
  },
  addToBeneficairyView:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginBottom: 16,
    backgroundColor: colors.label,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
    padding: 15
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop: 20,
    paddingBottom: 15
  },
  closeButton:{
    backgroundColor: colors.label,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 60
  },
  confirmButton:{
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 50
  },
  closeButtonText:{
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  confirmButtonText:{
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  beneficiaryHeader:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  addToButtonText:{
    fontWeight: '500'
  }
});
