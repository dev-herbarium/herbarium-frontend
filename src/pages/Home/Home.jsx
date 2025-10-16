// src/pages/Home/Home.jsx

import React from 'react';

/**
 * @function Home
 * @description <b> The landing page for the application. </b>
 * @returns {JSX.Element} The Home page content.
 */
function Home() {
    return (
        <div data-testid="home-page">
            <h1>Welcome to Herbarium! 🌱</h1>
            <p>Start exploring plants and managing your recipes.</p>
        </div>
    )
}

export default Home;