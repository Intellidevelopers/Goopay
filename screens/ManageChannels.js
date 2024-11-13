import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from '../components/colors';

const ManageChannels = ({ navigation }) => {
  const [isWebEnabled, setIsWebEnabled] = useState(true);
  const [isPOSEnabled, setIsPOSEnabled] = useState(true);
  const [isATMEnabled, setIsATMEnabled] = useState(true);

  const channels = [
    {
      id: 1,
      title: 'Web',
      subtitle: 'Use card to make online payments',
      icon: 'globe-outline',
      isEnabled: isWebEnabled,
      setIsEnabled: setIsWebEnabled,
    },
    {
      id: 2,
      title: 'POS',
      subtitle: 'Use card on POS devices',
      icon: 'card-outline',
      isEnabled: isPOSEnabled,
      setIsEnabled: setIsPOSEnabled,
    },
    {
      id: 3,
      title: 'ATM',
      subtitle: 'Use card on ATM machines',
      icon: 'cash-outline',
      isEnabled: isATMEnabled,
      setIsEnabled: setIsATMEnabled,
    },
  ];

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Manage Channels</Text>
        </View>
      <View style={styles.card}>
        <Text style={styles.subHeader}>Manage the channels your card can be used on</Text>
        {channels.map((channel) => (
          <View key={channel.id} style={styles.channelRow}>
            <View style={styles.iconContainer}>
              <Ionicons name={channel.icon} size={20} color="#0057FF" />
            </View>
            <View style={styles.channelInfo}>
              <Text style={styles.channelTitle}>{channel.title}</Text>
              <Text style={styles.channelSubtitle}>{channel.subtitle}</Text>
            </View>
            <Switch
              value={channel.isEnabled}
              onValueChange={channel.setIsEnabled}
              thumbColor={channel.isEnabled ? colors.primary : colors.lightGray}
              trackColor={{ false: colors.lightGray, true: colors.label }}
            />
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateButtonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ManageChannels;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // centers items horizontally in the header
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: -10, // position the back button on the left side
    padding: 10,
  },
  backIcon: {
    color: colors.primary,
  },
  headerText:{
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
  },
  subHeader: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.label,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  channelInfo: {
    flex: 1,
  },
  channelTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.black,
  },
  channelSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  updateButton: {
    marginTop: 30,
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20
  },
  updateButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
});
