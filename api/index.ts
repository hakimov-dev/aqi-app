import axios from 'axios'

export const api = axios

// Error handlers

const errorHandler = (error: Object) => {
    console.log('An error occurred:', error);
};

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
      errorHandler(error);
      return Promise.reject(error);
    }
)
  