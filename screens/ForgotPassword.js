import React, { useState } from 'react';
import { StyleSheet, View, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Text, CircularProgressBar } from '@ui-kitten/components';
import { useProgress } from '../screens/progress.hook';
import colors from '../components/colors';
import phoneStore from '../store/PhoneStore'; 

const ForgotPassword = ({ navigation }) => {
  const [phone, setphone] = useState('');
  const setPhoneNumber = phoneStore((state) => state.setPhoneNumber);
  const progress = useProgress();

  const handleNext = () => {
    setPhoneNumber(phone); // Store the phone number in Zustand state
    navigation.navigate('OtpVerify');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.header}>
        <Text style={styles.title} category="h5">Password Recovery</Text>
        <View style={styles.progressContainer}>
          <CircularProgressBar progress={progress} style={styles.circularProgress} />
          <Text style={styles.progressText}>1/2</Text>
        </View>
      </View>
      <Text style={styles.subtext}>Let's get you sorted out</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          placeholderTextColor="#8F9BB3"
          value={phone}
          onChangeText={(text) => setphone(text)}
        />
      </View>
        
      <TouchableOpacity 
        disabled={!phone} 
        style={[styles.button, !phone && styles.disabledButton]} 
        onPress={handleNext}
      >
        <Text style={[styles.buttonText, !phone && styles.disabledButtonText]}>Next</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};



export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#F6F9FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 50,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  circularProgress: {
    width: 40,
    height: 40,
  },
  progressText: {
    position: 'absolute',
    fontSize: 12,
    color: '#3366FF',
    backgroundColor: '#F6F9FF',
    padding: 4,
    borderRadius: 50,
  },
  subtext: {
    fontSize: 16,
    color: '#8F9BB3',
    marginBottom: 24,
    marginTop: -10
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,

  },
  input: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#EDF1F7',
    fontSize: 16,
    color: '#555',
  },

  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 'auto',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600+',
    fontSize: 16
  },
  disabledButton: {
    backgroundColor: colors.disable, // Disabled button color
  },
  disabledButtonText:{
    color: '#ccc', // Disabled button
    fontWeight: '700'
  }
});
