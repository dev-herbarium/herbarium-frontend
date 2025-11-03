// src/pages/Home/Home.jsx

import { useState } from "react";
import RegistrationForm from "../../components/Registration/RegistrationForm";
import './Home.css';

/**
 * **Home Page Component** - Main landing page for the Herbarium application
 * 
 * @component
 * @function Home
 * @description The primary landing page that welcomes users and provides access
 * to user registration functionality. Manages the visibility state of the
 * registration form component.
 * 
 * @example
 * return (
 *   <Home />
 * )
 * 
 * @returns {JSX.Element} Rendered home page with registration toggle
 * @state {boolean} showRegistration - Controls visibility of registration form
 * @see RegistrationForm
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
