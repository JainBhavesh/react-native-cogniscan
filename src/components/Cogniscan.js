import axios from 'axios';
import { PermissionsAndroid, Platform } from 'react-native';
import DocumentScanner from 'react-native-document-scanner-plugin';
import { BASE_URL } from '../constants/constants';

const getFileName = (filePath) => {
  const fileNameWithExtension = filePath.split('/').pop();  // Get the last part after the last "/"
  return fileNameWithExtension;
};

// Function to determine MIME type based on file extension
const getMimeType = (filePath) => {
  const fileExtension = filePath.split('.').pop().toLowerCase();  // Get file extension

  // Mapping file extensions to MIME types
  const mimeTypes = {
    jpg: 'image/jpg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    bmp: 'image/bmp',
    tiff: 'image/tiff',
  };

  return mimeTypes[fileExtension] || 'image/jpg'; // Default MIME type if not found
};



const apiCallForScan = async (documentCode,countryCode,result) =>{
  const formData = new FormData();
  formData.append('document_code', documentCode);
  formData.append('country_code', countryCode);
  formData.append('tenant_id', '123-123-123');
  const fileName = getFileName(result?.scannedImages[0]);   
const mimeType = getMimeType(result?.scannedImages[0])
  // Add the image file to the form data
  formData.append('file', {
    uri: result?.scannedImages[0], // The local URI of the scanned document/image
    type: mimeType, // The MIME type for the image
    name: fileName, // The name of the file being uploaded
  });
  console.log(JSON.stringify(formData));

  return new Promise((resolve, reject) => {
    try {
      axios.post(
        `${BASE_URL}process-document`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(
            new Error(`API returned an error: ${response.status} - ${response.statusText}`)
          );
        }
      })
      .catch((error) => {
        reject(error);
      });
    } catch (error) {
      reject(error);
    }
  });
}

const Cogniscan = async ({ documentCode, countryCode }) => {
  try {
    if (
      Platform.OS === 'android' &&
      (await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)) !==
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      throw new Error('Camera permissions are required to scan documents.');
    }

    const result = await DocumentScanner.scanDocument(); // Await the scanning operation

    console.log('Scan Result:', result);

    if (result?.status === "success") {
      // Proceed with the API call for the scanned document
      const apiResponse = await apiCallForScan(documentCode, countryCode, result);
      return apiResponse;  // Return the API response to the caller
    } else {
      throw new Error('No document scanned.');
    }
  } catch (error) {
    console.log("Error in Cogniscan:", error);
    throw error;  // Re-throw the error to be caught outside
  }
};
export default Cogniscan;
