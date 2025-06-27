import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/StoryCards.css';

// Import story data
import storyData from '../data/stories.json';

const StoryCards = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // Set the story data
    setStories(storyData);
  }, []);

  /**
   * Helper functions to parse text content for the cards.
   */

  // Extracts the 3-letter acronym from the action text (e.g., "Str Check" -> "STR").
  const getActionAcronym = (actionText) => {
    if (!actionText) return "";
    const match = actionText.match(/\b([a-zA-Z]{3})\b/);
    return match ? match[1].toUpperCase() : "";
  };

  // Extracts the result from the text (bracketed content or 'B' for Blocked).
  const getResult = (text) => {
    if (!text) return "";
    const bracketMatch = text.match(/\[(.*?)\]|\((.*?)\)/);
    if (bracketMatch) {
      return (bracketMatch[1] || bracketMatch[2] || "").trim();
    }
    return "";
  };

  // Removes the result part from the text to clean it up for display.
  const processText = (text) => {
    if (!text) return "";
    return text
      .replace(/\s*B\s*$/, "")
      .replace(/\s*\[.*?\]\s*|\s*\(.*?\)\s*/, "")
      .trim();
  };

  /**
   * Reusable story card front component.
   * @param {object} card - The story data object.
   * @returns {JSX.Element} - The JSX for a single card front.
   */
  const StoryCardFront = ({ card }) => {
    return (
      <div className="card">
        <div className="card-pane">
          <div className="card-header">
            <div className="card-title">{card.Area}</div>
            <div className="card-title">{card.Title}</div>
          </div>
          <hr className="card-divider" />
          <div className="notes-section">
            Notes:
            <hr className="card-divider" />
            <div className="notes-spacer"></div>
            <hr className="card-divider" />
            <div className="notes-spacer"></div>
            <hr className="card-divider" />
            <div className="notes-spacer"></div>
            <hr className="card-divider" />
            <div className="notes-spacer"></div>
            <hr className="card-divider" />
            <div className="notes-spacer"></div>
            <hr className="card-divider" />
            <div className="notes-spacer"></div>
            <hr className="card-divider" />
            <div className="notes-spacer"></div>
          </div>
        </div>
        <div className="card-pane">
          <img
            className="card-border-image"
            src={process.env.PUBLIC_URL + '/border.jpeg'}
            alt=""
          />
          <div className="card-title">{card.Title}</div>
          <hr className="card-divider" />
          <div className="card-content">
            <div className="story-section">{card.Story}</div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Reusable story card back component.
   * @param {object} card - The story data object.
   * @returns {JSX.Element} - The JSX for a single card back.
   */
  const StoryCardBack = ({ card }) => {
    const acronym = getActionAcronym(card.Action);
    const failText = processText(card.fail);
    const failResult = getResult(card.fail);
    const partialText = processText(card.partial);
    const partialResult = getResult(card.partial);
    const successText = processText(card.success);
    const successResult = getResult(card.success);

    return (
      <div className="card-back">
        <div className="action-check">
          Action: <span>{acronym}</span>
        </div>
        <hr className="card-divider" />
        <table className="results-table">
          <tbody>
            <tr>
              <td>Fail</td>
              <td>{failText}</td>
              <td>{failResult}</td>
            </tr>
            <tr>
              <td>Partial</td>
              <td>{partialText}</td>
              <td>{partialResult}</td>
            </tr>
            <tr>
              <td>Success</td>
              <td>{successText}</td>
              <td>{successResult}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  /**
   * Renders all cards into pages.
   */
  const renderCards = () => {
    const cardsPerPage = 3;
    let allPages = [];

    for (let i = 0; i < stories.length; i += cardsPerPage) {
      const pageChunk = stories.slice(i, i + cardsPerPage);

      // Create the front-side of the cards
      const frontCards = pageChunk.map((card, index) => (
        <StoryCardFront key={`front-${i + index}`} card={card} />
      ));
      allPages.push(
        <div className="page" key={`front-page-${i / cardsPerPage}`}>
          {frontCards}
        </div>
      );

      // Create the back-side of the cards
      const backCards = pageChunk.map((card, index) => (
        <StoryCardBack key={`back-${i + index}`} card={card} />
      ));
      allPages.push(
        <div className="page" key={`back-page-${i / cardsPerPage}`}>
          {backCards}
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
      <h1 className="title">Story Cards</h1>
      <div id="card-container">{renderCards()}</div>
    </div>
  );
};

export default StoryCards;
