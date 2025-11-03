// src/pages/Home/Home.jsx

import { useState } from "react";
import RegistrationForm from "../../components/Registration/RegistrationForm";
import './Home.css';

/**
 * <b>Home Page Component</b>
 * 
 * @function Home
 * @description <b>The landing page for the application.</b>
 * @returns {JSX.Element} The Home page content.
 * @component
 */
function Home() {
  const [showRegistration, setShowRegistration] = useState(false);

  const buttonClass = `home__button ${ showRegistration ? "home__button--active" : "" }`;

  return (
    <div className="home" data-testid="home-page">
      <h1 className="home__title">Welcome to Herbarium! 🌱</h1>
      <p>Start exploring plants and managing your recipes.</p>

      <button 
        className={buttonClass} 
        onClick={() => setShowRegistration(!showRegistration)}
        >
          {showRegistration ? "Hide Registration" : "Register User"}
      </button>

      {showRegistration && <RegistrationForm />}
    </div>
  );
}

export default Home;
