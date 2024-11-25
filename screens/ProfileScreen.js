import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, Feather, AntDesign, FontAwesome6, Ionicons } from '@expo/vector-icons';
import colors from '../components/colors';
import useAuthStore from '../store/authStore';


const ProfileScreen = ({ navigation }) => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout(); // Set isAuthenticated to false
    navigation.navigate('Login'); // Redirect to the login screen
  };

  const accountOptions = [
    { id: '1', icon: 'user', label: 'Profile Details', route: 'ProfileDetails' },
    { id: '2', icon: 'file', label: 'Request Account Number', route: 'request-account-number' },
    { id: '3', icon: 'message-square', label: 'Live Chat', route: 'Chat' },
    { id: '4', icon: 'shield', label: 'Account Verification', route: 'AccountVerification' },
    { id: '5', icon: 'bar-chart', label: 'Account Levels', route: 'AccountLevel' },
    { id: '6', icon: 'users', label: 'Referrals', route: 'Referral' },
    { id: '7', icon: 'settings', label: 'Settings', route: 'Settings' },

  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>My Profile</Text>

      {/* Profile Info */}
      <View style={styles.profileInfo}>
        <Image
          source={require('../assets/icons/user.png')}
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.nameText}>Josiah Adeagbo</Text>
          <View style={styles.flex}>
          <Text style={styles.accountText}>Haven MFB - 8880018776</Text>
          <TouchableOpacity>
            <Ionicons name='copy' size={15}/>
          </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.levelSection}>
        <View style={styles.levelInfo}>
          <MaterialCommunityIcons name="alert-circle-outline" size={20} color="#FFA726" />
          <Text style={styles.levelText}>Level 2</Text>
        </View>
        <TouchableOpacity style={styles.upgradeButton} onPress={() => navigation.navigate('AccountLevel')}>
          <Text style={styles.upgradeText}>Upgrade</Text>
        </TouchableOpacity>
      </View>

      {/* Log Out Option */}
      <TouchableOpacity style={styles.optionContainer} onPress={handleLogout}>
        <Feather name='lock' size={20} color="#333" style={styles.optionIcon} />
        <Text style={styles.optionText}>Log out</Text>
        <Feather name="chevron-right" size={20} color="#aaa" />
      </TouchableOpacity>

      {/* Account Options */}
      <FlatList
        data={accountOptions}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.optionContainer} onPress={() => navigation.navigate(item.route)}>
            <Feather name={item.icon} size={20} color="#333" style={styles.optionIcon} />
            <Text style={styles.optionText}>{item.label}</Text>
            <Feather name="chevron-right" size={20} color="#aaa" />
          </TouchableOpacity>
        )}
        ListHeaderComponent={<Text style={styles.sectionHeader}>Account</Text>}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  profileDetails: {
    flex: 1,
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  usernameText: {
    fontSize: 14,
    color: '#777',
  },
  accountText: {
    fontSize: 14,
    color: '#777',
  },
  levelSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.label,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  levelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  upgradeButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  upgradeText: {
    color: colors.error,
    fontSize: 14,
    fontWeight: '500',
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginVertical: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  optionIcon: {
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  flex: {
    flexDirection: 'row',
    gap: 10
  },
});
