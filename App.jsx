import { useEffect, useState } from 'react';
import { Image } from 'react-native';
// import { ScanDocument } from 'react-native-scan-document';
import DocumentScannerComponent from './src/components/DocumentScannerComponent';

export default function App() {
  const [scannedImage, setScannedImage] = useState();

  // const getData = async() =>{
  //   try {
  //     const result = await ScanDocument();
  //     console.log('result',result);
      
  //     setScannedImage(result?.scannedImages[0])
  //     console.log('result',result?.scannedImages[0]);
  //   } catch (error) {
  //     console.error('error',error);

  //   }
  // }
  // useEffect(() => {
  //   getData()
  // }, [])
  
  return (
  <DocumentScannerComponent/>
  )
}
