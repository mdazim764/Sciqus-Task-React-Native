import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';

const Header = () => {
  return (
    <ImageBackground
      source={{
        uri: 'https://t4.ftcdn.net/jpg/02/76/08/07/360_F_276080724_hltnCyDjcqAyRtLzDYo3T2jXbBtCD7fl.jpg',
      }} // Background Image
      style={styles.header}>
      {/* Left Side: Logo */}
      <Text style={styles.logo}>Logo</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 10, // Space for notch
    height: 60, // Fixed height for background image
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Header;
