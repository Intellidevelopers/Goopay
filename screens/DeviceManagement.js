import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../components/colors';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const DeviceManagement = ({ navigation }) => {
  const devices = [
    { id: '1', name: 'Infinix-X693', status: 'Activated', addedDate: '11 September 2023', isActive: true },
    { id: '2', name: 'A03', status: 'Deactivated', addedDate: '14 April 2024', isActive: false },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Device Management</Text>
      </View>
      {devices.map((device) => (
        <View key={device.id} style={styles.deviceCard}>
          <View style={styles.deviceInfo}>
            <View style={styles.headContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="logo-android" size={24} color={colors.primary} />
              </View>
              <TouchableOpacity style={styles.deleteButton}>
                <Ionicons name="trash" color={colors.error} size={20} />
              </TouchableOpacity>
            </View>
            <Text style={styles.deviceName}>{device.name}</Text>
            <Text style={styles.deviceDetails}>ANDROID - Added {device.addedDate}</Text>
          </View>
          <Text style={device.isActive ? styles.activated : styles.deactivated}>{device.status}</Text>
        </View>
      ))}
    </View>
  );
};

export default DeviceManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
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
  deviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  deviceInfo: {
    flex: 1,
    paddingRight: 10,
  },
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.label,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deviceName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deviceDetails: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
    fontWeight: '500',
  },
  activated: {
    color: colors.success,
    fontWeight: '400',
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#EAF8E3',
    alignSelf: 'flex-end', // Align status to the bottom end
  },
  deactivated: {
    color: 'red',
    fontWeight: 'bold',
    padding: 4,
    borderRadius: 5,
    backgroundColor: '#ffcccc',
    alignSelf: 'flex-end', // Align status to the bottom end
  },
  deleteButton:{
    alignSelf: 'flex-end',
    left: 70
  }
});
