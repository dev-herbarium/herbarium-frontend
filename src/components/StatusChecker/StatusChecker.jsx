// src/components/StatusChecker/StatusChecker.jsx

import React, { useState, useEffect } from "react";
import { getAppStatus } from "../../services/statusService";

/**
 * **Status Checker Component** - Monitors backend API connectivity
 * 
 * @component
 * @function StatusChecker
 * @description Fetches and displays the status of the Herbarium Backend API.
 * Manages loading, success, and failure states internally. Provides real-time
 * feedback about backend connectivity status.
 * 
 * @example
 * // Usage in App.jsx:
 * <StatusChecker />
 * 
 * @returns {JSX.Element} Component displaying current backend status with loading states
 * 
 * @state {string} status - Current status message from backend
 * @state {boolean} loading - Loading state during API call
 * 
 * @see getAppStatus
 * @see statusService
 * 
 * @effect {Function} useEffect - Fetches backend status on component mount
 */
function StatusChecker() {
  const [status, setStatus] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Call the Service function inside useEffect
    getAppStatus() // ASYNCHRONOUS CALL STARTS
      .then((message) => {
        // 2. Update state with the returned status message. State update happens LATER,
        // after the component has rendered its initial state.
        setStatus(message);
      })
      .catch((error) => {
        // 3. Handle errors gracefully
        setStatus("Error fetching status.", error);
        //console.log(error); // Warning: "Error: Network error"
        
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Empty dependency array ensures it runs only once on mount.

  return (
    <div data-testid="status-checker">
      <h3>Backend Status Check</h3>
      {loading ? (
        <p data-testid="status-loading">Checking connectivity...</p>
      ) : (
        <p data-testid="status-message">
          Status: <strong>{status}</strong>
        </p>
      )}
    </div>
  );
}

export default StatusChecker;
