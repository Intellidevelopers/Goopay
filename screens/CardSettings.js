import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useRef } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { BottomSheet } from '@rneui/themed';
import colors from '../components/colors';

const CardSettings = ({ navigation }) => {
  const [isOTPSheetVisible, setOTPSheetVisible] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '']);
  const [countdown, setCountdown] = useState(60);

  // Create refs for each OTP input
  const otpInputRefs = Array.from({ length: 4 }, () => useRef(null));

  const settingsOptions = [
    { id: 1, label: 'Custom Name', icon: 'card-outline', route: 'CustomName' },
    { id: 2, label: 'Change PIN', icon: 'lock-closed-outline', route: 'ChangePin' },
    {
      id: 3,
      label: 'Reset PIN',
      icon: 'lock-open-outline',
      onPress: () => {
        setOTPSheetVisible(true);
        setCountdown(60); // Reset countdown to 60 seconds whenever OTP sheet is opened
      },
    },
    { id: 4, label: 'Card Limits', icon: 'card-outline', route: 'CardLimit' },
    { id: 5, label: 'Delete Card', icon: 'trash-outline', color: '#FF5757', route: 'DeleteCard' },
  ];

  const handleOTPInput = (index, value) => {
    const updatedOtpCode = [...otpCode];
    updatedOtpCode[index] = value;
    setOtpCode(updatedOtpCode);

    // Automatically focus the next input if a digit is entered
    if (value && index < otpInputRefs.length - 1) {
      otpInputRefs[index + 1].current.focus();
    }
  };

  const handleBackspace = (index) => {
    if (index > 0 && otpCode[index] === '') {
      otpInputRefs[index - 1].current.focus();
    }
  };

  // Start countdown timer when OTP sheet is visible
  React.useEffect(() => {
    let timer;
    if (isOTPSheetVisible && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prevCountdown => prevCountdown - 1);
      }, 1000);
    }

    // Clear timer when countdown reaches zero or OTP sheet is closed
    if (countdown === 0 || !isOTPSheetVisible) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isOTPSheetVisible, countdown]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Card Settings</Text>
      </View>

      <View style={styles.settingsContainer}>
        <Text style={styles.sectionTitle}>Card Settings</Text>
        <View style={styles.cardContainer}>
          {settingsOptions.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={styles.optionRow}
              onPress={option.onPress || (() => navigation.navigate(option.route))}
            >
              <View style={[styles.iconContainer, option.color && { backgroundColor: '#FFF1F1' }]}>
                <Ionicons name={option.icon} size={20} color={option.color || '#0057FF'} />
              </View>
              <Text style={styles.optionLabel}>{option.label}</Text>
              <Ionicons name="chevron-forward" size={18} color="#0057FF" />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* OTP Verification BottomSheet */}
      <BottomSheet
        isVisible={isOTPSheetVisible}
        onBackdropPress={() => setOTPSheetVisible(false)}
      >
        <View style={styles.otpSheetContent}>
          <AntDesign name="exclamationcircle" size={45} color={colors.primary} />
          <Text style={styles.otpTitle}>Enter OTP Code</Text>
          <Text style={styles.otpDescription}>Please provide the OTP sent to this phone number ***********6823</Text>
          <View style={styles.otpInputContainer}>
            {otpCode.map((code, index) => (
              <TextInput
                key={index}
                ref={otpInputRefs[index]}
                style={styles.otpInput}
                keyboardType="numeric"
                maxLength={1}
                value={code}
                onChangeText={(value) => handleOTPInput(index, value)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') handleBackspace(index);
                }}
              />
            ))}
          </View>
          <Text style={styles.resendOtpText}>Retry in <Text style={styles.link}>{countdown}s</Text></Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => setOTPSheetVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.verifyButton} onPress={() => setOTPSheetVisible(false)}>
              <Text style={styles.verifyButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

export default CardSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  backIcon: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  settingsContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F1F1',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E5F1FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionLabel: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
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
  otpSheetContent: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: colors.greyBackground,
    paddingVertical: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  otpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20
  },
  otpDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '80%',
    marginBottom: 10,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: colors.input
  },
  verifyButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 8,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  resendOtpText: {
    fontWeight: '500',
    marginTop: 10,
    marginBottom: 20,
    alignSelf: 'flex-end',
    color: colors.deepDeem
  },
  link: {
    color: colors.primary,
    fontWeight: '700'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    gap: 20
  },
  closeButton: {
    backgroundColor: colors.label,
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 8,
  },
  closeButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  }
});
