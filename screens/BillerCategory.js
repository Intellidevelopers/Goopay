import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

const BillerCategory = () => {
  const [billers, setBillers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch billers
  const fetchBillers = async () => {
    try {
      console.log("Fetching billers...");
      const response = await axios.get(
        'https://api.flutterwave.com/v3/bills/CABLEBILLS/billers?country=NG',
        {
          headers: {
            Authorization: 'Bearer FLWSECK_TEST-5665e88a12f2ccca399d2cb69821c83f-X',
          },
        }
      );
      console.log("Response: ", response.data);

      if (response.data.status === 'success') {
        setBillers(response.data.data);
      } else {
        Alert.alert('Error', 'Failed to fetch billers');
      }
    } catch (err) {
      console.error("Error fetching billers:", err);
      setError(err);
      Alert.alert('Error', 'Failed to fetch billers');
    } finally {
      setLoading(false);
    }
  };

  // Fetch billers on component mount
  useEffect(() => {
    fetchBillers();
  }, []);

  // Render each biller in the list
  const renderBiller = ({ item }) => (
    <View style={styles.billerContainer}>
      <Text style={styles.billerName}>{item.name}</Text>
      <Text style={styles.billerDescription}>{item.description}</Text>
      <Text style={styles.billerCode}>Biller Code: {item.biller_code}</Text>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Billers</Text>
      {error && <Text style={styles.errorText}>Error: {error.message}</Text>}
      <FlatList
        data={billers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderBiller}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 20,
  },
  billerContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  billerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  billerDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 6,
  },
  billerCode: {
    fontSize: 12,
    color: '#999',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default BillerCategory;
