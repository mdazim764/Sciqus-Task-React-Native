import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Landing'); // Navigate to Landing screen
    }, 3000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash.jpeg')}
        style={styles.fullscreenImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Optional: Change background if needed
  },
  fullscreenImage: {
    width: width,
    height: height,
    resizeMode: 'cover', // Use "contain" if you don't want stretching
    position: 'absolute', // Ensure it covers the entire screen
  },
});

export default SplashScreen;
