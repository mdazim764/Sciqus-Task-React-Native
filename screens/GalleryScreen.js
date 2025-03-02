import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const requestPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    ]);

    if (
      granted[PermissionsAndroid.PERMISSIONS.CAMERA] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted[PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('All permissions granted');
    } else {
      Alert.alert(
        'Permissions Denied',
        'Camera and gallery access is required.',
      );
    }
  } catch (err) {
    console.warn(err);
  }
};

const GalleryScreen = () => {
  const [images, setImages] = useState([
    {
      id: '1',
      uri: 'https://www.shutterstock.com/image-photo/demo-text-message-magnifying-glass-600nw-2491336635.jpg',
    },
    {
      id: '2',
      uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s',
    },
  ]);

  useEffect(() => {
    requestPermissions();
  }, []);

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        Alert.alert('Selection Cancelled');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets) {
        const newImage = {
          id: Math.random().toString(),
          uri: response.assets[0].uri,
        };
        setImages(prevImages => [...prevImages, newImage]);
      }
    });
  };

  const takePhoto = () => {
    launchCamera({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        Alert.alert('Camera Closed');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets) {
        const newImage = {
          id: Math.random().toString(),
          uri: response.assets[0].uri,
        };
        setImages(prevImages => [...prevImages, newImage]);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>˙✧˖°📷 ༘Gallery ⋆｡°</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>📷 Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>🖼️ Pick from Gallery</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={images}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.imageContainer}>
            <Image source={{uri: item.uri}} style={styles.image} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7FC',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E90FF',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
});
