// src/services/registrationService.js

import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

/**
 * **Registration Service** - Handles user registration API operations
 * 
 * @module services/registrationService
 * @class RegistrationService
 * @description Service class that encapsulates all user registration operations
 * including credential encoding and API communication with the backend.
 * Provides methods for registering new users with proper password encoding.
 * 
 * @example
 * // Usage in React components:
 * import registrationService from './registrationService';
 * 
 * const result = await registrationService.registerUser(
 *   'user@example.com',
 *   'password123',
 *   'password123'
 * );
 * 
 * @see api
 */
class RegistrationService {
  /**
   * **Registers a new user with encoded credentials**
   * 
   * @method registerUser
   * @description Registers a new user by sending encoded credentials to the backend API.
   * Automatically encodes passwords to Base64 format before transmission and handles
   * both network errors and backend validation errors gracefully.
   * 
   * @param {string} email - User's email address for registration
   * @param {string} password - User's plain text password (will be Base64 encoded)
   * @param {string} confirmPassword - Password confirmation (will be Base64 encoded)
   * @returns {Promise<Object>} Registration response data containing user ID and message
   * @throws {Error} When registration fails due to network issues or backend validation
   * 
   * @example
   * try {
   *   const result = await registrationService.registerUser(
   *     'test@example.com',
   *     'myPassword123',
   *     'myPassword123'
   *   );
   *   console.log(`User registered with ID: ${result.userId}`);
   * } catch (error) {
   *   console.error(`Registration failed: ${error.message}`);
   * }
   */
  async registerUser(email, password, confirmPassword) {
    try {
      const response = await axios.post(`${API_BASE_URL}/v1/register`, {
        email,
        password: btoa(password),
        confirmPassword: btoa(confirmPassword),
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message || "Registration failed");
      }
      throw new Error("Network error: Unable to connect to server");
    }
  }
}

/**
 * **Singleton instance of RegistrationService**
 * 
 * @constant {RegistrationService}
 * @default
 */
export default new RegistrationService();
