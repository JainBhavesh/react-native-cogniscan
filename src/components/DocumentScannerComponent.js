import React, { useEffect, useState } from 'react';
import { Alert, Image, PermissionsAndroid, Platform, View } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';

const DocumentScannerComponent = () => {
  const [scannedImage, setScannedImage] = useState();

  const scanDocument = async () => {
    if (
      Platform.OS === 'android' &&
      (await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      )) !== PermissionsAndroid.RESULTS.GRANTED
    ) {
      Alert.alert(
        'Error',
        'User must grant camera permissions to use document scanner.'
      );
      return;
    }

    const { scannedImages } = await DocumentScanner.scanDocument();
    console.log('scannedImages',scannedImages);
        
    if (scannedImages.length > 0) {
      setScannedImage(scannedImages[0]);
    }
  };

  useEffect(() => {
    scanDocument();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {scannedImage && (
        <Image
          resizeMode="contain"
          style={{ width: '100%', height: '100%' }}
          source={{ uri: scannedImage }}
        />
      )}
    </View>
  );
};

export default DocumentScannerComponent;
