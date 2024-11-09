import { PermissionsAndroid, Platform } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';

const ScanDocument = async () => {
  if (
    Platform.OS === 'android' &&
    (await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)) !==
      PermissionsAndroid.RESULTS.GRANTED
  ) {
    throw new Error('Camera permissions are required to scan documents.');
  }

  try {
    return await DocumentScanner.scanDocument();
  } catch (error) {
    throw new Error(`Error scanning document: ${error.message}`);
  }
};

export default ScanDocument;
