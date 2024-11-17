import React, { useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import colors from '../components/colors';
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import useSuccessBettingStore from '../store/useSucceeBettingStore';

const Success = ({ navigation }) => {
  const successBiller = useSuccessBettingStore((state) => state.successBiller);

  if (!successBiller) {
    return <Text>No biller details available</Text>;
  }

  // Function to generate and save PDF
  const handleDownloadReceipt = async () => {
    try {
      const htmlContent = `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #fff;
      background-color: #1C1C1E;
      padding: 20px;
      margin: 0;
    }
    .container {
      max-width: 400px;
      background-color: #333;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      text-align: center;
    }
    .checkmark {
      background-color: #4CAF50;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
    }
    .checkmark img {
      width: 20px;
      height: 20px;
    }
    h1 {
      font-size: 16px;
      margin-bottom: 5px;
    }
    p {
      font-size: 14px;
      color: #b0b0b0;
      margin: 5px 0;
    }
    .total-amount {
      font-size: 24px;
      font-weight: bold;
      color: #fff;
      margin: 20px 0;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-top: 20px;
    }
    .info-box {
      background-color: #444;
      padding: 10px;
      border-radius: 10px;
    }
    .info-label {
      font-size: 12px;
      color: #b0b0b0;
    }
    .info-value {
      font-size: 12px;
      font-weight: bold;
      color: #fff;
    }
    .download-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #007AFF;
      margin-top: 20px;
      text-decoration: none;
    }
    .download-btn img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="checkmark">
     <img src="https://img.icons8.com/ios-filled/50/ffffff/checkmark.png" alt="Success">
    </div>
    <h1>Payment Success!</h1>
    <p>Your payment has been successfully done.</p>

    <div class="total-amount">₦{successBiller.amount}</div>

    <div class="info-grid">
      <div class="info-box">
        <p class="info-label">Payment Time</p>
        <p class="info-value">12:40.00 PM</p>
      </div>
      <div class="info-box">
        <p class="info-label">Plan</p>
        <p class="info-value">{successBiller.plan}</p>
      </div>
      <div class="info-box">
        <p class="info-label">Biller</p>
        <p class="info-value">{successBiller.name}</p>
      </div>

      <div class="info-box">
        <p class="info-label">Payment Method</p>
        <p class="info-value">{successBiller.option === 'myself' ? 'Myself' : 'Others'}</p>
      </div>
      
    </div>

    <div class="download-btn">
      <span>Thanks for using Goopay...</span>
    </div>
  </div>
</body>
</html>
      `;
      
      // Create a PDF from the HTML content
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      // Save to a more accessible location (Downloads folder)
      const downloadUri = `${FileSystem.documentDirectory}Receipt_${Date.now()}.pdf`;
      await FileSystem.moveAsync({
        from: uri,
        to: downloadUri,
      });
      Alert.alert("Receipt downloaded successfully", `Saved to: ${downloadUri}`);
    } catch (error) {
      Alert.alert("Error", "Could not download the receipt");
    }
  };

  // Function to share PDF
  const handleShareReceipt = async () => {
    try {
      const htmlContent = `
                <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      color: #fff;
      background-color: #1C1C1E;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }
    .container {
      width: 100%;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
      background-color: #333;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .checkmark {
      background-color: #4CAF50;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
    }
    .checkmark img {
      width: 20px;
      height: 20px;
    }
    h1 {
      font-size: 16px;
      margin-bottom: 5px;
    }
    p {
      font-size: 14px;
      color: #b0b0b0;
      margin: 5px 0;
    }
    .total-amount {
      font-size: 24px;
      font-weight: bold;
      color: #fff;
      margin: 20px 0;
    }
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      margin-top: 20px;
    }
    .info-box {
      background-color: #444;
      padding: 10px;
      border-radius: 10px;
    }
    .info-label {
      font-size: 12px;
      color: #b0b0b0;
    }
    .info-value {
      font-size: 12px;
      font-weight: bold;
      color: #fff;
    }
    .download-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #007AFF;
      margin-top: 20px;
      text-decoration: none;
    }
    .download-btn img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="checkmark">
      <img src="https://img.icons8.com/ios-filled/50/ffffff/checkmark.png" alt="Success">
    </div>
    <h1>Payment Success!</h1>
    <p>Your payment has been successfully done.</p>

    <div class="total-amount">₦${successBiller.amount}</div>

    <div class="info-grid">
      <div class="info-box">
        <p class="info-label">Payment Time</p>
        <p class="info-value">12:40.00 PM</p>
      </div>
      <div class="info-box">
        <p class="info-label">Plan</p>
        <p class="info-value">${successBiller.plan}</p>
      </div>
      <div class="info-box">
        <p class="info-label">Biller</p>
        <p class="info-value">${successBiller.name}</p>
      </div>

      <div class="info-box">
        <p class="info-label">Payment Method</p>
        <p class="info-value">${successBiller.option === 'myself' ? 'Myself' : 'Others'}</p>
      </div>
    </div>

    <div class="download-btn">
      <span>Thanks for using Goopay...</span>
    </div>
  </div>
</body>
</html>
      `;

      // Create a PDF file
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      // Share the PDF file
      await Sharing.shareAsync(uri);
    } catch (error) {
      Alert.alert("Error", "Could not share the receipt");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={successBiller.image} style={styles.image} />
      </View>

      <Text style={styles.title}>Payment Successful</Text>
      <Text style={styles.message}>
        Congratulations! Your Bet Funding of <Text style={styles.amount}>₦{successBiller.amount}</Text> for <Text style={styles.recipient}>{successBiller.name}</Text> was successful.
      </Text>

      {/* <View style={styles.flex}>
        <Text style={styles.label}>Bil Plan</Text>
        <Text>:</Text>
        <Text style={styles.amount}>{successBiller.plan}</Text>
      </View>

      <View style={styles.flex}>
        <Text style={styles.label}>Option</Text>
        <Text>:</Text>
        <Text style={styles.amount}>{successBiller.option === 'myself' ? 'Myself' : 'Others'}</Text>
      </View> */}

      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleShareReceipt}>
          <View style={styles.iconContain}>
            <Entypo name="share" size={20} color="#007AFF" />
          </View>
          <Text style={styles.actionButtonText}>Share Receipt</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} onPress={handleDownloadReceipt}>
          <View style={styles.iconContain}>
            <MaterialCommunityIcons name="download-outline" size={20} color="#007AFF" />
          </View>
          <Text style={styles.actionButtonText}>Download Receipt</Text>
        </TouchableOpacity>
      </View> */}

      <TouchableOpacity style={styles.dismissButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.dismissButtonText}>Dismiss</Text>
      </TouchableOpacity>
    </View>
  );
};

  

export default Success;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 20,
    marginTop: 'auto'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  amount: {
    fontWeight: 'bold',
    color: '#000',
  },
  recipient: {
    fontWeight: 'bold',
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  actionButtonText: {
    fontSize: 12,
    color: colors.black,
    marginLeft: 5,
    fontWeight: '500'
  },
  dismissButton: {
    backgroundColor: '#E0E7FF',
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderRadius: 10,
    marginTop: 'auto',
    width: '100%',
    alignItems: 'center',
  },
  dismissButtonText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: 'bold',
  },
  iconContain:{
    backgroundColor: colors.label,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  flex:{
    flexDirection: 'row',
    justifyContent:'space-around',
    marginBottom: 10,
    width: '70%',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    paddingVertical: 10,
    gap: 10,
  },
  label:{
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 5,
    fontWeight: '500'
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
    alignSelf: 'center',
  },
});
