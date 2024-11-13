import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { FontAwesome6, FontAwesome } from '@expo/vector-icons';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import colors from '../components/colors';

const Signup = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [isSelected, setSelection] = useState(false);
  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [lastNameFocused, setLastNameFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const handleFirstNameChange = (text) => {
    setFirstName(text);
    setFirstNameError(text ? '' : 'First name is required');
  };

  const handleLastNameChange = (text) => {
    setLastName(text);
    setLastNameError(text ? '' : 'Last name is required');
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    const error = validatePassword(password);
    setPasswordError(error);
  };

  const handlePhoneChange = (text) => {
    setPhone(text);
    const isValidPhone = text.length === 11 && /^\d{11}$/.test(text);
    setIsPhoneValid(isValidPhone);
    setPhoneError(isValidPhone ? '' : 'Phone number must be 11 digits');
  };

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push('Must be at least 8 characters');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Must include a lowercase letter');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Must include an uppercase letter');
    }
    if (!/\d/.test(password)) {
      errors.push('Must include a number');
    }
    if (!/[@$!%*?&]/.test(password)) {
      errors.push('Must include a special character');
    }
    return errors.join(', ');
  };

  const handleSignUp = () => {
    const isValid = firstName && lastName && isPhoneValid && !validatePassword(password);
    if (isValid) {
      setModalVisible(true);
    } else {
      setFirstNameError(firstName ? '' : 'First name is required');
      setLastNameError(lastName ? '' : 'Last name is required');
      setPhoneError(isPhoneValid ? '' : 'Invalid phone number');
      setPasswordError(validatePassword(password));
    }
  };

  const toggleCheckbox = () => {
    setSelection(!isSelected);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
        <Image source={require('../assets/icons/logo-blue.png')} style={styles.logo}/>
      <Text style={styles.title}>Create your account</Text>

      <ScrollView contentContainerStyle={styles.formContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={[styles.input, firstNameFocused && styles.inputFocused]}
          placeholder="John"
          onFocus={() => setFirstNameFocused(true)}
          onBlur={() => setFirstNameFocused(false)}
          onChangeText={handleFirstNameChange}
          value={firstName}
        />
        {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}

        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={[styles.input, lastNameFocused && styles.inputFocused]}
          placeholder="Doe"
          onFocus={() => setLastNameFocused(true)}
          onBlur={() => setLastNameFocused(false)}
          onChangeText={handleLastNameChange}
          value={lastName}
        />
        {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}

        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.phoneInputContainer}>
          <TextInput
            style={[ phoneFocused && styles.inputFocused, { flex: 1 }]}
            placeholder="08012345678"
            onFocus={() => setPhoneFocused(true)}
            onBlur={() => setPhoneFocused(false)}
            onChangeText={handlePhoneChange}
            value={phone}
            keyboardType="number-pad"
          />
          {isPhoneValid && (
            <FontAwesome name="check-circle" size={20} color="green" style={styles.checkIcon} />
          )}
        </View>
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={[styles.input, passwordFocused && styles.inputFocused]}
          placeholder="Password"
          secureTextEntry
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          onChangeText={handlePasswordChange}
          value={password}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        <View style={styles.termsContainer}>
          <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
            <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
              {isSelected && <FontAwesome6 name="check" size={16} color="#fff" />}
            </View>
          </TouchableOpacity>
          <Text style={styles.termsText}>
            I certify that I'm 18 years of age or older, and I agree to the
            <Text style={styles.link}> User Agreement</Text> and
            <Text style={styles.link}> Privacy Policy</Text>
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Create account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginText} onPress={() => navigation.navigate('Login')}>
            <Text>Already have an account? </Text>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
      </ScrollView>
    </GestureHandlerRootView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.greyBackground,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: '700',
    paddingHorizontal: 10
  },
  input: {
    height: 55,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: '400',
    backgroundColor: colors.input,
  },
  inputFocused: {
    borderColor: '#4945FF',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#4945FF',
    borderColor: '#4945FF',
  },
  termsText: {
    flex: 1,
    flexWrap: 'wrap',
    fontWeight: '400',
    fontSize: 12,
    color: '#444',
  },
  link: {
    color: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600+',
    fontSize: 16
  },
  label: {
    fontWeight: '700',
    marginBottom: 10,
    fontSize: 16,
    color: '#444',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
 
  logo: {
    width: 150,
    height: 60,
    resizeMode: 'contain',
    marginTop: 40
  },
 
  labels:{
    fontWeight: "400",
    color: "#4945FF"
  },
  formContainer: {
    width: '95%',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    paddingVertical: 20,
    borderRadius: 15,
    
  },
  phoneInputContainer: {
    height: 55,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: '400',
    backgroundColor: colors.input,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    shadowColor: "#000",
  },
  checkIcon: {
    marginRight: 15,
  },
  loginText:{
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
    color: "#4945FF",
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  loginLink:{
    color: colors.primary,
    fontWeight: '700',
  },
  logoText:{
    fontWeight: "700",
    fontSize: 24,
    color: colors.primary,
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
  }
});

export default Signup;
