import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import colors from '../components/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ChangePin = ({ navigation }) => {
  const [oldPin, setOldPin] = useState(['', '', '', '']);
  const [newPin, setNewPin] = useState(['', '', '', '']);
  const [confirmPin, setConfirmPin] = useState(['', '', '', '']);

  const oldPinRefs = useRef([]);
  const newPinRefs = useRef([]);
  const confirmPinRefs = useRef([]);

  const handlePinInput = (value, index, setPin, pin, pinRefs) => {
    const updatedPin = [...pin];
    updatedPin[index] = value;
    setPin(updatedPin);

    // Move to the next input or previous on deletion
    if (value) {
      if (index < pin.length - 1) {
        pinRefs.current[index + 1].focus();
      }
    } else if (index > 0) {
      pinRefs.current[index - 1].focus();
    }
  };

  const handleKeyPress = (e, index, pinRefs) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !pinRefs.current[index].value) {
      pinRefs.current[index - 1].focus();
    }
  };

  const isButtonDisabled = () =>
    oldPin.includes('') || newPin.includes('') || confirmPin.includes('') || newPin.join('') !== confirmPin.join('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Change PIN</Text>
      </View>

      <View style={styles.pinSection}>
        <Text style={styles.label}>Enter your old PIN</Text>
        <View style={styles.pinInputContainer}>
          {oldPin.map((_, index) => (
            <TextInput
              key={`oldPin-${index}`}
              style={styles.pinInput}
              keyboardType="numeric"
              maxLength={1}
              value={oldPin[index]}
              onChangeText={(value) => handlePinInput(value, index, setOldPin, oldPin, oldPinRefs)}
              onKeyPress={(e) => handleKeyPress(e, index, oldPinRefs)}
              ref={(ref) => (oldPinRefs.current[index] = ref)}
            />
          ))}
        </View>
      </View>

      <View style={styles.pinSection}>
        <Text style={styles.label}>Enter your new PIN</Text>
        <View style={styles.pinInputContainer}>
          {newPin.map((_, index) => (
            <TextInput
              key={`newPin-${index}`}
              style={styles.pinInput}
              keyboardType="numeric"
              maxLength={1}
              value={newPin[index]}
              onChangeText={(value) => handlePinInput(value, index, setNewPin, newPin, newPinRefs)}
              onKeyPress={(e) => handleKeyPress(e, index, newPinRefs)}
              ref={(ref) => (newPinRefs.current[index] = ref)}
            />
          ))}
        </View>
      </View>

      <View style={styles.pinSection}>
        <Text style={styles.label}>Confirm your new PIN</Text>
        <View style={styles.pinInputContainer}>
          {confirmPin.map((_, index) => (
            <TextInput
              key={`confirmPin-${index}`}
              style={styles.pinInput}
              keyboardType="numeric"
              maxLength={1}
              value={confirmPin[index]}
              onChangeText={(value) => handlePinInput(value, index, setConfirmPin, confirmPin, confirmPinRefs)}
              onKeyPress={(e) => handleKeyPress(e, index, confirmPinRefs)}
              ref={(ref) => (confirmPinRefs.current[index] = ref)}
            />
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={[styles.updateButton, isButtonDisabled() && styles.disabledButton]}
        disabled={isButtonDisabled()}
      >
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChangePin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.greyBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: -10,
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
  pinSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  pinInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: 20,
    alignItems: 'center',
    borderRadius: 8,
    gap: 10,
  },
  pinInput: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: colors.input,
    textAlign: 'center',
    fontSize: 18,
  },
  updateButton: {
    marginTop: 'auto',
    paddingVertical: 15,
    backgroundColor: colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },
  disabledButton: {
    backgroundColor: '#E0E0E0',
  },
  updateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
