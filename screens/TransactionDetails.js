import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import useTransactionStore from '../store/transactionStore';
import NotFound from '../components/NotFound';
import { MaterialIcons, FontAwesome5, AntDesign } from 'react-native-vector-icons';
import colors from '../components/colors';

const statusMapping = {
  success: {
    icon: <AntDesign name="checkcircle" size={26} color="#2ecc71" />,
    color: colors.success,
    iconSize: 12, // New size property for success icon
  },
  pending: {
    icon: <MaterialIcons name="hourglass-empty" size={26} color="#f39c12" />,
    color: "#f39c12", // yellow color for pending
    iconSize: 26,
  },
  failed: {
    icon: <AntDesign name="closecircle" size={26} color="#e74c3c" />,
    color: "#e74c3c", // red color for failed
    iconSize: 26,
  },
};

const TransactionDetails = ({ navigation }) => {
  const selectedTransaction = useTransactionStore((state) => state.selectedTransaction);

  if (!selectedTransaction) {
    return <NotFound />;
  }

  const { icon, color, iconSize } = statusMapping[selectedTransaction.status] || {
    icon: null,
    color: colors.default, // default color if status not found
    iconSize: 26,
  };

  return (
    <View style={styles.container}>
         <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <AntDesign name="arrowleft" size={24} style={styles.backIcon} />
            </TouchableOpacity>
            <Text style={styles.headerText}>Receipt</Text>
        </View>
        
      <View style={styles.successContainer}>
        <View style={styles.successIcon}>
          {icon}
        </View>
        <Text style={[styles.successText, { color: color }]}>{selectedTransaction.status}</Text>
        <Text style={styles.amountText}>{selectedTransaction.amount.toLocaleString()}</Text>
      </View>

      {/* Payment Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailsHeader}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <AntDesign name='up' size={16} />
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>TXN ID Number</Text>
          <Text style={styles.detailValue}>{selectedTransaction.transactionId}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Ref Number</Text>
          <Text style={styles.detailValue}>{selectedTransaction.refNumber}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Beneficiary Name</Text>
          <Text style={styles.detailValue}>{selectedTransaction.name}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Bank Name</Text>
          <Text style={styles.detailValue}>{selectedTransaction.bank}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Status</Text>
          <View style={styles.statusContainer}>
            <View style={styles.successIcon2}>
              <AntDesign name={selectedTransaction.status === 'success' ? "checkcircle" : "closecircle"} size={selectedTransaction.status === 'success' ? 12 : 12} color={color} />
            </View>
            <Text style={[styles.statusText, { color: color }]}>{selectedTransaction.status}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Payment Time</Text>
          <Text style={styles.detailValue}>{selectedTransaction.date} {selectedTransaction.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Total Payment</Text>
          <Text style={styles.detailValue1}>{selectedTransaction.amount.toLocaleString()}</Text>
        </View>
      </View>

      {/* Help Section */}
      <TouchableOpacity style={styles.helpContainer} onPress={() => navigation.navigate('Help')}>
        <View style={styles.helpIcon}>
            <AntDesign name="questioncircleo" size={20} style={styles.icon} color="#6200EE" />
        </View>
        <View>
            <Text style={styles.helpText}>Trouble With Your Payment?</Text>
            <Text style={styles.helpLink}>Let us know on help center now!</Text>
        </View>
        <TouchableOpacity>
            <AntDesign name="right" style={styles.icon} size={24} color="#6200EE" />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.pdfButton}>
          <FontAwesome5  style={styles.icon} name="file-pdf" size={20} color="#6200EE" />
          <Text style={styles.pdfButtonText}>Get PDF Receipt</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.doneButton}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    paddingHorizontal: 16,
  },
  successContainer: {
    backgroundColor: colors.white,
    paddingVertical: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 20
  },
  successText: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '600',
  },
  amountText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 4,
  },
  detailsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 13,
    color: '#888',
    fontWeight: '400',
  },
  detailValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '500',
  },
  detailValue1: {
    fontSize: 18,
    color: '#000',
    fontWeight: '700',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  helpContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
  },
  helpLink: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 'auto'
  },
  pdfButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginBottom: 10,
    justifyContent: 'center',
  },
  pdfButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 8,
  },
  doneButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doneButtonText: {
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    alignItems: 'center'
  },
  successIcon: {
    backgroundColor: colors.label,
    padding: 15,
    borderRadius: 30
  },
  successIcon2: {},
  helpIcon:{
    backgroundColor: colors.label,
    padding: 10,
    borderRadius: 30
  },
  icon:{
    color: colors.primary
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // centers items horizontally in the header
    marginTop: 30,
    marginBottom: 10,
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
});

export default TransactionDetails;
