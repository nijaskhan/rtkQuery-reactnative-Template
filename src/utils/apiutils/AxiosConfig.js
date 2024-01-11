import axios from 'axios';
import {SERVER_URL} from '.';
const timeout = 30000;

const defaultConfig = {
  timeout: timeout,
};

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  config: defaultConfig,
});

const isHandlerEnabled = (config = {}) => {
  return config.hasOwnProperty('handlerEnabled') && !config.handlerEnabled
    ? false
    : true;
};

const requestHandler = async request => {
  if (isHandlerEnabled(request)) {
    // Modify request here
    // const accessToken = await getData(StorageKeys.ACCESS_TOKEN)
    // request.headers.Authorization = `Bearer ${accessToken}`
    request.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  }
  return request;
};

const errorHandler = error => {
  console.log(error);
  return Promise.reject(error);
};

const successHandler = response => {
  if (isHandlerEnabled(response.config)) {
    // Handle responses Provide Success Message
  }
  console.log('Inside axios', response);
  return response;
};

axiosInstance.interceptors.request.use(requestHandler);
axiosInstance.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error),
);

export {axiosInstance, isHandlerEnabled, requestHandler};
