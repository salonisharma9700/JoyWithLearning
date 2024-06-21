import React from 'react';
import '../cssfiles/style.css';

const Home = () => {
  return (
    <div className="container-fluid home-container">
      <div className="row">
        <img src="images/dyslexiafinal.jpg" alt="Background" className="home-background-image" />
        <div className="home-overlay-text">
          <p>Supporting</p>
          <p>Your Journey with</p>
          <p>Autism and Dyslexia</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
