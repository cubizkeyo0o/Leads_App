import { API_KEY, API_URL } from '@env';
import axios from 'axios';

const BASE_URL = API_URL + API_KEY;

const mainAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainAxios;