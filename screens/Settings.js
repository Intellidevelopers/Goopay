import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; // Or any icon library you're using
import colors from '../components/colors';

const Settings = ({ navigation }) => {
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Settings</Text>
      </View>

      {/* Security & Privacy Section */}
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.sectionTitle}>Security & Privacy</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.item}>
          <View style={styles.iconContainer}>
            <Ionicons name="lock-closed" size={24} color={colors.primary} />
          </View>
          <Text style={styles.itemText}>Change Password</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
            <View style={styles.iconContainer}>
                <Ionicons name="log-in" size={24} color={colors.primary} />
            </View>
          <Text style={styles.itemText}>Login Options</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.primary} />
        </TouchableOpacity>

        <View style={styles.item}>
          <View style={styles.iconContainer}>
          <Ionicons name="eye-off" size={24} color={colors.primary} />
          </View>
          <Text style={styles.itemText}>Hide Balance</Text>
          <Switch
            value={isBalanceHidden}
            onValueChange={(value) => setIsBalanceHidden(value)}
            trackColor={{ false: '#d3d3d3', true: colors.primary }}
            thumbColor={colors.greyBackground}
          />
        </View>
      </View>

      {/* App & Device Section */}
      <Text style={styles.sectionTitle}>App & Device</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('DeviceManagement')}>
          <View style={styles.iconContainer}>
          <Ionicons name="phone-portrait" size={24} color={colors.primary} />
          </View>
          <Text style={styles.itemText}>Device Management</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <View style={styles.iconContainer}>
          <Ionicons name="notifications" size={24} color={colors.primary} />
          </View>
          <Text style={styles.itemText}>Notification Preferences</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Theme')}>
          <View style={styles.iconContainer}>
          <Ionicons name="color-palette" size={24} color={colors.primary} />
          </View>
          <Text style={styles.itemText}>Themes</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Transactions Section */}
      <Text style={styles.sectionTitle}>Transactions</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('CardLimit')}>
          <View style={styles.iconContainer}>
          <AntDesign name="arrowsalt" size={24} color={colors.primary} />
          </View>
          <Text style={styles.itemText}>Transaction Limits</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('AccountLevel')}>
          <View style={styles.iconContainer}>
          <MaterialIcons name="business-center" size={24} color={colors.primary} />
          </View>
          <Text style={styles.itemText}>Account Limits</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Others</Text>
      <View style={styles.card}>
        <TouchableOpacity style={styles.item}>
          <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="chat-question" size={24} color={colors.primary} />
          </View>
          <Text style={styles.itemText}>Language</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <View style={styles.deleteIconContainer}>
          <Ionicons name="trash" size={24} color={colors.error} />
          </View>
          <Text style={styles.deleteBtnText}>Delete Account</Text>
          <Ionicons name="chevron-forward-outline" size={20} color={colors.error} />
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: colors.greyBackground,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#a0a0a0',
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  itemText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  iconContainer:{
    backgroundColor: colors.label,
    padding: 8,
    borderRadius: 10
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
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  icon:{
    color: colors.primary,
  },
  deleteBtnText:{
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: colors.error,
    fontWeight: '500',
  },
  deleteIconContainer:{
    backgroundColor: colors.warningLabel,
    padding: 8,
    borderRadius: 10
  }
});
