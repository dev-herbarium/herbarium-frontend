// src/services/statusService.js
import api from "./api";

// TODO: This file, and likely the folder containing it (utils), should be deleted in the future.

/**
 * Status Service - Monitors backend API connectivity and health
 * 
 * @module services/statusService
 * @description Service for checking backend API status and connectivity.
 * Primarily used for development and monitoring purposes to verify
 * that the frontend can communicate with the backend API.
 * 
 * @note This service is mainly for testing purposes and may be
 * refactored or removed in future versions.
 * 
 * @see api
 * @see StatusChecker
 */

/**
 * **Fetches the current application status from the Herbarium Backend API**
 * 
 * @function getAppStatus
 * @description Asynchronously retrieves the backend status to verify API connectivity.
 * Uses the pre-configured API instance and handles errors gracefully to prevent
 * application crashes when the backend is unavailable.
 * 
 * @returns {Promise<string>} A promise that resolves to the status message from the backend
 * @throws {Error} When network request fails (handled internally with default message)
 * 
 * @example
 * // Usage in React components with useEffect:
 * import { getAppStatus } from './statusService';
 * 
 * useEffect(() => {
 *   const checkStatus = async () => {
 *     try {
 *       const status = await getAppStatus();
 *       setStatusMessage(status);
 *     } catch (error) {
 *       setStatusMessage('Backend unavailable');
 *     }
 *   };
 *   
 *   checkStatus();
 * }, []);
 * 
 * @example
 * // Direct usage:
 * getAppStatus()
 *   .then(status => console.log(`Backend status: ${status}`))
 *   .catch(error => console.error('Status check failed'));
 */
export const getAppStatus = async () => {
  try {
    // Note: It uses the relative path "/status" because the base URL
    // "http://localhost:8080/api" is a;ready configured in "api.js".
    const response = await api.get("/status");
    return response.data; // Axios wraps the response, the actual data is in ".data".
  } catch (error) {
    console.error("Error fetching application status: ", error);
    return "Status check failed on Herbarium Backend!";
  }
};

// I could then call this in a Component's "useEffect" hook:
// The commented code below simply serves as a useful "code snippet"
// for developers to understand how to properly call and integrate
// the exported "getAppStatus" function into a standard React Component
// Workflow. (e.g., see "StatusChecker.jsx")

/*
useEffect(() => {
    getAppStatus().then(setStatusMessage);
}, []);
*/
