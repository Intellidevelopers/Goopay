import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, Image } from 'react-native';
import colors from '../components/colors';
import { StatusBar } from 'expo-status-bar';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: '1', title: 'Support', text: 'Hello there! Need help? Reach out to us right here, and we’ll get back to you as soon as we can!', sender: 'Goopay' },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setMessages(prevMessages => [
        ...prevMessages,
        { id: Math.random().toString(), text: inputMessage, sender: 'User' },
      ]);
      setInputMessage('');
      
      // Dummy response from Goopay
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          { id: Math.random().toString(), text: 'Thank you for reaching out! How can we assist you today?', sender: 'Goopay' },
        ]);
      }, 2000);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={item.sender === 'User' ? styles.userMessage : styles.goopayMessage}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/user.png')} style={styles.user}/>
      <View>
      <Text style={styles.header}>Chat with us</Text>
      <Text style={styles.subHeader}>Currently replying in 30 minutes</Text>
      </View>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.chatContainer}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={inputMessage}
          onChangeText={setInputMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
      <StatusBar backgroundColor={colors.primary}/>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyBackground,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white
  },
  subHeader: {
    fontSize: 14,
    color: colors.input,
  },
  chatContainer: {
    flex: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  goopayMessage: {
    backgroundColor: '#d9f0ff',
    alignSelf: 'flex-start',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  userMessage: {
    backgroundColor: '#e6e6e6',
    alignSelf: 'flex-end',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.label,
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  user:{
    width: 40,
    height: 40,
    borderRadius: 15,
    marginRight: 10
  },
  supportTitle:{
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 5,
  },
  headerContainer:{
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary,
    marginTop: 30,
    flexDirection: 'row',
  }
});
