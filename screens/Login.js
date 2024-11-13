import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import colors from '../components/colors';

const Login = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const handlePasswordChange = (password) => {
    setPassword(password);
    const error = validatePassword(password);
    setPasswordError(error);
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

  useEffect(() => {
    const keyboardShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    // Clean up listeners on unmount
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Image source={require('../assets/icons/logo-blue.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome, Adeagbo</Text>

      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80} // Adjust as needed
      >
        <ScrollView contentContainerStyle={[styles.formContainer, keyboardVisible && styles.formContainerShift]} showsVerticalScrollIndicator={false}>
          <View style={[styles.inputContainer, passwordFocused && styles.inputFocused]}>
            <FontAwesome5 name="lock" size={18} color="#666" style={styles.lockIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!isPasswordVisible}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              onChangeText={handlePasswordChange}
              value={password}
            />
            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <FontAwesome 
                name={isPasswordVisible ? "eye" : "eye-slash"} 
                size={20} 
                color="#666" 
                style={styles.eyeIcon} 
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginText} onPress={() => navigation.navigate('Forgot')}>
            <Text style={styles.loginLink}>Forgot Password?</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginBottom: 40,
    fontWeight: '700',
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 55,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
    backgroundColor: colors.input,
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 14,
    fontWeight: '400',
  },
  inputFocused: {
    borderColor: '#4945FF',
  },
  lockIcon: {
    marginRight: 10,
  },
  eyeIcon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
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
  formContainer: {
    width: '95%',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    paddingVertical: 20,
    borderRadius: 15,
    marginTop: 330,
    transition: 'margin 0.3s', // Optional for smooth transition
  },
  formContainerShift: {
    marginTop: 40, // Adjust this value based on your design
  },
  loginText: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
    color: "#4945FF",
    alignSelf: "center",
  },
  loginLink: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  keyboardAvoidingContainer:{
    marginTop: 'auto',
    marginBottom: 40
  }
});

export default Login;
