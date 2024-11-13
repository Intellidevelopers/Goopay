import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import colors from '../components/colors';

const Theme = ({ navigation }) => {
  const [selectedTheme, setSelectedTheme] = useState('Light');

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    // Here, add logic to change the app's color mode based on the theme
    // E.g., if using a theme provider or context, call your theme update function
  };

  const renderThemeOption = (theme, description, isSelected) => (
    <TouchableOpacity
      style={[styles.optionContainer, isSelected && styles.selectedOption]}
      onPress={() => handleThemeChange(theme)}
    >
      <View style={styles.optionHeader}>
        <Text style={styles.optionTitle}>{theme}</Text>
        <Ionicons
          name={isSelected ? "radio-button-on" : "radio-button-off"}
          size={20}
          color={isSelected ? "#007AFF" : "#c4c4c4"}
        />
      </View>
      <Text style={styles.optionDescription}>{description}</Text>
      <View style={styles.previewContainer}>
        <Image
          source={
            theme === "Dark"
              ? require('../assets/dark.png') // replace with appropriate image path
              : theme === "Light"
              ? require('../assets/dark.png') // replace with appropriate image path
              : require('../assets/dark.png') // replace with appropriate image path
          }
          style={styles.previewImage}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Themes</Text>
      </View>


      {renderThemeOption('Automatic', 'This will use your system default mode', selectedTheme === 'Automatic')}
      {renderThemeOption('Dark', '', selectedTheme === 'Dark')}
      {renderThemeOption('Light', '', selectedTheme === 'Light')}
    </View>
  );
};

export default Theme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    padding: 20,
  },
  backIcon: {
    marginBottom: 20,
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
  optionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  selectedOption: {
    borderColor: '#007AFF',
    borderWidth: 1,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  optionDescription: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  previewContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  previewImage: {
    width: '100%',
    height: 50,
    resizeMode: 'contain',
  },
});
