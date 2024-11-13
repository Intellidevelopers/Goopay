import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, MaterialCommunityIcons, AntDesign, Feather } from '@expo/vector-icons';
import colors from '../components/colors';


const AccountVerification = ({ navigation }) => {
  return (
    <View style={styles.container}>

        <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
        </TouchableOpacity>
        </View>

      <Text style={styles.headerText}>Account Verification</Text>
      <Text style={styles.subtitle}>
        Please follow these steps to complete your verification
      </Text>

      <View style={styles.verificationItem}>
        <Feather name="mail" size={20} color="black" />
        <Text style={styles.verificationText}>Email Verification</Text>
        <MaterialCommunityIcons name="check-circle" size={20} color={colors.success} />
      </View>

      <View style={styles.verificationItem}>
        <Feather name="lock" size={20} color="black" />
        <Text style={styles.verificationText}>BVN & Face Verification</Text>
        <MaterialCommunityIcons name="check-circle" size={20} color={colors.success} />
      </View>

      <View style={styles.verificationItem}>
        <AntDesign name="bank" size={20} color="black" />
        <Text style={styles.verificationText}>Connect Your Bank</Text>
        <MaterialCommunityIcons name="check-circle" size={20} color={colors.success} />
      </View>
    </View>
  );
};

export default AccountVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    marginTop: 40,
    marginBottom: 40,
  },
  backButton: {
  },
  backIcon: {
    color: colors.primary,
  },
  headerText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
    marginBottom: 40,
  },
  verificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  verificationText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    fontWeight: '500'
  },
});
