// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { StatusBar } from 'expo-status-bar';

import Splash from './screens/Splash';
import Onboarding from './screens/Onboarding';
import Signup from './screens/Signup';
import Login from './screens/Login';
import ForgotPassword from './screens/ForgotPassword';
import OtpVerification from './screens/OtpVerification';
import HelpCenter from './screens/HelpCenter';
import BottomTabs from './components/BottomTabs';  // Import BottomTabs
import TransactionDetails from './screens/TransactionDetails';
import Transactions from './screens/Transactions';
import CardDetails from './screens/CardDetails';
import ProfileScreen from './screens/ProfileScreen';
import CardSettings from './screens/CardSettings';
import ManageChannels from './screens/ManageChannels';
import BlockCard from './screens/BlockCard';
import CustomNameScreen from './screens/CustomNameScreen';
import ChangePin from './screens/ChangePin';
import CardDelete from './screens/CardDelete';
import Notifications from './screens/Notifications';
import CardLimit from './screens/CardLimit';
import Airtime from './screens/Airtime';
import PaymentReceipt from './screens/Success';
import Success from './screens/Success';
import Data from './screens/Data';
import Topup from './screens/Topup';
import QuickBankDeposit from './screens/QuickBankDeposit';
import BankTransfer from './screens/BankTransfer';
import TransferDetails from './screens/TransferDetails';
import Summary from './screens/Summary';
import SavingsDetails from './screens/SavingsDetails';
import ProfileDetails from './screens/ProfileDetails';
import AccountVerification from './screens/AccountVerification';
import AccountLevels from './screens/AccountLevels';
import Settings from './screens/Settings';
import Theme from './screens/Theme';
import Chat from './screens/Chat';
import DeviceManagement from './screens/DeviceManagement';
import Electricity from './screens/Electricity';
import BillerDetails from './screens/BillerDetails';
import BillerSuccess from './screens/BillerSucces';
import Betting from './screens/Betting';
import BettingDetails from './screens/BettingDetails';
import BettingSuccess from './screens/BettingSuccess';
import Referral from './screens/Referral';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }}  />
            <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
            <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Forgot" component={ForgotPassword} options={{ headerShown: false }} />
            <Stack.Screen name="Help" component={HelpCenter} options={{ headerShown: false }} />
            <Stack.Screen name="OtpVerify" component={OtpVerification} options={{ headerShown: false }} />
            <Stack.Screen name="TransactionDetails" component={TransactionDetails} options={{ headerShown: false }} />
            <Stack.Screen name="Transactions" component={Transactions} />
            <Stack.Screen name="CardDetails" component={CardDetails} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CardSettings" component={CardSettings} options={{ headerShown: false }}  />
            <Stack.Screen name="Channels" component={ManageChannels} options={{ headerShown: false }}  />
            <Stack.Screen name="Block" component={BlockCard} options={{ headerShown: false }}  />
            <Stack.Screen name="CustomName" component={CustomNameScreen} options={{ headerShown: false }}  />
            <Stack.Screen name="ChangePin" component={ChangePin} options={{ headerShown: false }}  />
            <Stack.Screen name="DeleteCard" component={CardDelete} options={{ headerShown: false }}  />
            <Stack.Screen name="Notifications" component={Notifications} options={{ headerShown: false }}  />
            <Stack.Screen name="CardLimit" component={CardLimit} options={{ headerShown: false }}  />
            <Stack.Screen name="Airtime" component={Airtime} options={{ headerShown: false }}  />
            <Stack.Screen name="Data" component={Data} options={{ headerShown: false }}  />
            <Stack.Screen name="Success" component={Success} options={{ headerShown: false }}  />
            <Stack.Screen name="Topup" component={Topup} options={{ headerShown: false }}  />
            <Stack.Screen name="QuickDeposit" component={QuickBankDeposit} options={{ headerShown: false }}  />
            <Stack.Screen name="Transfer" component={BankTransfer} options={{ headerShown: false }}  />
            <Stack.Screen name="TransferDetails" component={TransferDetails} options={{ headerShown: false }}  />
            <Stack.Screen name="Summary" component={Summary} options={{ headerShown: false }}  />
            <Stack.Screen name="SavingsDetails" component={SavingsDetails} options={{ headerShown: false }}  />
            <Stack.Screen name="ProfileDetails" component={ProfileDetails} options={{ headerShown: false }}  />
            <Stack.Screen name="AccountVerification" component={AccountVerification} options={{ headerShown: false }}  />
            <Stack.Screen name="AccountLevel" component={AccountLevels} options={{ headerShown: false }}  />
            <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }}  />
            <Stack.Screen name="Theme" component={Theme} options={{ headerShown: false }}  />
            <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }}  />
            <Stack.Screen name="DeviceManagement" component={DeviceManagement} options={{ headerShown: false }}  />
            <Stack.Screen name="Electricity" component={Electricity} options={{ headerShown: false }}  />
            <Stack.Screen name="BillerDetails" component={BillerDetails} options={{ headerShown: false }}  />
            <Stack.Screen name="BillerSuccess" component={BillerSuccess} options={{ headerShown: false }}  />
            <Stack.Screen name="BillerCategory" component={BillerSuccess} options={{ headerShown: false }}  />
            <Stack.Screen name="Betting" component={Betting} options={{ headerShown: false }}  />
            <Stack.Screen name="BettingDetails" component={BettingDetails} options={{ headerShown: false }}  />
            <Stack.Screen name="BettingSuccess" component={BettingSuccess} options={{ headerShown: false }}  />
            <Stack.Screen name="Referral" component={Referral} options={{ headerShown: false }}  />
          </Stack.Navigator>
          <StatusBar backgroundColor='#F6F9FF' />
        </NavigationContainer>
      </ApplicationProvider>
    </> 
  );
}

export default App;
