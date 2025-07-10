import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // tu backend local
});

export const crearProducto = (datos) => {
  return axios.post(API_URL, datos);
};