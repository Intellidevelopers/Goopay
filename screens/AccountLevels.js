import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from '../components/colors';


const AccountLevels = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Account Levels</Text>
        </View>

      {/* Max Balance Card */}
      <View style={styles.levelCard}>
        <Text style={styles.levelTitle}>Level 1</Text>
        <View style={styles.levelRow}>
            <Text style={styles.infoLabel}>Daily Limit:</Text>
            <Text style={styles.infoValue}>₦20,000</Text>
        </View>
        <View style={styles.levelRow}>
            <Text style={styles.infoLabel}>Daily Withdrawal Limit:</Text>
        <Text style={styles.infoValue}>₦50,000</Text>
        </View>
        <View style={styles.levelRow}>
            <Text style={styles.infoLabel}>Max Balance:</Text>
        <Text style={styles.infoValue}>₦100,000</Text>
        </View>
      </View>

      {/* Current Level */}
      <View style={[styles.levelCard, styles.currentLevel]}>
        <View style={styles.currentLevelBadge}>
          <Text style={styles.currentLevelText}>Current Level</Text>
        </View>
        <Text style={styles.levelTitle}>Level 2</Text>
        <View style={styles.levelRow}>
            <Text style={styles.infoLabel}>Daily Limit:</Text>
            <Text style={styles.infoValue}>₦200,000</Text>
        </View>
        <View style={styles.levelRow}>
            <Text style={styles.infoLabel}>Daily Withdrawal Limit:</Text>
            <Text style={styles.infoValue}>₦1,000,000</Text>
        </View>
        <View style={styles.levelRow}>
            <Text style={styles.infoLabel}>Max Balance:</Text>
            <Text style={styles.infoValue}>Unlimited</Text>
        </View>
      </View>

      {/* Level 3 */}
      <View style={styles.levelCard}>
        <Text style={styles.levelTitle}>Level 3</Text>
        <View style={styles.levelRow}>
            <Text style={styles.infoLabel}>Daily Limit:</Text>
            <Text style={styles.infoValue}>₦1,000,000</Text>
        </View>
        <View style={styles.levelRow}>
            <Text style={styles.infoLabel}>Daily Withdrawal Limit:</Text>
        <Text style={styles.infoValue}>₦5,000,000</Text>
        </View>
        <View style={styles.levelRow}>
            <Text style={styles.infoLabel}>Max Balance:</Text>
        <Text style={styles.infoValue}>Unlimited</Text>
        </View>
      </View>

      {/* Agent Account */}
      <View style={styles.levelCard}>
        <Text style={styles.levelTitle}>Agent Account</Text>
        <View style={styles.levelRow}>
            <Text style={styles.infoLabel}>Daily Limit:</Text>
            <Text style={styles.infoValue}>₦1,000,000</Text>
        </View>
        <View style={styles.levelRow}>
        <Text style={styles.infoLabel}>Daily Withdrawal Limit:</Text>
        <Text style={styles.infoValue}>₦5,000,000</Text>
        </View>
        <View style={styles.levelRow}>
        <Text style={styles.infoLabel}>Max Balance:</Text>
        <Text style={styles.infoValue}>Unlimited</Text>
        </View>
      </View>

      {/* Upgrade Button */}
      <TouchableOpacity style={styles.upgradeButton}>
        <Text style={styles.upgradeButtonText}>Upgrade to Level 3</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AccountLevels;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // centers items horizontally in the header
    marginTop: 40,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 10, // position the back button on the left side
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
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 8
  },
  infoLabel: {
    fontSize: 14,
    color: '#555',
  },
  infoValue: {
    fontSize: 16,
    color: colors.black,
    fontWeight: 'bold',
  },
  levelCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  currentLevel: {
    borderColor: colors.primary,
  },
  currentLevelBadge: {
    position: 'absolute',
    top: -10,
    left: 15,
    backgroundColor: colors.success,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  currentLevelText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  levelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  upgradeButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  upgradeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  levelRow:{
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  }
});
