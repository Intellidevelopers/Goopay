import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Linking, ScrollView } from 'react-native';
import { Ionicons, FontAwesome, AntDesign, Entypo } from '@expo/vector-icons'; // Use react-native-vector-icons or @expo/vector-icons for icons
import colors from '../components/colors';

const HelpCenter = ({ navigation }) => {
  const handleCall = () => {
    Linking.openURL('tel:+2342018889990');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@jigipay.com');
  };

  const handleSupportPortal = () => {
    Linking.openURL('https://jigipay.com/support'); // Replace with actual URL if different
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Help Center</Text>
      </View>

      {/* Chat Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Chat</Text>
        <View style={styles.card}>
          <Text style={styles.responseTime}>Avg. Response time: 1 min</Text>
          <View style={styles.item}>
            <Ionicons name="chatbubbles" size={24} color="#0057FF" />
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>Live Web Chat</Text>
              <Text style={styles.itemSubtitle}>Start a conversation on live chat</Text>
            </View>
          </View>
          <View style={styles.item}>
            <FontAwesome name="whatsapp" size={24} color="#25D366" />
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>Whatsapp</Text>
              <Text style={styles.itemSubtitle}>Start a conversation on Whatsapp</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Call Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Call</Text>
        <View style={styles.card}>
          <Text style={styles.responseTime}>Avg. Response time: 2 min</Text>
          <View style={styles.callRow}>
            <Text style={styles.phoneNumber}>+234 201 888 9990</Text>
            <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
              <FontAwesome name="phone" style={styles.icon} size={20} />
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Email Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Email</Text>
        <View style={styles.card}>
          <Text style={styles.responseTime}>Avg. Response time: 12 hrs</Text>
          <View style={styles.callRow}>
            <Text style={styles.emailText}>support@jigipay.com</Text>
            <TouchableOpacity style={styles.actionButton} onPress={handleEmail}>
              <Ionicons name="mail" style={styles.icon} size={20} />
              <Text style={styles.actionText}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.card}>
          <View style={styles.item}>
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle}>Jigipay Support Portal</Text>
              <Text style={styles.itemSubtitle2}>Read articles & FAQs on how to use jigipay.</Text>
              <TouchableOpacity style={styles.readMore} onPress={handleSupportPortal}>
                <Text style={styles.linkText}>Read Now</Text>
                <AntDesign name="right" style={styles.icon} size={14} />
              </TouchableOpacity>
            </View>
            <Image source={require('../assets/cuate.png')} style={styles.supportImage} />
          </View>
        </View>
      </View>

      {/* Social Media Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Social Media</Text>
        {/* Add social media links here */}
        <View style={styles.card}>
          <View style={styles.item}>
            <View style={styles.textContainer}>
              <Text style={styles.itemTitle2}>Reach out to Jigipay's Support on any of our social media page.</Text>
             
              <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton} onPress={handleSupportPortal}>
                <AntDesign name="twitter" style={styles.icon} size={16} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton} onPress={handleSupportPortal}>
                <Entypo name="instagram-with-circle" style={styles.icon} size={16} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.socialButton} onPress={handleSupportPortal}>
                <AntDesign name="facebook-square" style={styles.icon} size={16} />
              </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
  },
  contentContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.deem,
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
  },
  responseTime: {
    fontSize: 12,
    color: '#7D8A9C',
    marginBottom: 12,
    backgroundColor: colors.input,
    padding: 3,
    width: 160,
    textAlign: 'center',
    borderRadius: 5,
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  textContainer: {
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
  },
  itemTitle2: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.deem,
    textAlign: 'center',
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#7D8A9C',
    width: '100%',
    fontWeight: '500'
  },
  itemSubtitle2: {
    fontSize: 12,
    color: '#7D8A9C',
    width: '90%',
    fontWeight: '500'
  },
  callRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  phoneNumber: {
    fontSize: 14,
    color: '#333',
    fontWeight: '700'

  },
  actionButton: {
    backgroundColor: '#EAF0FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    flexDirection: 'row',
    gap: 5
  },
  actionText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  emailText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '700'
  },
  linkText: {
    fontSize: 14,
    color: colors.primary,
    marginTop: -2,
    fontWeight: '500'
  },
  supportImage: {
    width: 60,
    height: 60,
    marginLeft: -10,
    resizeMode: 'contain',
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
  readMore:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%', // Ensures icons take up full width of the container
  },
  socialButton: {
    padding: 15, // Adds padding around each icon for consistent sizing
    borderRadius: 30,
    backgroundColor: colors.input,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default HelpCenter;
