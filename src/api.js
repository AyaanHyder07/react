import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

// generic helpers
export const fetchAll = async (entity) => {
  try {
    const res = await api.get(`/${entity}`);
    const data = res.data;
    return Array.isArray(data) ? data : (data.content || []); // ensure array
  } catch (err) {
    console.error(`Error fetching ${entity}:`, err);
    return [];
  }
};

export const createEntity = (entity, payload) =>
  api.post(`/${entity}`, payload).then((res) => res.data);

export default api;
