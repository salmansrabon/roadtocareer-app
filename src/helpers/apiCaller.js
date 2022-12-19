import axios from "axios";
import { api } from "../variables";

const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

const publicGet = async (endpoint) => {
  const response = await axios.get(`${api}${endpoint}`, config);
  return response.data;
};

const publicPost = async (endpoint, body) => {
  const response = await axios.post(`${api}${endpoint}`, body, config);
  return response.data;
};

const privateGet = async (endpoint, token) => {
  config.headers.Authorization = `Bearer ${token}`;
  const response = await axios.get(`${api}${endpoint}`, config);
  return response.data;
};

const privatePost = async (endpoint, token, body) => {
  config.headers.Authorization = `Bearer ${token}`;
  const response = await axios.post(`${api}${endpoint}`, body, config);
  return response.data;
};

const privatePut = async (endpoint, token, body) => {
  config.headers.Authorization = `Bearer ${token}`;
  const response = await axios.put(`${api}${endpoint}`, body, config);
  return response.data;
};

const privateDel = async (endpoint, token, body) => {
  config.headers.Authorization = `Bearer ${token}`;
  const response = await axios.delete(`${api}${endpoint}`, config);
  return response.data;
};

export { publicGet, publicPost, privateGet, privatePost, privatePut, privateDel };
