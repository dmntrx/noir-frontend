import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000',
});

// Добавляем токен ко всем запросам
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
