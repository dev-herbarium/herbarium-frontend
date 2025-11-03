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
 * **Pre-configured Axios instance for Herbarium Backend API communication**
 * 
 * @module services/api
 * @constant {Object} api
 * @description A pre-configured Axios instance with base URL and default headers
 * for communicating with the Herbarium Backend API. Provides centralized
 * configuration for all API requests including future authentication interceptors.
 * 
 * @property {string} baseURL - The base URL for all API requests
 * @property {Object} headers - Default headers for API requests
 * 
 * @example
 * // Import and use in service files
 * import api from './api';
 * 
 * const fetchPlants = async () => {
 *   const response = await api.get('/plants');
 *   return response.data;
 * }
 * 
 * @see axios
 * @see registrationService
 * @see statusService
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
