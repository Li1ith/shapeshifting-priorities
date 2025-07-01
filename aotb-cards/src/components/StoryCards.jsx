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

  const parseActionText = (text) => {
    if (!text) return [];
    return text.split('|');
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
            <div className="story-subtitle">{story.Area}</div>
            <div className="story-subtitle">{story.Title}</div>
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
    return (
      <div className="story-back">
        <div className="action-check">
          Roll your dice and add your <span>{acronym}</span> modifier
        </div>
        <hr className="story-divider" />
        <div className="results">
          <div className="result-cell">
            <div className="result-item">
              <div className="result-label" style={{ backgroundColor: 'rgba(183,65,65,0.7)' }}>
                Obstacles <strong>&lt; {story.Fail}</strong>
              </div>
              <div className="result-text">{story.FailText}</div>
              {parseActionText(story.FailAction).map((action, idx) => (
                <div key={'fail-' + idx} className="result-value">
                  {action}
                </div>
              ))}
            </div>
            <div className="story-divider-vertical" />
          </div>
          <div className="result-cell">
            <div className="result-item">
              <div className="result-label" style={{ backgroundColor: 'rgba(255,206,96,0.87)' }}>
                Progress <strong>&lt; {story.Partial}</strong>
              </div>
              <div className="result-text">{story.PartialText}</div>
              {parseActionText(story.PartialAction).map((action, idx) => (
                <div key={'partial-' + idx} className="result-value">
                  {action}
                </div>
              ))}
            </div>
            <div className="story-divider-vertical" />
          </div>
          <div className="result-cell">
            <div className="result-item">
              <div className="result-label" style={{ backgroundColor: 'rgba(201,252,83,0.7)' }}>
                Victory <strong>&gt;= {story.Success}</strong>
              </div>
              <div className="result-text">{story.SuccessText}</div>
              {parseActionText(story.SuccessAction).map((action, idx) => (
                <div key={'success-' + idx} className="result-value">
                  {action}
                </div>
              ))}
            </div>
          </div>
          <img
            className="story-back-image-l"
            src={`${process.env.PUBLIC_URL}/Corners/Corner_${story.Phase}.png`}
            alt=""
          />
        </div>
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
