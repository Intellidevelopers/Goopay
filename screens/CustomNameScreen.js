import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { BottomSheet } from '@rneui/themed';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';
import useNameStore from '../store/CustomNameStore'; // Import Zustand store
import colors from '../components/colors';

const CustomNameScreen = ({ navigation }) => {
    const [isSuccessSheetVisible, setSuccessSheetVisible] = useState(false);
    const { name, setName } = useNameStore(); // Access name and setName from store

    const handleContinue = () => {
        if (name) {
            setSuccessSheetVisible(true);
        }
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
                <Text style={styles.headerText}>Custom Name</Text>
            </View>
            <Text style={styles.label}>Card Name</Text>
            <Text style={styles.subText}>Please add a name that describes the purpose of the card</Text>

            <View style={styles.dropdownContainer}>
                <TextInput
                    style={styles.dropdown}
                    placeholder='Card Name'
                    value={name}
                    onChangeText={setName} // Use setName from Zustand store
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.blockButton,
                        { backgroundColor: name ? colors.primary : '#E0E0E0' },
                    ]}
                    disabled={!name}
                    onPress={handleContinue}
                >
                    <Text
                        style={[
                            styles.blockButtonText,
                            { color: name ? '#fff' : '#A0A0A0' },
                        ]}
                    >
                        Continue
                    </Text>
                </TouchableOpacity>
            </View>

            <BottomSheet
                isVisible={isSuccessSheetVisible}
                onBackdropPress={closeSuccessSheet}
            >
                <View style={styles.successSheetContent}>
                    <AntDesign name="checkcircle" size={45} color={colors.success} />
                    <Text style={styles.successTitle}>Card name changed Successfully!</Text>
                    <Text style={styles.name}>{name}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={closeSuccessSheet}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </BottomSheet>
        </GestureHandlerRootView>
    );
};

export default CustomNameScreen;

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
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: -10,
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
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
    fontWeight: '700',
  },
  subText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 10,
    fontWeight: '500',
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
    backgroundColor: colors.input,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
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
    backgroundColor: colors.label,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  closeButtonText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  name:{
    fontSize: 14,
    color: colors.success,
    marginBottom: 10,
    fontWeight: '500',
  }
});
