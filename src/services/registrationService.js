// src/services/registrationService.js
/**
 * <b>Registration Service for User Registration Operations</b>
 * @module services/registrationService
 */

import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

/**
 * <b>Service for handling User Registration Operations</b>
 */
class RegistrationService {
  /**
   * <b>Register a new user with the provided credentials</b>
   *
   * @param {string} email - User's email address
   * @param {string} password - User's password (will be "Base64" encoded)
   * @param {string} confirmPassword - Password confirmation (will be "Based64" encoded)
   * @returns {Promise<Object>} Registration response data
   * @throws {Error} If registration fails
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

export default new RegistrationService();
