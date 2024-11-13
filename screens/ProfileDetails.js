import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from '../components/colors';


const ProfileDetails = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Camera access is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Profile Details</Text>
        </View>

      <View style={styles.content}>
      <TouchableOpacity style={styles.imageContainer} onPress={openCamera}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="camera" size={24} color="white" />
          </View>
        )}
      </TouchableOpacity>

      <Text style={styles.name}>Josiah Adeagbo</Text>
      <View style={styles.levelContainer}>
        <Ionicons name="checkmark-circle" size={20} color="#FFC107" />
        <Text style={styles.levelText}>Level 2</Text>
      </View>
      </View>

      <View style={styles.content}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} value="Josiah Adeagbo" editable={false} />
      </View>
        <Text style={styles.emaillabel}>Email</Text>
        <View style={styles.emailContainer}>
          <TextInput style={styles.input} value="adeagbojosiah1@gmail.com" editable={false} />
          <Ionicons name="checkmark-circle" size={20} color="green" />
        </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value="09063711636" editable={false} />
      </View>
      </View>
    </View>
  );
};

export default ProfileDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    paddingHorizontal: 20,
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
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  placeholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#C4C4C4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  levelContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: colors.warningLabel,
    width: '30%',
    alignSelf: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  levelText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  inputContainer: {
    marginTop: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  input: {
    backgroundColor: colors.label,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginTop: 5,
    color: '#666',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.label,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  content:{
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    paddingVertical: 20,
  },
  emaillabel:{
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
    marginTop: 20
  }
});
