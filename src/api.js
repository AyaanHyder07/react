import axios from "axios";

const API_URL = "http://localhost:8080/api/v1";

export async function fetchAll(entity) {
  const res = await axios.get(`${API_URL}/${entity}`);
  return res.data;
}

export async function createEntity(entity, data) {
  const res = await axios.post(`${API_URL}/${entity}`, data);
  return res.data;
}

export async function deleteEntity(entity, id) {
  await axios.delete(`${API_URL}/${entity}/${id}`);
}
