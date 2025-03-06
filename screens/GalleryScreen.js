import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  PermissionsAndroid,
  Dimensions,
  Platform,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get('window').width - 60;
const numColumns = 2;
const containerMargin = 10; // total horizontal margin (adjust as needed)
const imageContainerWidth =
  (windowWidth - containerMargin * (numColumns + 1)) / numColumns;

const requestPermissions = async () => {
  try {
    // Always request camera permission
    let permissions = [PermissionsAndroid.PERMISSIONS.CAMERA];

    // For Android, handle storage permissions differently depending on the version.
    if (Platform.OS === 'android') {
      if (Platform.Version >= 33) {
        // For Android 13+ (API level 33)
        permissions.push(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
      } else {
        // For older versions
        permissions.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        permissions.push(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      }
    }

    const result = await PermissionsAndroid.requestMultiple(permissions);
    let allGranted = true;
    permissions.forEach(permission => {
      if (result[permission] !== PermissionsAndroid.RESULTS.GRANTED) {
        allGranted = false;
      }
    });

    if (!allGranted) {
      Alert.alert(
        'Permissions Required',
        'Camera and gallery permissions are needed.',
      );
    }
  } catch (err) {
    console.warn('Permission Error:', err);
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
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    console.log('Updated images state:', images);
  }, [images]);

  useEffect(() => {
    requestPermissions();
  }, []);

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        Alert.alert('Selection Cancelled');
      } else if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const newImage = {
          id: Math.random().toString(),
          uri: response.assets[0].uri,
        };
        console.log('Picked Image URI:', response.assets[0].uri);
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
      } else if (response.assets && response.assets.length > 0) {
        const newImage = {
          id: Math.random().toString(),
          uri: response.assets[0].uri,
        };
        console.log('Captured Image URI:', response.assets[0].uri);
        setImages(prevImages => [...prevImages, newImage]);
      }
    });
  };

  // Delete the image that is currently being previewed
  const deleteImage = () => {
    Alert.alert('Delete Image', 'Are you sure you want to delete this image?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          setImages(prevImages =>
            prevImages.filter(image => image.uri !== selectedImage),
          );
          setSelectedImage(null);
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📷 Gallery</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>📸 Take Photo</Text>
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
          <TouchableOpacity onPress={() => setSelectedImage(item.uri)}>
            <View style={styles.imageContainer}>
              <Image
                source={{uri: item.uri}}
                style={styles.image}
                resizeMode="cover"
                onError={e =>
                  console.log(
                    'Error loading image',
                    item.uri,
                    e.nativeEvent.error,
                  )
                }
              />
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />

      {/* Full-Screen Image Preview Modal */}
      <Modal visible={!!selectedImage} transparent animationType="fade">
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedImage(null)}>
            <Text style={styles.closeButtonText}>✖</Text>
          </TouchableOpacity>
          {/* Delete Button with proper icon */}
          <TouchableOpacity style={styles.deleteButton} onPress={deleteImage}>
            <Icon name="delete" size={24} color="#fff" />
          </TouchableOpacity>
          <Image
            source={{uri: selectedImage}}
            style={styles.fullImage}
            resizeMode="contain"
            onError={e =>
              console.log(
                'Error loading modal image',
                selectedImage,
                e.nativeEvent.error,
              )
            }
          />
        </View>
      </Modal>
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
    fontSize: 24,
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
    backgroundColor: '#2348fc',
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
    margin: containerMargin / 2,
    width: imageContainerWidth,
    height: imageContainerWidth, // keeping it square
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
    height: '100%',
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderRadius: 50,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  deleteButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(255,0,0,0.8)',
    padding: 10,
    borderRadius: 50,
  },
});
