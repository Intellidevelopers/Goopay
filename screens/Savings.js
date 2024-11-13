import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import colors from '../components/colors';
import { BottomSheet } from '@rneui/themed';


const Savings = ({ navigation }) => {
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>savings</Text>
        <Feather name="more-vertical" size={24} color="black" />
      </View>

      {/* Total Savings */}
      <View style={styles.totalSavingsCard}>
        <View>
          <Text style={styles.totalSavingsText}>Total Savings</Text>
          <Text style={styles.totalAmount}>₦0.00</Text>
        </View>
        <Feather name="target" size={40} color="#387CFF" style={styles.targetIcon} />
      </View>

      {/* My Plans */}
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
      <Text style={styles.sectionTitle}>My Plans</Text>
      <View style={styles.myPlansCardCount}>
        <Text style={styles.count}>1</Text>
      </View>
      </View>
      <TouchableOpacity style={styles.planCard} onPress={() => navigation.navigate('SavingsDetails')}>
        <View style={styles.planDetails}>
         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Image source={require('../assets/piggy.png')} style={styles.planIcon} />

            <View>
           <Text style={styles.planTitle}>ade</Text>
            <View style={styles.label}>
              <Text style={styles.planType}>Flexible Savings</Text>
            </View>
           </View>
          </View>
          <Feather name="chevron-right" size={24} color="#387CFF" />
         </View>

          <View style={{ borderBottomWidth: 1, borderBottomColor: '#ddd', paddingBottom: 5, marginBottom: 10 }}>
            <Text style={styles.savedAmount}>₦0.00</Text>
            <Text style={styles.savedLabel}>saved so far</Text>
          </View>
          <View style={styles.nextContribution}>
            <Text style={styles.contributionLabel}>Next Contribution</Text>
            <Text style={styles.contributionTime}>1 Day</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Add New Savings */}
      <TouchableOpacity style={styles.addSavingsButton} onPress={openBottomSheet}>
        <Feather name="plus-circle" size={24} color="#387CFF" />
        <Text style={styles.addSavingsText}>Add New Savings</Text>
      </TouchableOpacity>

      <BottomSheet
        isVisible={isBottomSheetVisible}
        onBackdropPress={closeBottomSheet}
      >
        <View style={styles.bottomSheetContent}>
        <Image source={require('../assets/piggy.png')} style={styles.iconTarget}/>
          <Text style={styles.bottomSheetTitle}>Select Saving Plan</Text>
          
          <TouchableOpacity style={styles.optionButton}>
          <Image source={require('../assets/money.png')} style={styles.image}/>
           <View style={styles.textContainer}>
            <Text style={styles.optionText}>Flexible Savings</Text>
            <Text style={styles.subText}>Flexible Savings is designed to help you set asides funds for emmergencies...</Text>
           </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <Image source={require('../assets/pig.png')} style={styles.image}/>
            <View style={styles.textContainer}>
              <Text style={styles.optionText}>Locked Savings</Text>
              <Text style={styles.subText}>Locked Savings is desciplined savings plan that encourages the development...</Text>
           </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton}>
            <Image source={require('../assets/banknote.png')} style={styles.image}/>
            <View style={styles.textContainer}>
              <Text style={styles.optionText}>Fixed Savings</Text>
              <Text style={styles.subText}>Fixed Savings is an effective way to manage liquidity. By committing a lump sum for a...</Text>
           </View>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
};

export default Savings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    marginTop: 20
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textTransform: 'lowercase',
  },
  totalSavingsCard: {
    backgroundColor: '#E6F4FF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  totalSavingsText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  targetIcon: {
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  planCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  planIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  planDetails: {
    flex: 1,
    paddingHorizontal: 10,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  planType: {
    fontSize: 12,
    color: '#00A6FF',
    fontWeight: '500',
  },
  savedAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  savedLabel: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  nextContribution: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contributionLabel: {
    fontSize: 13,
    color: '#777',
    fontWeight: '500'
  },
  contributionTime: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
  },
  addSavingsButton: {
    backgroundColor: '#E6F4FF',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addSavingsText: {
    fontSize: 16,
    color: '#387CFF',
    fontWeight: '500',
    marginLeft: 10,
  },
  label:{
    backgroundColor: colors.label,
    alignItems: 'center',
    padding: 2,
    borderRadius: 5
  },
  myPlansCardCount:{
    backgroundColor: colors.error,
    width: 15,
    height: 18,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count:{
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold'
  },
  bottomSheetContent: { 
    padding: 20, 
    backgroundColor: colors.greyBackground,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  infoIcon: { 
    marginBottom: 10,
    color: colors.primary,
    marginBottom: 20,
    marginTop: 20
  },
  bottomSheetTitle: { 
    fontSize: 20, 
    fontWeight: '900', 
    marginBottom: 20,
    alignSelf: 'center'
  },
  image:{
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 10
  },
  optionButton:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    backgroundColor: colors.white,
    marginBottom: 10,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 15
  },
  optionText:{
    fontSize: 16,
    color: '#333',
    fontWeight: '700'
  },
  iconTarget:{
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginBottom: 10
  },
  textContainer:{
    marginLeft: 10
  },
  subText:{
    fontSize: 12,
    color: '#7D8A9C',
    width: '60%',
    fontWeight: '500'
  }
});
