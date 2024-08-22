
import axios from 'axios';

// const baseURL = 'http://localhost:3000/api';

const baseURL = 'http://127.0.0.1:8083';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
