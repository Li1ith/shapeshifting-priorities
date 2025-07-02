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
              <h2 className="card-role">Movement: {card.Movement} squares</h2>
            </div>
            <div className="section">
              <div className="panel">
                <div className="top-stats">
                  <div>
                    <div className="stat-label">Hit Points</div>
                    <div className="stat-value">{card.Health}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div
                      style={{
                        width: '16px',
                        height: '100%',
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span style={{ color: '#ccc' }}>✕</span>
                    </div>
                    <div
                      style={{
                        width: '16px',
                        backgroundColor: 'white',
                        height: '100%',
                        border: '1px solid #ccc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <span style={{ color: '#ccc' }}>✕</span>
                    </div>
                  </div>
                </div>
                <table className="stats-table">
                  <tbody>{statsRows}</tbody>
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
      const pageCards = pageChunk.map((card, index) => <CharacterCard key={index} card={card} />);
      allPages.push(
        <div className="page" key={i / cardsPerPage}>
          {pageCards}
        </div>
      );
    }

    return allPages;
  };

  return (
    <>
      <div className="no-print">
        <Link to="/" className="back-link">
          Back to Home
        </Link>
        <h1 className="title">Character Cards</h1>
      </div>
      <div id="card-container">{renderCards()}</div>
    </>
  );
};

export default CharacterCards;
