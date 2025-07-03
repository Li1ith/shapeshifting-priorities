import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  // Function to get the public URL
  const getPublicUrl = (filename) => {
    return `${window.location.origin}/${filename}`;
  };
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

        <Link to="/wrappers" className="card-option">
          <h2>Wrapper Cards</h2>
          <p>View and print card wrappers for your game</p>
        </Link>

        <Link to="/maps" className="card-option">
          <h2>Maps</h2>
          <p>View and download maps for your game</p>
        </Link>

        <Link to="/assets" className="card-option">
          <h2>Game Assets</h2>
          <p>View and download kanban board and items for your game</p>
        </Link>
      </div>

      <img className="corner-image-left" src={getPublicUrl('Corners/Corner_6.png')} alt="" />
      <img className="corner-image-right" src={getPublicUrl('Corners/Corner_3.png')} alt="" />
    </div>
  );
};

export default LandingPage;
