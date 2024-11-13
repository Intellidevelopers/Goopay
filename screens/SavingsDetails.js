import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import colors from '../components/colors';

const SavingsDetails = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Feather name="arrow-left" size={24} color="black" />
        <Text style={styles.headerTitle}>Savings Details</Text>
        <Feather name="more-vertical" size={24} color="black" />
      </View>

      {/* Plan Details */}
      <View style={styles.planCard}>
        <View style={styles.planInfo}>
          <Text style={styles.planTitle}>ade</Text>
          <View style={styles.label}>
              <Text style={styles.planType}>Flexible Savings</Text>
            </View>
          <Text style={styles.planAmount}>₦500.00</Text>
        </View>
        <Image source={require('../assets/piggy.png')} style={styles.planIcon} />
      </View>

      {/* Interest and Next Contribution */}
      <View style={styles.content}>
        <View style={styles.interestContainer}>
            <View style={styles.interestItem}>
            <Text style={styles.interestAmount}>₦0.00</Text>
            <Text style={styles.interestLabel}>Total Interest Accrued</Text>
            </View>
            <View style={styles.interestItem}>
            <Text style={styles.interestAmount}>₦0.00</Text>
            <Text style={styles.interestLabel}>Withdrawable Interest</Text>
            </View>
        </View>

        <View style={styles.nextContainer}>
            <Text style={styles.nextContributionLabel}>Next Contribution:</Text>
            <Text style={styles.nextContributionDate}>4th November, 2024</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.iconContainer}>
          <Feather name="plus-circle" size={18} color="#387CFF" />
          </View>
          <Text style={styles.actionText}>Top Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.iconContainer}>
          <Feather name="arrow-up-circle" size={18} color="#387CFF" />
          </View>
          <Text style={styles.actionText}>Withdraw</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.iconContainer}>
          <Feather name="settings" size={18} color="#387CFF" />
          </View>
          <Text style={styles.actionText}>Manage</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Transactions */}
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <View style={styles.transactionCard}>
        <View style={styles.iconContainer2}>
        <MaterialIcons name="arrow-downward" size={24} color={colors.success} />
        </View>
        <View style={styles.transactionInfo}>
          <Text style={styles.transactionAmount}>+₦500.00</Text>
          <Text style={styles.transactionDescription}>Top-up | Today</Text>
        </View>
        <Text style={styles.transactionTime}>12:28am</Text>
      </View>
    </View>
  );
};

export default SavingsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
    marginTop: 30
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  planCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  planInfo: {
    flex: 1,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  planType: {
    fontSize: 14,
    color: '#00A6FF',
  },
  planAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  planIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  interestContainer: {
    backgroundColor: '#E6F4FF',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
  },
  interestItem: {
    alignItems: 'center',
    flex: 1,
  },
  interestAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.success,
  },
  interestLabel: {
    fontSize: 12,
    color: '#555',
  },
  nextContributionLabel: {
    fontSize: 14,
    color: '#777',
  },
  nextContributionDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 15
  },
  actionText: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
    fontWeight: '500'
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  transactionCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  transactionInfo: {
    flex: 1,
    paddingHorizontal: 10,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.success,
  },
  transactionDescription: {
    fontSize: 12,
    color: '#777',
  },
  transactionTime: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500'
  },
  label:{
    backgroundColor: colors.label,
    alignItems: 'center',
    padding: 2,
    borderRadius: 5,
    width: '48%'
  },
  nextContainer:{
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent:'space-between',
    marginTop: 20
  },
  content:{
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    marginBottom: 15
  },
  iconContainer:{
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: colors.label,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10
  },
  iconContainer2:{
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: colors.label,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 10
  }
});
