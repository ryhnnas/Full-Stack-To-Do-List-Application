import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';
const API_AUTH_URL = 'http://localhost:5000/api/auth'; // Untuk Autentikasi

const taskService = {
    getAuthHeader: () => {
        const token = localStorage.getItem('token');
        return token ? {'x-auth-token': token} : {};
    },

    getAllTasks: () => {
        return axios.get(API_URL, { headers: taskService.getAuthHeader() });
    },
    getFilteredTasks: (status) => {
        return axios.get(`${API_URL}/filter?status=${status}`, {headers: taskService.getAuthHeader()});
    },
    addTask: (task) => {
        return axios.post(API_URL, task, {headers: taskService.getAuthHeader()});
    },
    updateTask: (id, task) => {
        return axios.put(`${API_URL}/${id}`, task, {headers: taskService.getAuthHeader()});
    },
    deleteTask: (id) => {
        return axios.delete(`${API_URL}/${id}`, {headers: taskService.getAuthHeader()});
    },

    // --- Fungsi Autentikasi (Opsional) ---
    register: (userData) => {
        return axios.post(`${API_AUTH_URL}/register`, userData);
    },
    login: async (credentials) => {
        const response = await axios.post(`${API_AUTH_URL}/login`, credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
    },
    // --- Akhir Fungsi Autentikasi ---
};

export default taskService;