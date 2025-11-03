import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

/**
 * **Application Entry Point** - Renders the React application into the DOM
 * 
 * @module main
 * @description The main entry point that mounts the React application to the DOM.
 * Wraps the App component with necessary providers including React Router
 * and React StrictMode for development checks.
 * 
 * @example
 * // This file is the entry point specified in vite.config.js
 * 
 * @see App
 * @see BrowserRouter
 * @see StrictMode
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
