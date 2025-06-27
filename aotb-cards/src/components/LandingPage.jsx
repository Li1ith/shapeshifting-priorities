import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container">
      <h1 className="title">AotB Cards</h1>
      <p className="subtitle">Choose a card type to view</p>

      <div className="card-options">
        <Link to="/characters" className="card-option">
          <h2>Character Cards</h2>
          <p>View and print character cards for your game</p>
        </Link>

        <Link to="/stories" className="card-option">
          <h2>Story Cards</h2>
          <p>View and print story cards for your game</p>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
