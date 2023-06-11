import axios from 'axios'
import { notification } from 'ant-design-vue';


export const api = axios


// Error handlers

const errorHandler = (error: {message: ''}) => {
    console.log('An error occurred:', error.message);
    notification.error({message: `${error.message}`});
};

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
      errorHandler(error);
      return Promise.reject(error);
    }
)
  