// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import StatusChecker from "./components/StatusChecker/StatusChecker";
import Home from "./pages/Home/Home"; // Assuming you created src/pages/Home.jsx

/**
 * **Main Application Component** - Root component for the Herbarium frontend
 * 
 * @component
 * @function App
 * @description The root component that sets up routing and application structure.
 * Renders the main navigation, status checker, and route configurations for
 * the entire application.
 * 
 * @example
 * // Rendered by main.jsx as the application root
 * return <App />
 * 
 * @returns {JSX.Element} The complete application with routing structure
 * 
 * @see StatusChecker
 * @see Home
 * @see BrowserRouter
 */
function App() {
  return (
    <>
      {/* The StatusChecker remains outside the Routes to be always visible
        (e.g., in a Header/Footer) 
      */}
      <StatusChecker />

      {/* Navigation Links for Testing */}
      <nav>
        <Link to="/">Home</Link> |<Link to="/about">About</Link>
      </nav>

      <Routes>
        {/* Route 1: The main landing page. 
          Element points to the component to render.
        */}
        <Route path="/" element={<Home />} />

        {/* Route 2: A simple placeholder route.
          We can test navigation by going here.
        */}
        <Route path="/about" element={<h2>About Page (Future Content)</h2>} />

        {/* Route 3: The 404/Not Found route. Uses '*' wildcard.
         */}
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
