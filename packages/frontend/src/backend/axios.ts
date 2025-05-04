import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

export const httpClient = axios.create({
  baseURL: API_URL,
});
