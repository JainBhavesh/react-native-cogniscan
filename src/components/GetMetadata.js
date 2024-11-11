import axios from 'axios';

const GetMetadata = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get('https://dev-cs.cognigenx.io/api/v1/doc_ocr/list')
        .then(response => {
          if (response.status === 200) {
            resolve(response.data);
          } else {
            reject(
              new Error(
                `API returned an error: ${response.status} - ${response.statusText}`,
              ),
            );
          }
        })
        .catch(error => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

export default GetMetadata;
