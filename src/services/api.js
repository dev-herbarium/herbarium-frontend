// src/services/api.js

import axios from "axios";

// --------------------------------------------------------
// IMPORTANT: This sets my Backend API Base Configuration.
// --------------------------------------------------------
const API_BASE_URL = "http://localhost:8080/api"; // (!) Assuming my Spring Boot Backend runs on 8080

// Create a custom instance of Axios.
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // Optional: If necessary set a timeout here:
  // timeout: 5000,
});

/**
 * @constant api
 * @description <b> A pre-configured Axios instance for the Herbarium Backend API. </b>
 * <p>
 * It is pre-set with the base URL and default JSON headers.
 * @type {object}
 * @example
 * // In a service file (e.g., plantService.js)
 * import api from './api';
 * const fetchPlant = async (plantId) => {
 *      const response = await api.get(`/plants/${plantId}`);
 *      return response.data;
 * }
 */
export default api;

// --------------------------------------------------------
// TODO: Interceptors for Authorization (Future Enhancement)
// --------------------------------------------------------
// (!) In the future, implement JWT Security:

/*
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);
*/
