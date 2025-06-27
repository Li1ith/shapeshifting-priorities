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
   * Helper functions to parse text content for the stories.
   */

  // Extracts the 3-letter acronym from the action text (e.g., "Str Check" -> "STR").
  const getActionAcronym = (actionText) => {
    if (!actionText) return '';
    const match = actionText.match(/\b([a-zA-Z]{3})\b/);
    return match ? match[1].toUpperCase() : '';
  };

  // Extracts the result from the text (bracketed content or 'B' for Blocked).
  const getResult = (text) => {
    if (!text) return '';
    const bracketMatch = text.match(/\[(.*?)\]|\((.*?)\)/);
    if (bracketMatch) {
      return (bracketMatch[1] || bracketMatch[2] || '').trim();
    }
    return '';
  };

  // Removes the result part from the text to clean it up for display.
  const processText = (text) => {
    if (!text) return '';
    return text
      .replace(/\s*B\s*$/, '')
      .replace(/\s*\[.*?\]\s*|\s*\(.*?\)\s*/, '')
      .trim();
  };

  /**
   * Reusable story front component.
   * @param {object} story - The story data object.
   * @returns {JSX.Element} - The JSX for a single story front.
   */
  const StoryFront = ({ story }) => {
    return (
      <div className="story">
        <div className="story-front-left">
          <div className="story-header">
            <div className="story-title">{story.Area}</div>
            <div className="story-title">{story.Title}</div>
          </div>
          <div className="notes-section">
            Notes:
            <hr className="story-divider" />
            <div className="notes-spacer"></div>
            <hr className="story-divider" />
            <div className="notes-spacer"></div>
            <hr className="story-divider" />
            <div className="notes-spacer"></div>
            <hr className="story-divider" />
            <div className="notes-spacer"></div>
            <hr className="story-divider" />
            <div className="notes-spacer"></div>
            <hr className="story-divider" />
            <div className="notes-spacer"></div>
          </div>
        </div>
        <div className="story-front-right">
          <img className="story-border-image" src={process.env.PUBLIC_URL + '/border.png'} alt="" />
          <div className="story-border-content">
            <div className="story-title">{story.Title}</div>
            <hr className="story-divider" />
            <div className="story-content">
              <div className="story-section">{story.Story}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Reusable story back component.
   * @param {object} story - The story data object.
   * @returns {JSX.Element} - The JSX for a single story back.
   */
  const StoryBack = ({ story }) => {
    const acronym = getActionAcronym(story.Action);
    const failText = processText(story.fail);
    const failResult = getResult(story.fail);
    const partialText = processText(story.partial);
    const partialResult = getResult(story.partial);
    const successText = processText(story.success);
    const successResult = getResult(story.success);

    return (
      <div className="story-back">
        <div className="action-check">
          Roll your dice and add your <span>{acronym}</span> modifier
        </div>
        <hr className="story-divider" />
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
   * Renders all stories into pages.
   */
  const renderStories = () => {
    const storiesPerPage = 3;
    let allPages = [];

    for (let i = 0; i < stories.length; i += storiesPerPage) {
      const pageChunk = stories.slice(i, i + storiesPerPage);

      // Create the front-side of the stories
      const frontStories = pageChunk.map((story, index) => (
        <StoryFront key={`front-${i + index}`} story={story} />
      ));
      allPages.push(
        <div className="page" key={`front-page-${i / storiesPerPage}`}>
          {frontStories}
        </div>
      );

      // Create the back-side of the stories
      const backStories = pageChunk.map((story, index) => (
        <StoryBack key={`back-${i + index}`} story={story} />
      ));
      allPages.push(
        <div className="page" key={`back-page-${i / storiesPerPage}`}>
          {backStories}
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
        <h1 className="title">Story Cards</h1>
      </div>
      <div id="story-container">{renderStories()}</div>
    </>
  );
};

export default StoryCards;
