import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem('user_token'));
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const fetchAll = (entity) => apiClient.get(`/${entity}`);
export const createEntity = (entity, data) => apiClient.post(`/${entity}`, data);
export const deleteEntity = (entity, id) => apiClient.delete(`/${entity}/${id}`);

export const updateEntity = (entity, id, data) => apiClient.put(`/${entity}/${id}`, data);


const AUTH_URL = 'http://localhost:8080/api/auth';

export const login = async (email, password) => {
  const response = await axios.post(`${AUTH_URL}/login`, { email, password });
  if (response.data.token) {
    localStorage.setItem('user_token', JSON.stringify(response.data.token));
  }
  return response.data;
};

export const register = (registerData) => {
  return axios.post(`${AUTH_URL}/register`, registerData);
};

export const logout = () => {
  localStorage.removeItem('user_token');
};

export const getCurrentUserToken = () => {
  return JSON.parse(localStorage.getItem('user_token'));
};