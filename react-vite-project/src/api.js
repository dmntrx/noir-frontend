import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
});

// добавляем токен ко всем запросам
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('access_token');

      // редирект на логин
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default API;
