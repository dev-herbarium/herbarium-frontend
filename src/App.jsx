// src/App.jsx

import StatusChecker from "./components/StatusChecker/StatusChecker";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <h1>🌱 Herbarium Frontend</h1>
        <p>A Full-Stack Web Application</p>
      </header>
      <StatusChecker /> {/* Render the "StatusChecker" Component */}
      <div className="card">
        <p>Testing the core service setup (Axios & Connectivity).</p>
      </div>
    </>
  );
}

export default App;
