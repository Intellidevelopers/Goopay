import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../components/colors';

const notifications = [
  { id: '1', title: 'Your transfer was successful', description: 'Your transfer of NGN1,010.00 to JOSIAH ADEAGBO was successful.' },
  { id: '2', title: 'Your transfer was successful', description: 'Your transfer of NGN2,010.00 to MARY ABIODUN ADEAGBO was successful.' },
  { id: '3', title: 'Your transfer was successful', description: 'Your transfer of NGN1,010.00 to JOSIAH ADEAGBO was successful.' },
  { id: '4', title: 'Credit Alert', description: 'You have just received NGN3,000.00 from CHIJIOKE MGBOJIKWE UCHE' },
  { id: '5', title: 'Your transfer was successful', description: 'Your transfer of NGN1,010.00 to JOSIAH ADEAGBO was successful.' },
  { id: '6', title: 'Your transfer was successful', description: 'Your transfer of NGN2,910.00 to JOSIAH ADEAGBO was successful.' },
  { id: '7', title: 'Your transfer was successful', description: 'Your transfer of NGN2,910.00 to JOSIAH ADEAGBO was successful.' },
  { id: '8', title: 'Your transfer was successful', description: 'Your transfer of NGN2,910.00 to JOSIAH ADEAGBO was successful.' },
  { id: '9', title: 'Your transfer was successful', description: 'Your transfer of NGN2,910.00 to JOSIAH ADEAGBO was successful.' },
  { id: '10', title: 'Your transfer was successful', description: 'Your transfer of NGN2,910.00 to JOSIAH ADEAGBO was successful.' },
  { id: '11', title: 'Your transfer was successful', description: 'Your transfer of NGN2,910.00 to JOSIAH ADEAGBO was successful.' },
  { id: '12', title: 'Your transfer was successful', description: 'Your transfer of NGN2,910.00 to JOSIAH ADEAGBO was successful.' },
];

const Notifications = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.notificationContainer}>
      <View style={styles.iconContainer}>
        <Image source={require('../assets/icons/icon.png')} style={styles.icon}/>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Notifications</Text>
        </View>

        <TouchableOpacity style={styles.clearBtn}>
          <Text style={styles.clearText}>Clear</Text>
          <AntDesign name="close" size={16} style={styles.backIcon} />
        </TouchableOpacity>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    padding: 20
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
  clearText: {
    color: colors.primary,
    fontSize: 16,
  },
  listContainer: {
    paddingTop: 10,
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2979FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconText: { 
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    fontSize: 13,
    color: '#555',
  },
  clearBtn:{
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 20,
    gap: 5
  },
  icon:{
    width: 40,
    height: 40,
    resizeMode: 'contain'
  }
});
