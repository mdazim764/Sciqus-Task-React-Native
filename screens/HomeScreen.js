import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Header from '../navigation/Header';

const HomeScreen = ({navigation}) => {
  const handleLogout = () => {
    navigation.replace('Login'); // Navigate back to login
  };

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Welcome to Home Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {flex: 1},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
});
