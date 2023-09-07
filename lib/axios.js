import axios from 'axios';

export const api = axios.create({
  baseURL:'https://gas-mobile-api.onrender.com/api/v1/'
})