import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Clipboard, Alert, ScrollView, Image, Share } from 'react-native';
import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'; // Ensure this is installed
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../components/colors';

const Referral = ({ navigation }) => {
  const referralCode = 'GGHA290';
  const referralLink = 'https://join.moniepoint.com?adj_t=15ha060e&rC=GGHA290';

  const copyToClipboard = (text) => {
    Clipboard.setString(text);
    Alert.alert('Copied to Clipboard', 'Referral code has been copied successfully.');
  };

     // Function to share the referral link
     const shareReferralLink = async () => {
        try {
          const result = await Share.share({
            message: 'Join Goopay and start sending money seamlessly with ease! Use my referral link to sign up: https://join.goopay.com.ng?adj_t=5ha060e&rC=GGHA290',
            title: 'Goopay Referral'
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // Activity type on iOS
            } else {
              // Shared successfully
            }
          } else if (result.action === Share.dismissedAction) {
            // Dismissed
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error sharing referral link:', error.message);
          } else {
            console.error('An unknown error occurred');
          }
        }
      };

  return (
    <View style={styles.container}>
       <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Referral</Text>
        </View>
     <ScrollView showsVerticalScrollIndicator={false}>
     <View style={styles.card}>
        <Image source={require('../assets/phone.png')} style={styles.imagePlaceholder}/>
        <Text style={styles.title}>Refer Customers & Earn</Text>
        <Text style={styles.subtitle}>
          Invite your friends, family and customers to bank with Moniepoint and make money when they make payments!
          T&Cs apply
        </Text>
        <Text style={styles.referralLabel}>Your referral code:</Text>
        <View style={styles.referralCodeContainer}>
          <Text style={styles.referralCode}>{referralCode}</Text>
          <TouchableOpacity onPress={() => copyToClipboard(referralCode)}>
            <Ionicons name="copy" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.referralOverallContainer}>
        <View style={styles.linkContainer}>
            <Text style={styles.referralLinkText}>Referral Link</Text>
          <Text style={styles.referralLink}>{referralLink}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={shareReferralLink}>
          <Text style={styles.buttonText}>Invite A Customer</Text>
          <Entypo name='share' color={colors.white} size={16}/>
        </TouchableOpacity>
        </View>
      </View>
      <View style={styles.campaignContainer}>
        <Text style={styles.campaignTitle}>Referral Campaign</Text>
        <View style={styles.campaignCard}>
          <TouchableOpacity style={styles.campaignHeader}>
            <Text style={styles.campaignSubtitle}>Personal Banking Referrals</Text>
            <AntDesign name='right' size={16} color={colors.primary}/>
          </TouchableOpacity>
          <View style={styles.campaignEarningsContainer}>
            <Text style={styles.earningsLabel}>Earnings</Text>
            <Text style={styles.earnings}>₦0.00</Text>
          </View>
          <View style={styles.campaignExpiryContainer}>
            <Text style={styles.earningsLabel}>Campaign expires in</Text>
            <Text style={styles.label}>13 months</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.viewCampaignTextButton}>
            <Text style={styles.viewCampaignText}>View Past Campaign</Text>
        </TouchableOpacity>
      </View>
     </ScrollView>
    </View>
  );
};

export default Referral;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.greyBackground,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imagePlaceholder: {
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 16,
    resizeMode: 'cover',
    width: '100%',
    height: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '500'
  },
  referralLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
    color: '#999',

  },
  referralCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    alignSelf: 'center'
  },
  referralCode: {
    fontSize: 28,
    fontWeight: '900',
    marginRight: 8,
  },
  linkContainer: {
    backgroundColor: colors.greyBackground,
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  referralLink: {
    fontSize: 12,
    color: '#000',
  },
  referralLinkText:{
    color: '#888',
    fontWeight: '500',
  },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  campaignContainer: {
    marginTop: 16,
  },
  campaignTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#888',
  },
  campaignCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    paddingHorizontal: 10,
    marginBottom: 20

  },
  campaignSubtitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  earnings: {
    fontSize: 14,
    marginBottom: 4,
  },
  expiry: {
    fontSize: 12,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // centers items horizontally in the header
    marginTop: 30,
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
  referralOverallContainer:{
    borderWidth: 1,
    padding: 10,
    borderStyle: 'dashed',
    borderRadius: 10,
    borderColor: '#aaa'
  },
  campaignHeader:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  campaignEarningsContainer:{
    backgroundColor: colors.input,
    padding: 8,
    borderRadius: 10,
    marginBottom: 15
  },
  earningsLabel:{
    fontSize: 13,
    fontWeight: '500',
    color: '#888',
  },
  earnings:{
    fontSize: 18,
    fontWeight: '900',
    color: '#1A1A1A',
  },
  campaignExpiryContainer:{
    padding: 5,
    borderRadius: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    paddingVertical: 10,
  },
  label:{
    color: '#000',
    fontWeight: '700'
  },
  viewCampaignTextButton:{
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewCampaignText:{
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary
  }
});
