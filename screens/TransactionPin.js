import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import colors from '../components/colors';
import { AntDesign } from '@expo/vector-icons';

const TransferPin = () => {
  const [pin, setPin] = useState(''); // State for the PIN
  const navigation = useNavigation();

  const handlePress = (value) => {
    setPin((prev) => {
      if (value === 'back') {
        return prev.slice(0, -1); // Remove the last character
      }
      if (prev.length < 6) {
        return prev + value; // Append value to the PIN (max 6 digits)
      }
      return prev; // Prevent PIN from exceeding 6 digits
    });
  };

  const handleEnterPress = () => {
    if (pin.length < 4) {
      Toast.show({
        type: 'error',
        text1: 'Invalid PIN',
        text2: 'Transfer PIN must be 6 digits.',
      });
    } else {
      // Navigate to the next screen or process the PIN
      Toast.show({
        type: 'success',
        text1: 'PIN Verified',
        text2: 'Your PIN has been accepted.',
      });
      navigation.navigate('Success', { pin });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButtons} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Confirm Withdrawal</Text>
      </View>

      <View style={styles.pinContainer}>
        <Text style={styles.enterPinText}>Enter Your 6-Digit PIN</Text>
        <View style={styles.pinDisplay}>
          {Array.from({ length: 4 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.pinCircle,
                { backgroundColor: pin.length > index ? colors.primary : colors.greyBackground },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.keypad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'back', '0', 'enter'].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.keypadButton,
              item === 'enter' && styles.enterButton,
              item === 'back' && styles.backButton,
            ]}
            onPress={() => (item === 'enter' ? handleEnterPress() : handlePress(item))}
          >
            {item === 'back' ? (
              <Icon name="backspace-outline" size={24} color="#555" />
            ) : item === 'enter' ? (
              <Icon name="checkmark-outline" size={24} color="#FFFFFF" />
            ) : (
              <Text style={styles.keypadButtonText}>{item}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <Toast />
    </View>
  );
};

export default TransferPin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    paddingTop: 20,
  },
  pinContainer: {
    alignItems: 'center',
    marginVertical: 30,
    marginTop: '20%',
  },
  enterPinText: {
    fontSize: 16,
    color: 'gray',
  },
  pinDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  pinCircle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: colors.greyBackground,
    marginHorizontal: 10,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    justifyContent: 'space-between',
    marginTop: '55%',
    alignSelf: 'center',
  },
  keypadButton: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: colors.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  keypadButtonText: {
    fontSize: 20,
    color: '#333',
    fontWeight: '700',
  },
  enterButton: {
    backgroundColor: colors.primary,
  },
  backButton: {
    backgroundColor: '#D3D3D3',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  backButtons: {
    position: 'absolute',
    left: 10,
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
});
