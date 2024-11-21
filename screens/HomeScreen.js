import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, FlatList, RefreshControl, useColorScheme  } from 'react-native';
import colors from '../components/colors';
import { AntDesign, Octicons, Feather, MaterialCommunityIcons } from 'react-native-vector-icons';
import useRefreshStore from '../store/refreshStore';
import useTransactionStore from '../store/transactionStore';
import { BottomSheet, Icon } from '@rneui/themed';


const transactions = [
  { 
    id: '1', 
    name: 'Adeagbo Josiah', 
    amount: '-₦460,000.00', 
    date: '09:35 AM, 29/09/2024', 
    status: 'success', // Transaction status
    type: 'received', // Icon status
    refNumber: '000034567829', 
    transactionId: 'TXN006744901', 
    bank: 'Access bank' 
  },
  { 
    id: '2', 
    name: 'Hosea Mathias', 
    amount: '+₦360,000.00', 
    date: '10:30 PM, 29/09/2024', 
    status: 'failed', // Transaction status
    type: 'sent', // Icon status
    refNumber: '000034567829', 
    transactionId: 'TXN290811002', 
    bank: 'Fidelity bank' 
  },
  { 
    id: '3', 
    name: 'Hosea Mathias', 
    amount: '+₦360,000.00', 
    date: '10:30 PM, 29/09/2024', 
    status: 'pending', // Transaction status
    type: 'received', // Icon status
    refNumber: '000034567829', 
    transactionId: 'TXN290811002', 
    bank: 'Fidelity bank' 
  },
];

const getGreeting = () => {
  const now = new Date();
  const hour = now.getUTCHours() + 1; // Nigeria is UTC+1

  if (hour >= 5 && hour < 12) {
    return "Good morning!";
  } else if (hour >= 12 && hour < 17) {
    return "Good afternoon!";
  } else {
    return "Good evening!";
  }
};

// Function to get the icon based on the type (icon status)
const getIcon = (type) => {
  switch (type) {
    case 'received':
      return <Feather name="arrow-down-left" size={24} color="#2ecc71" />;
    case 'sent':
      return <Feather name="arrow-up-right" size={24} color="red" />;
    case 'failed':
      return <Feather name="x-circle" size={24} color="red" />;
    case 'pending':
      return <Feather name="clock" size={24} color="orange" />;
    default:
      return null;
  }
};

// Function to get the color based on the transaction status
const getStatusColor = (status) => {
  switch (status) {
    case 'success':
      return '#2ecc71';
    case 'failed':
      return 'red';
    case 'pending':
      return 'orange';
    default:
      return 'black';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'success':
      return <Feather name="arrow-down-left" size={24} color="#2ecc71" />;
    case 'fa':
      return <Feather name="arrow-up-right" size={24} color="red" />;
    case 'failed':
      return <Feather name="x-circle" size={24} color="red" />;
    default:
      return null;
  }
};

const HomeScreen = ({ navigation }) => {
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  const refresh = useRefreshStore((state) => state.refresh);
  const [refreshing, setRefreshing] = useState(false);
  const { setSelectedTransaction } = useTransactionStore();
  const [greeting, setGreeting] = useState(getGreeting());
  const [isSummaryVisible, setIsSummaryVisible] = useState(false); // New state for summary sheet
  const [isAirtime2CashVisible, setIsAirtime2CashVisible] = useState(false); // New state for summary sheet
  


  // Function to handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000); // Add your refresh logic here
  }, []);

  const handleTransactionPress = (transaction) => {
    setSelectedTransaction(transaction);
    navigation.navigate('TransactionDetails');
  };

  const onConfirm = () => {
    setIsSummaryVisible(true); // Show summary sheet
  };
  const onAirtime2Cash = () => {
    setIsAirtime2CashVisible(true); // Show onAirtime2Cash summary sheet
  };



  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
          style={styles.refresh}
        />
      }
    >
      {/* Header with Balance */}
      <View style={styles.header}>
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.appName}>Hi, Adeagbo</Text>
            <Text style={styles.balanceLabel}>{greeting}</Text>
          </View>
          <View style={styles.notification}>
            <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
              <MaterialCommunityIcons name="bell-badge" size={26} style={styles.bell} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Image source={require('../assets/user.png')} style={styles.userImage} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceAmount}>{isBalanceHidden ? '******' : '₦1,450,920.00'}</Text>
          <TouchableOpacity onPress={() => setIsBalanceHidden(!isBalanceHidden)}>
            <AntDesign name={isBalanceHidden ? 'eye' : 'eyeo'} size={26} style={styles.hideIcon} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Topup')}>
          <AntDesign name="pluscircleo" size={24} color="#fff" />
          <Text style={styles.actionText}>Top Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Transfer')}>
          <Octicons name="paper-airplane" size={24} color="#fff" />
          <Text style={styles.actionText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Withdraw')}>
          <Feather name="arrow-down-circle" size={24} color="#fff" />
          <Text style={styles.actionText}>Withdraw</Text>
        </TouchableOpacity>
      </View>

      {/* Service Icons */}
      <View style={styles.servicesContainer}>
        {[
          { name: "Internet", icon: "cellphone-nfc", screen: "Data" },
          { name: "Water", icon: "water", screen: "Water" },
          { name: "Electricity", icon: "flash", screen: "Electricity" },
          { name: "TV Cable", icon: "television", screen: "TVCable" },
          { name: "Airtime", icon: "phone", screen: "Airtime" },
          { name: "Airtime 2 Cash", icon: "phone-sync", onPress: onAirtime2Cash },
          { name: "Loans", icon: "piggy-bank", screen: "Loans" },
          { name: "More", icon: "dots-horizontal", onPress: onConfirm }
        ].map((service, index) => (
          <TouchableOpacity
          key={index}
          style={styles.serviceItem}
          onPress={() => service.onPress ? service.onPress() : navigation.navigate(service.screen)}
       >
       
            <MaterialCommunityIcons name={service.icon} size={24} style={styles.icon} />
            <Text style={styles.serviceText}>{service.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Promotional Banner */}
      <View style={styles.promoBanner}>
        <Text style={styles.promoText}>50% OFF</Text>
        <Text style={styles.promoSubText}>Summer special deal</Text>
        <Text style={styles.promoDesc}>Get discount for every transaction</Text>
      </View>

      {/* Recent Transactions */}
      <View style={styles.transactionsContainer}>
        <Text style={styles.transactionsTitle}>Recent Transactions</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Transactions')}><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
      </View>
      
      <FlatList
        data={transactions}
        style={styles.flatlist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.transactionItem} 
            onPress={() => handleTransactionPress(item)}
          >
            {/* Icon based on transaction type */}
            {getIcon(item.type)}
            
            {/* Transaction details */}
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionName}>{item.name}</Text>
              <Text style={styles.transactionDate}>{item.date}</Text>
            </View>

            {/* Amount and status */}
            <View style={styles.amountContainer}>
              <Text style={styles.transactionAmount}>{item.amount}</Text>
              <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
                {item.status}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <BottomSheet isVisible={isSummaryVisible}>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.summaryTitle}>Pay Bills</Text>
            <TouchableOpacity onPress={() => setIsSummaryVisible(false)}>
              <AntDesign name='close' size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.subText}>Details for More options go here...</Text>

          <TouchableOpacity style={styles.billContainer}
            onPress={() => {
              setIsSummaryVisible(false); // Close the BottomSheet
              navigation.navigate('Betting');
            }}
          >
            <View style={styles.iconContainer}>
              <Feather name='tv' size={20}/>
            </View>
            <View style={styles.textAlignContainer}>
              <Text style={styles.billName}>Betting</Text>
              <Text style={styles.description}>Pay for cable subscrptions</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.billContainer}
            onPress={() => {
              setIsSummaryVisible(false); // Close the BottomSheet
              navigation.navigate('Booster');
            }}
          >
            <View style={styles.iconContainer}>
              <Feather name='tv' size={20}/>
            </View>
            <View style={styles.textAlignContainer}>
              <Text style={styles.billName}>Social Booster</Text>
              <Text style={styles.description}>Buy your social media followers</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.billContainer}
            onPress={() => {
              setIsSummaryVisible(false); // Close the BottomSheet
              navigation.navigate('Referral');
            }}
          >
            <View style={styles.iconContainer}>
              <Feather name='tv' size={20}/>
            </View>
            <View style={styles.textAlignContainer}>
              <Text style={styles.billName}>Referral</Text>
              <Text style={styles.description}>Refer to friends to earn more on Goopay</Text>
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheet>

      <BottomSheet isVisible={isAirtime2CashVisible}>
        <View style={styles.bottomSheetContainer}>
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.summaryTitle}>Airtime to Cash</Text>
            <TouchableOpacity onPress={() => setIsAirtime2CashVisible(false)}>
              <AntDesign name='close' size={20} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.subText}>Choose your preffered method</Text>

          <TouchableOpacity style={styles.billContainer}
            onPress={() => {
              setIsAirtime2CashVisible(false); // Close the BottomSheet
              navigation.navigate('Betting');
            }}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name='lightning-bolt-outline' size={24}/>
            </View>
            <View style={styles.textAlignContainer}>
              <View style={styles.recommendationContainer}>
                <Text style={styles.billName}>Instant</Text>
                <View style={styles.labelContainer}>
                  <Text style={styles.recom}>Recommended</Text>
                </View>
              </View>
              <Text style={styles.description}>Convert your airtime in seconds</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.billContainer}
            onPress={() => {
              setIsSummaryVisible(false); // Close the BottomSheet
              navigation.navigate('Booster');
            }}
          >
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name='alarm-check' size={24}/>
            </View>
            <View style={styles.textAlignContainer}>
              <Text style={styles.billName}>Manual</Text>
              <Text style={styles.description}>Convert airtime to cash in 10 minutes</Text>
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    paddingHorizontal: 15,
  },
  header: {
    marginTop: 50,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  balanceLabel: {
    fontSize: 16,
    color: '#777',
    marginTop: 5,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: '900',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: colors.background,
    borderRadius: 10,
    marginBottom: 30,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 12,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  serviceItem: {
    alignItems: 'center',
    marginBottom: 20,
    width: '25%',
    justifyContent: 'center',
  },
  promoBanner: {
    backgroundColor: '#001C53',
    padding: 15,
    marginVertical: 20,
    borderRadius: 8,
  },
  promoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff69b4',
  },
  promoSubText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: colors.white,
  },
  promoDesc: {
    fontSize: 14,
    marginTop: 5,
    color: colors.white,
  },
  transactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    color: colors.primary,
    fontWeight: '700',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  transactionDetails: {
    flex: 1,
    marginLeft: 10,
  },
  transactionName: {
    fontSize: 14,
    fontWeight: '700',
  },
  transactionDate: {
    fontSize: 12,
    color: '#777',
  },
  transactionAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    backgroundColor: '#ddd',
    borderWidth: 2,
    borderColor: colors.white
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  icon: {
    color: colors.primary,
  },
  serviceText: {
    fontSize: 12,
    color: '#555',
  },
  status:{
    textAlign: 'right'
  },
  bell:{
    color: colors.deepDeem
  },
  notification:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  hideIcon:{
    color: colors.deepDeem,
  },
  balanceContainer:{
    flexDirection: 'row',
    justifyContent:'space-between',
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 15,
  },
  flatlist:{
    marginBottom: 80
  },
  refresh: {
    marginTop: 50
  },
  bottomSheetSubviews:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedNetworkText:{
    color: colors.white,
  },
  bottomSheetContainer: {
    padding: 20,
    backgroundColor: colors.greyBackground,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 40,
    paddingBottom: 30,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  sheetMessage: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    gap: 10
  },
  billContainer:{
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 10,
    gap: 10,
    borderRadius: 10,
    marginBottom: 20
  },
  iconContainer:{
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.greyBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  billName:{
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  description:{
    fontSize: 12,
    color: '#777',
  },
  bottomSheetHeader:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  summaryTitle:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subText:{
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  labelContainer:{
    justifyContent:'space-between',
    backgroundColor: colors.successLabel,
    padding: 3,
    alignItems: 'center',
    width: '55%',
    borderRadius: 5
  },
  recommendationContainer:{
    flexDirection: 'row',
    gap: 10
  },
  recom:{
    color: colors.success
  }
});
