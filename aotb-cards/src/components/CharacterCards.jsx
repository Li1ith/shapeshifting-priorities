import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/CharacterCards.css';

// Import character data
import characterData from '../data/characters.json';

const CharacterCards = () => {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Set the character data
    setCharacters(characterData);
  }, []);

  /**
   * Reusable character card component.
   * @param {object} card - The character data object.
   * @returns {JSX.Element} - The JSX for a single card.
   */
  const CharacterCard = ({ card }) => {
    const statsRows = card.Stats.map((stat, index) => (
      <tr key={index}>
        <td>{stat[0]}</td>
        <td>{stat[1]}</td>
      </tr>
    ));

    return (
      <div className="card">
        <div className="card-body">
          <div className="panel">
            <div className="description">{card.Description}</div>
            <div className="image-area"></div>
          </div>
          <div className="panel">
            <div className="card-header">
              <h2 className="card-role">{card.Role}</h2>
            </div>
            <div className="section">
              <div className="panel">
                <div className="top-stats">
                  <div>
                    <div className="stat-label">Hit Points</div>
                    <div className="stat-value">{card.Health}</div>
                  </div>
                  <div style={{ backgroundColor: '#fff' }}></div>
                </div>
                <table className="stats-table">
                  <tbody>
                    {statsRows}
                    <tr>
                      <td>Movement</td>
                      <td>{card.Movement}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="panel">
                <div className="items-header">Items</div>
                <div className="image-area"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Renders all cards into pages.
   */
  const renderCards = () => {
    const cardsPerPage = 3;
    let allPages = [];

    for (let i = 0; i < characters.length; i += cardsPerPage) {
      const pageChunk = characters.slice(i, i + cardsPerPage);
      const pageCards = pageChunk.map((card, index) => (
        <CharacterCard key={index} card={card} />
      ));
      allPages.push(
        <div className="page" key={i / cardsPerPage}>
          {pageCards}
        </div>
      );
    }

    return allPages;
  };

  return (
    <div>
      <Link to="/" className="back-link">
        Back to Home
      </Link>
      <h1 className="title">Character Cards</h1>
      <div id="card-container">{renderCards()}</div>
    </div>
  );
};

export default CharacterCards;
