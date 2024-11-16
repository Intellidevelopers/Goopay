import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { AntDesign, Entypo, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';
import colors from '../components/colors';
import useBettingStore from '../store/useBettingStore';
import { Radio } from '@ui-kitten/components';
import { BottomSheet, Icon } from '@rneui/themed';
import useSuccessBettingStore from '../store/useSucceeBettingStore';


const BettingDetails = ({ navigation }) => {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [amount, setAmount] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedOption, setSelectedOption] = useState(null); // State to track radio selection
  const selectedBiller = useBettingStore((state) => state.selectedBiller);
  const setSuccessBiller = useSuccessBettingStore((state) => state.setSuccessBiller);
  const [isPlanSheetVisible, setIsPlanSheetVisible] = useState(false);
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
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate loading time

    // Save biller details to the success store
    setSuccessBiller({
      name: selectedBiller.name,
      image: selectedBiller.image,
      amount,
      plan: selectedPlan,
      option: selectedOption,
      phone,
      email
    });

    // After loading is done, navigate to the Success screen
    navigation.navigate('BettingSuccess');
    setIsLoadingVisible(false); // Hide the loading bottom sheet
  };

  if (!selectedBiller) {
    return <Text>No biller selected</Text>;
  }

  const handleNext = () => {
    console.log('Next button pressed');
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setIsPlanSheetVisible(false);
  };

  const billers = [
    { id: '1', name: 'SportyBet', image: require('../assets/betting/sporty.png') },
    { id: '2', name: 'SportyBet', image: require('../assets/betting/sporty.png') },
    { id: '3', name: 'SportyBet', image: require('../assets/betting/sporty.png') },
    { id: '4', name: 'SportyBet', image: require('../assets/betting/sporty.png') },
  ];


  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.billerItem}
      onPress={() => {
        handlePlanSelect(item.name); // Pass the plan name (or modify as needed)
      }}
    >
      <Image source={item.image} style={styles.billerSheetImage} />
      <Text style={styles.billerSheetName}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={20} color="#888" />
    </TouchableOpacity>
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Electricity</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={selectedBiller.image} style={styles.billerImage} />
        <Text style={styles.billerName}>{selectedBiller.name}</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Plan</Text>
          <View style={styles.selectedBillerContainer}>
          <TouchableOpacity style={styles.selectedBiller} onPress={() => setIsPlanSheetVisible(true)}>
          <Text style={styles.selectedPlanText}>
            {selectedPlan || 'Select Plan'}
          </Text>

            <AntDesign name="down" size={16} color={colors.black} />
          </TouchableOpacity>
          </View>
        </View>
        
        <Text style={styles.label}>Buy from</Text>
        <View style={styles.selectedBillerContainer}>
        <View style={styles.accountBalanceContainer}>
            <Image source={require('../assets/icons/icon.png')} style={styles.logo}/>
            <View style={styles.accountItemsContainer}>
                <Text style={styles.name}>Adeagbo Josiah</Text>
                <Text style={styles.text}>Account Number: 8088886823</Text>
                <Text style={styles.text}>Balance: ₦1,450,000.00</Text>
            </View>
        </View>
        </View>
        

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Enter Phone Number</Text>
          <View style={styles.selectedBillerContainer}>
            <View style={styles.meterInputContainer}>
              <TextInput
                style={styles.meterInput}
                placeholder="0000-0000-0000-0000"
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.arrowButton}>
                <Entypo name="chevron-small-right" size={34} color={colors.white} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.amountContainer}>
            <View style={styles.amountandNaira}>
              <Text style={styles.naira}>₦</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0.00"
                keyboardType="numeric"
                placeholderTextColor={colors.black}
                value={amount}
                onChangeText={setAmount}
              />
            </View>
          </View>
        </View>

        <Text style={styles.customerInfoText}>Customer Information</Text>
        <View style={styles.customerInfoContainer}>
          <View style={styles.customerInfoItemsContainer}>
            <Text style={styles.infoText}>Send to myself</Text>
            <Radio
              checked={selectedOption === 'myself'}
              onChange={() => setSelectedOption('myself')}
            />
          </View>
          <View style={styles.customerInfoItemsContainer}>
            <Text style={styles.infoText}>Send to others</Text>
            <Radio
              checked={selectedOption === 'another'}
              onChange={() => setSelectedOption('another')}
            />
          </View>
        </View>

        {selectedOption === 'myself' && (
          <View style={styles.inputContainer}>
            <View style={styles.selectedBillerContainer}>
            <View style={styles.myselftInputEmail}>
              <View style={styles.countryContainer}>
                <Image source={require('../assets/icons/flag.png')} style={styles.flag}/>
                <Text style={styles.countryCode}>+234</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

              <View style={styles.myselftInput}>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
                editable={false}
                value="adeagbojosiah1@gmail.com"
              />
              <FontAwesome5 name="lock" size={18} color="#666" style={styles.lockIcon} />
              </View>

              
            </View>
          </View>
        )}

        {selectedOption === 'another' && (
          <>
            <View style={styles.inputContainer}>
            <View style={styles.selectedBillerContainer}>
            <View style={styles.myselftInputEmail}>
              <View style={styles.countryContainer}>
                <Image source={require('../assets/icons/flag.png')} style={styles.flag}/>
                <Text style={styles.countryCode}>+234</Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>

              <View style={styles.myselftInput}>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              </View>

              
            </View>
          </View>
          </>
        )}

      <TouchableOpacity
        disabled={!amount || !selectedOption}
        style={[styles.button, (!amount || !selectedOption) && styles.disabledButton]}
        onPress={() => setIsVisible(true)}
      >
        <Text style={[styles.buttonText, (!amount || !selectedOption) && styles.disabledButtonText]}>Next</Text>
      </TouchableOpacity>
      </ScrollView>

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

      <BottomSheet isVisible={isPlanSheetVisible} onBackdropPress={() => setIsPlanSheetVisible(false)}>
        <View style={styles.planSheetContainer}>
        <View style={styles.flex}>
            <Text style={styles.bottomSheetTitle}>Select Plan</Text>
            <TouchableOpacity onPress={() => setIsPlanSheetVisible(false)}>
                <Feather name='x' size={20} color={colors.primary}/>
            </TouchableOpacity>
        </View>
        <FlatList
        data={billers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
        </View>
      </BottomSheet>
    </View>
  );
};
export default BettingDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.greyBackground,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginVertical: 10,
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
    left: 10, // position the back button on the left side
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
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  dropdown: {
    borderRadius: 8,
    backgroundColor: colors.input,
  },
  infoContainer: {
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '700'
  },
  accountInfo: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#FFF',
  },
  accountName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  accountDetails: {
    fontSize: 14,
    color: '#555',
  },
  accountBalance: {
    fontSize: 14,
    color: '#555',
  },
  meterInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'space-between'
  },
  meterInput: {
    fontSize: 16,
    color: '#333',
    backgroundColor: colors.input,
    padding: 10,
    borderRadius: 10,
    width: '80%',
  },
  myselftInput:{
    fontSize: 16,
    color: '#000',
    backgroundColor: colors.input,
    padding: 12,
    borderRadius: 10,
    width: '100%',
    marginBottom: 15,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  myselftInputEmail:{
    fontSize: 16,
    color: '#000',
    backgroundColor: colors.input,
    borderRadius: 10,
    width: '100%',
    marginBottom: 15,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center'
  },
  arrowButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  arrowText: {
    color: '#FFF',
    fontSize: 18,
  },
  amountInput: {
    flex: 1,
    marginLeft: 15,
    fontSize: 20,
    fontWeight: '700',
    color: colors.black
  },
  amountContainer:{
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#FFF',
  },
  customerInfoContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  customerInfoText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '400'
  },
  billerName:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
    textAlign: 'center',
  },
  billerImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
    alignSelf: 'center',
    borderRadius: 50
  },
  selectedBillerContainer:{
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedBiller:{
    borderRadius: 8,
    backgroundColor: colors.input,
    padding: 10,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  naira:{
    fontSize: 20,
    color: '#aaa',
    fontWeight: '900',
    borderRightWidth: 1,
    paddingRight: 15,
    borderColor: '#ccc',
    padding: 10
  },
  amountandNaira:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: colors.input,
    alignItems: 'center',
    borderRadius: 10
  },
  customerInfoItemsContainer:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#ccc', // Disabled button style
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButtonText: {
    color: '#999', // Disabled button text style
  },
  input:{
    color: colors.black,
    fontWeight: '500',
    flex: 1
  },
  flag:{
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: '#ccc'
  },
  countryContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRightWidth: 1,
    paddingRight: 10,
    marginRight: 10,
    padding: 12,
    borderColor: '#ccc'
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
  },
  selectedPlanText: {
    fontSize: 16,
    color: colors.black,
  },
  planSheetContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  planOption: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  planText: {
    fontSize: 18,
    color: colors.black,
  },
  bottomSheetTitle:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  flex:{
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 0.1
  },
  billerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
  },
  billerSheetImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 16,
  },
  billerSheetName: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontWeight: '500'
  },
  accountBalanceContainer:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  name:{
    fontSize: 16,
    color: colors.black,
    fontWeight: 'bold'
  },
  text:{
    fontSize: 14,
    color: '#555',
    fontWeight: '500'
  }
});
