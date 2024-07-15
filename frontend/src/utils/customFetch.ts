import axios from 'axios';

const productionUrl = 'http://localhost:4000';

export const customFetch = axios.create({
  baseURL: productionUrl,
});
