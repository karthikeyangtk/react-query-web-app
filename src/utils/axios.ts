import axios from "axios";

export const fetcher = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: {
    Accept: '*/*',
    'Content-Type': 'text/plain; application/json, charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  },
})