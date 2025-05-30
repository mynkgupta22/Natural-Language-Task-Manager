import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api'
});

export const createTask = async (rawText) => {
  const response = await api.post('/tasks/parse', { rawText });
  return response.data;
};

export const getAllTasks = async () => {
  const response = await api.get('/tasks');
  return response.data;
};

export const updateTask = async (id, task) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
}; 