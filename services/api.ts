import axios from 'axios';

const api = axios.create({
  baseURL: 'https://crudcrud.com/api/YOUR_KEY',
});

export default api;