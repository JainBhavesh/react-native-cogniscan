import { useEffect } from 'react';
import Cogniscan from './src/components/Cogniscan';
import { GetMetadata } from './src/components/GetMetadata';

export default function App() {
  const getData = async() =>{
    try {
       Cogniscan({countryCode:'1',documentCode:'1'}).then((result)=>{
          console.log('result',result);
       }).catch(e=>{
        console.log('errrr',e);
        
       })
      
    } catch (error) {
      console.error('error',error);

    }
  }
  const getMetaData = async() =>{
    try {
      const res = await GetMetadata();
      console.log('res',res);
      
    } catch (error) {
      console.log('error',error);
      
    }
  }
  useEffect(() => {
    getData();
    getMetaData()
  }, [])
  
  return null
}
