import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/students',
});

export const fetchStudents = () => API.get('/');
export const fetchStudentById = (id) => API.get(`/${id}`);
export const createStudent = (data) => API.post('/', data);
export const updateStudent = (id, data) => API.put(`/${id}`, data);
export const deleteStudent = (id) => API.delete(`/${id}`);
// Matching the bulk delete we discussed
export const bulkDelete = (ids) => API.delete('/bulk', { data: { ids } });