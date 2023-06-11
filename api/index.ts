import axios from 'axios'

export const api = axios

export const aqiApi = axios

aqiApi.defaults.headers.common['X-Api-Key'] = `${process.env.NUXT_ENV_AQI_KEY}`

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
  