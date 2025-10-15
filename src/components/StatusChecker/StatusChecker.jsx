// src/components/StatusChecker/StatusChecker.jsx

import React, { useState, useEffect } from "react";
import { getAppStatus } from "../../services/statusService";

/**
 * @function StatusChecker
 * @description <b> Fetches and displays the status of the Herbarium Backend API. </b>
 * @returns {JSX.Elemet} the component to display the status.
 */
function StatusChecker() {
  const [status, setStatus] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Call the Service function inside useEffect
    getAppStatus()
      .then((message) => {
        // 2. Update state with the returned status message
        setStatus(message);
      })
      .catch((error) => {
        // 3. Handle errors gracefully
        setStatus("Error fetching status.");
        console.log(error);
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
