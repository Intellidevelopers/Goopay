import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import colors from '../components/colors'; // Assuming you have a colors file
import {AntDesign, MaterialIcons } from 'react-native-vector-icons';
import { StatusBar } from 'expo-status-bar';
import useOrderStore from '../store/orderStore';
import { BottomSheet, Icon } from '@rneui/themed';


const OrderScreen = ({ navigation }) => {
  const { order } = useOrderStore();

  const [quantity, setQuantity] = useState('');
  const pricePerUnit = 10.00; // Amount per quantity
  const minimum = 50;
  const maximum = 500000;

  const calculateTotal = () => {
    const qty = parseInt(quantity) || 0;
    return qty * pricePerUnit;
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
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate loading time
  
    // Calculate the total amount
    const amount = calculateTotal();
  
    // Navigate to the BoostSuccess screen with parameters
    navigation.navigate('BoostSuccess', {
      amount: amount.toFixed(2), // Pass the calculated amount
      name: order?.name, // Pass the order name
    });
  
    // After loading is done, hide the loading sheet
    setIsLoadingVisible(false);
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="left" size={20} color={colors.black} />
        </TouchableOpacity>
        <Text style={styles.title}>
          {order?.name}
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.input}>
            <AntDesign name='link' size={16}/>
            <TextInput
            placeholder="Enter Link of Post or Page"
            placeholderTextColor={'#666'}
            style={{flex: 1}}
            />
        </View>

        <View style={styles.input}>
          <AntDesign name='codesquare' size={16}/>
          <TextInput
            placeholder="Quantity of Order"
            placeholderTextColor={'#666'}
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
            style={{flex: 1}}
          />
        </View>

        <View style={styles.minMaxContainer}>
          <Text style={styles.minMaxText}>Minimum - {minimum}</Text>
          <Text style={styles.minMaxText}>Maximum - {maximum}</Text>
        </View>
      </View>

      <View style={styles.amountButton}>
        <MaterialIcons name='calculate' size={20} color={'#fff'}/>
        <Text style={styles.amountText}>₦ {calculateTotal().toFixed(2)}</Text>
      </View>

      <View style={styles.centerContainer}>
        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Click to see service notes</Text>
          <AntDesign name="down" size={16} color={colors.black} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.dropdown}>
          <Text style={styles.dropdownText}>Learn about service descriptions</Text>
          <AntDesign name="down" size={16} color={colors.black} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
          onPress={() => setIsVisible(true)}
          style={[
            styles.continueButton,
            {
              backgroundColor: quantity ? colors.primary : colors.disable,
            },
          ]}
          disabled={!quantity || parseInt(quantity) < minimum}
        >
          <Text style={styles.continueText}>Continue</Text>
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

      <StatusBar backgroundColor={colors.greyBackground}/>
    </ScrollView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    paddingHorizontal: 10,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  backButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 25,
  },
  title: {
    color: colors.black,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    width: '85%'
  },
  inputContainer: {
    marginBottom: 20,
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 15
  },
  input: {
    backgroundColor: colors.input,
    color: colors.black,
    borderRadius: 15,
    fontSize: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10,
    padding: 5
  },
  minMaxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  minMaxText: {
    color: colors.grey,
    fontSize: 12,
  },
  amountButton: {
    backgroundColor: colors.periwinkle,
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 15,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  amountText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  dropdownText: {
    color: colors.black,
    fontSize: 16,
  },
  continueButton: {
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 8,
  },
  continueText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  centerContainer:{
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 20,
  },  bottomSheetContainer: {
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