import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { BottomSheet } from '@rneui/themed';
import { AntDesign, Ionicons } from 'react-native-vector-icons';
import colors from '../components/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useStore from '../store/PhoneStore'; // Adjust the path as needed

const OtpVerification = ({ navigation }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const phoneNumber = useStore((state) => state.phoneNumber);

  const handleChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text) {
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    } else if (index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const isOtpComplete = otp.every((digit) => digit.length === 1);

  return (
    <GestureHandlerRootView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Verify Your Phone Number</Text>
      <Text style={styles.subtitle}>Please provide the OTP sent to this phone number</Text>
      
      {/* Display the actual phone number retrieved from the store */}
      <Text style={styles.phoneNumber}>{phoneNumber}</Text>

      <View style={styles.content}>
        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              maxLength={1}
              keyboardType="numeric"
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </View>

        <View style={styles.resendContainer}>
          <View style={styles.resend}>
            <AntDesign name="exclamationcircle" size={18} style={styles.noticeIcon} />
            <Text style={styles.resendText}>Didn’t get the code?</Text>
          </View>
          <TouchableOpacity onPress={openBottomSheet}>
            <Text style={styles.resendLink}>Resend</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, isOtpComplete ? styles.buttonEnabled : styles.buttonDisabled]}
        disabled={!isOtpComplete}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      <View style={styles.helpContainer}>
        <AntDesign name="questioncircle" size={20} style={styles.helpIcon} />
        <Text style={styles.helpText}>Need Help? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Help')}>
          <Text style={styles.helpLink}>Click Here</Text>
        </TouchableOpacity>
      </View>

      <BottomSheet
        isVisible={isBottomSheetVisible}
        onBackdropPress={closeBottomSheet}
      >
        <View style={styles.bottomSheetContent}>
          <AntDesign name="infocirlce" size={45} style={styles.infoIcon} />
          <Text style={styles.bottomSheetTitle}>Resend OTP</Text>
          
          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.iconContainer}>
              <Ionicons name="keypad" size={20} color={'#0057FF'} />
            </View>
            <Text style={styles.optionText}>Get via USSD</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <View style={styles.iconContainer}>
              <Ionicons name="mail" color={'#828282'} size={20} />
            </View>
            <Text style={styles.optionText2}>Send via SMS in <Text style={styles.duration}>09:24</Text></Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};


export default OtpVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: colors.greyBackground,
    paddingTop: 50,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222B45',
    marginTop: 20,
    textAlign: 'left'
  },
  subtitle: {
    fontSize: 14,
    color: colors.secondary,
    marginTop: 10,
    textAlign: 'left',
    marginBottom: 5
  },
  phoneNumber: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 40,
    textAlign: 'left',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    width: '100%',
  },
  otpInput: {
    width: 42,
    height: 50,
    backgroundColor: colors.input,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    color: '#222B45',
  },
  otpInputFilled: {
    borderColor: '#3366FF',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 15,
    backgroundColor: colors.label,
    borderRadius: 8,
    width: '100%',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  resendText: {
    fontSize: 14,
    color: '#8F9BB3',
  },
  resendLink: {
    fontSize: 14,
    color: '#3366FF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  button: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 'auto',
  },
  buttonEnabled: {
    backgroundColor: colors.primary,
  },
  buttonDisabled: {
    backgroundColor: '#E4E9F2',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  helpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
    gap: 5,
    marginBottom: 20
  },
  helpText: {
    fontSize: 14,
    color: colors.deem,
    fontWeight: '600'
  },
  helpLink: {
    fontSize: 14,
    color: '#3366FF',
    fontWeight: 'bold',
  },
  backIcon:{
    color: colors.primary
  },
  content:{
    backgroundColor: '#fff',
    alignSelf: 'center',
    paddingHorizontal: 20,
    width:  '100%',
    borderRadius: 10
  },
  noticeIcon:{
    color: colors.primary
  },
  resend:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  helpIcon:{
    color: colors.deem
  },
  bottomSheetContent: { 
    padding: 20, 
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  infoIcon: { 
    marginBottom: 10,
    color: colors.primary,
    marginBottom: 20,
    marginTop: 20
  },
  bottomSheetTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  optionButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 15, 
    width: '100%',
    paddingHorizontal: 10
  },
  optionText: { 
    fontSize: 14, 
    marginLeft: 10, 
    color: colors.black,
    fontWeight: '600'
  },
  optionText2: { 
    fontSize: 14, 
    marginLeft: 10, 
    color: colors.deem,
    fontWeight: '600'
  },
  iconContainer:{
    width: 40,
    height: 40,
    backgroundColor: colors.input,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  duration:{
    fontWeight: 'bold',
    color: colors.primary
  }
});
