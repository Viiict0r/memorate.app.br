import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-memorate-app-br.fly.dev',
  timeout: 10000,
});
