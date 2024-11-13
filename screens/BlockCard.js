import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { BottomSheet } from '@rneui/themed';
import colors from '../components/colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const BlockCard = ({ navigation }) => {
  const [selectedReason, setSelectedReason] = useState('Select Reason');
  const [selectedId, setSelectedId] = useState(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [isSuccessSheetVisible, setSuccessSheetVisible] = useState(false); // New state for success sheet

  const reasons = [
    { id: '1', label: 'Lost Card' },
    { id: '2', label: 'Stolen Card' },
    { id: '3', label: 'Suspicious Activity' },
    { id: '4', label: 'Other' },
  ];

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const handleSelectReason = (reason) => {
    setSelectedReason(reason.label);
    setSelectedId(reason.id);
    closeBottomSheet();
  };

  const handleContinue = () => {
      setSuccessSheetVisible(true);
  };

  const closeSuccessSheet = () => {
    setSuccessSheetVisible(false);
    navigation.navigate('CardDetails');
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Block Card</Text>
        </View>
      <Text style={styles.label}>Reason for blocking this card</Text>

      <View style={styles.dropdownContainer}>
        <TouchableOpacity style={styles.dropdown} onPress={openBottomSheet}>
          <Text style={styles.dropdownText}>{selectedReason}</Text>
          <Ionicons name="chevron-down-outline" size={20} color="#A0A0A0" />
        </TouchableOpacity>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.blockButton,
            { backgroundColor: selectedId ? colors.primary : '#E0E0E0' },
          ]}
          disabled={!selectedId}
          onPress={handleContinue}
        >
          <Text
            style={[
              styles.blockButtonText,
              { color: selectedId ? '#fff' : '#A0A0A0' },
            ]}
          >
            Block this Card
          </Text>
        </TouchableOpacity>
      </View>


      {/* Block card reasons bottom sheet */}
      <BottomSheet
        isVisible={isBottomSheetVisible}
        onBackdropPress={closeBottomSheet}
      >
        <View style={styles.bottomSheetContent}>
          <AntDesign name="questioncircle" size={45} style={styles.infoIcon} />
          <Text style={styles.bottomSheetTitle}>Reasons</Text>

          {reasons.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.optionButton}
              onPress={() => handleSelectReason(item)}
            >
              <Text style={styles.optionText}>{item.label}</Text>
              {selectedId === item.id ? (
                <Ionicons name="radio-button-on" size={20} color={colors.primary} />
              ) : (
                <Ionicons name="radio-button-off" size={20} color="#A0A0A0" />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </BottomSheet>

      {/* Block card warning bottom sheet */}
      <BottomSheet
        isVisible={isSuccessSheetVisible}
        onBackdropPress={closeSuccessSheet}
      >
        <View style={styles.successSheetContent}>
          <AntDesign name="exclamationcircleo" size={45} color={colors.error} />
          <Text style={styles.successTitle}>Warning!</Text>
          <Text style={styles.subText}>Are you sure you want to block this card?</Text>
          <TouchableOpacity style={styles.closeButton} onPress={closeSuccessSheet}>
            <Text style={styles.closeButtonText}>Block Card</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default BlockCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    paddingHorizontal: 20,
    paddingTop: 20,
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
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: colors.white,
    borderRadius: 15,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.input,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  dropdownText: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    marginBottom: 20,
  },
  blockButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  blockButtonText: {
    fontWeight: '500',
    fontSize: 16,
  },
  bottomSheetContent: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
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
    marginTop: 20,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  optionText: {
    fontSize: 14,
    marginLeft: 10,
    color: colors.black,
    fontWeight: '600',
  },
  successSheetContent: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingBottom: 30,
  },
  successTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 15,
    backgroundColor: colors.warningLabel,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: colors.error,
    fontWeight: 'bold',
  },
  subText:{
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    fontWeight: '500',
    textAlign: 'center',
  }
});
