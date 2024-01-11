const getEncodeData = data => {
  let formBody = [];
  for (let property in data) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(data[property]);
    formBody.push(encodedKey + '=' + encodedValue);
  }
  formBody = formBody.join('&');
  return formBody;
};

const getFormEncodedData = data => {
  let formData = new FormData();

  for (let key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};

const getJSONHeaderType = () => {
  let header = {
    'Content-Type': 'application/json;charset=UTF-8',
  };
  return header;
};

const SERVER_URL = 'https://admin.staragent.co/';
const DYNAMIC_URL_KEY = 'DYNAMIC_URL';
const BOOKING_FILE_URL =
  'https://staragent-userfiles.s3.amazonaws.com/demo/models/files/';

const ERROR_MESSAGE = 'Something went wrong!';

export {
  getEncodeData,
  getFormEncodedData,
  SERVER_URL,
  DYNAMIC_URL_KEY,
  ERROR_MESSAGE,
  getJSONHeaderType,
  BOOKING_FILE_URL,
};
