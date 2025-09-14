import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1'; // Your backend URL

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchAll = async (entity) => {
  const response = await apiClient.get(`/${entity}`);
  return response.data;
};

export const createEntity = async (entity, data) => {
  const response = await apiClient.post(`/${entity}`, data);
  return response.data;
};

// ✅ ADD THIS DELETE FUNCTION
export const deleteEntity = async (entity, id) => {
  const response = await apiClient.delete(`/${entity}/${id}`);
  return response.data;
};