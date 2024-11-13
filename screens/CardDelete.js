import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from 'react-native-vector-icons';
import colors from '../components/colors';

const CardDelete = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.warningIconContainer}>
        <AntDesign name='exclamationcircle' color={colors.error} size={70} />
      </View>
      <Text style={styles.warningText}>Warning</Text>
      <Text style={styles.noticeText}>
        <Text style={styles.boldText}>Please Note:</Text> By deleting this card, you will not be able to perform transactions with this card anymore because this action cannot be reversed.
      </Text>
      <Text style={styles.noticeText}>
        If you are not sure yet, temporarily block the card instead.
      </Text>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
          <MaterialCommunityIcons
            name={isChecked ? 'checkbox-marked' : 'checkbox-outline'}
            size={24}
            color={isChecked ? colors.primary : colors.deem}
            style={styles.checkboxicon}
          />
        </TouchableOpacity>
        <Text style={styles.checkboxText}>I understand that deleted cards cannot be recovered</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.blockButton]}>
          <Text style={styles.blockButtonText}>Block Card Instead</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          disabled={!isChecked}
        >
          <Text style={styles.deleteButtonText}>Delete Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardDelete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.greyBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  warningIconContainer: {
    marginBottom: 20,
    marginTop: 150,
  },
  warningText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  noticeText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: '70%',

  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 'auto',
    gap: 10,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  blockButton: {
    backgroundColor: colors.label,
  },
  blockButtonText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  deleteButton: {
    backgroundColor: '#D32F2F',
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  checkboxicon:{
    borderRadius: 10
  }
});
