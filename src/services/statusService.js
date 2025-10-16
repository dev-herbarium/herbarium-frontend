// src/services/statusService.js

//import { useEffect } from "react";
import api from "./api";

// (!) This file is for testing purposes only!
// It is used to test the "Services Setup" (Axios installation & configuration)
// to be able to fetch data from my backend.
// (e.g., getting the status from my "/api/status" endpoint)

// TODO: This file, and likely the folder containing it (utils), should be deleted in the future.

/**
 * @function getAppStatus
 * @description <b> Fetches the application status from the Herbarium Backend. </b>
 * @returns {Promise<string>} The status message from the Backend.
 * @example
 * // Usage in a React Component's "useEffect" hook:
 * import { getAppStatus } from './statusService';
 * 
 * const [status, setStatus] = useState('Loading...');
 * useEffect(() => {
 *    getAppStatus()
 *        .then(message => setStatus(message))
 *        .catch(error => setStatus("Connection Failed"));
 * }, []);
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
