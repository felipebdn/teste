import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://172.120.10.25:3333',
})
