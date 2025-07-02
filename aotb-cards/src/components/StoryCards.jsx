import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/StoryCards.css';

// Import story data
import storyData from '../data/stories.json';

const StoryCards = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    // Sort story data alphabetically by Area
    const sortedStories = [...storyData].sort((a, b) => a.Area.localeCompare(b.Area));

    setStories(sortedStories);
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
    if (!text) return ['Completed'];
    const actions = text.split('|');
    if (actions.length === 1 && actions[0].trim() === '') {
      return ['Completed'];
    }
    const trimmedActions = actions.map((action) => action.trim()).filter((action) => action !== '');
    if (!trimmedActions.some((action) => action.includes('Blocked'))) {
      trimmedActions.push('Completed');
    }
    return trimmedActions;
  };

  const getOutcome = (story) => {
    const outcomes = [story.FailAction, story.PartialAction, story.SuccessAction];
    for (const outcome of outcomes) {
      if (!outcome) continue;
      if (outcome.toLowerCase().includes('damage')) {
        return <div style={{ color: 'red' }}>Damage</div>;
      } else if (outcome.toLowerCase().includes('item')) {
        return <div style={{ color: 'purple' }}>Item</div>;
      }
    }
    return <div style={{ color: 'blue' }}>Clue</div>;
  };

  /**
   * Reusable story front component.
   * @param {object} story - The story data object.
   * @returns {JSX.Element} - The JSX for a single story front.
   */
  const StoryFront = ({ story }) => {
    const acronym = getActionAcronym(story.Action);
    const out = getOutcome(story);
    return (
      <div className="story">
        <div className="story-front-left">
          <div className="story-header">
            <div className="story-title">{story.Area}</div>
          </div>
          <div className="notes-section">
            Notes:
            <hr className="notes-divider" />
            <div className="notes-spacer"></div>
            <hr className="notes-divider" />
            <div className="notes-spacer"></div>
            <hr className="notes-divider" />
            <div className="notes-spacer"></div>
            <hr className="notes-divider" />
            <div className="notes-spacer"></div>
            <hr className="notes-divider" />
            <div className="notes-spacer"></div>
          </div>
        </div>
        <div className="story-front-right">
          <img className="story-border-image" src={process.env.PUBLIC_URL + '/border.png'} alt="" />
          <div className="story-border-content">
            <div className="story-title">{story.Title}</div>
            <hr className="story-divider" />
            <div className="story-section">{story.Story}</div>
            <div className="story-outcome">
              {out}
              <div>Roll {acronym}</div>
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
                Obstacles ≤ {story.Fail}
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
                {story.Fail} &lt; Progress ≤ {story.Partial}
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
                {story.Success} &lt; Victory
              </div>
              <div className="result-text">{story.SuccessText}</div>
              {parseActionText(story.SuccessAction).map((action, idx) => (
                <div key={'success-' + idx} className="result-value">
                  {action}
                </div>
              ))}
            </div>
          </div>
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
        <button onClick={() => navigator.clipboard.writeText(JSON.stringify(stories, null, 2))}>
          Copy JSON
        </button>
      </div>
      <div id="story-container">{renderStories()}</div>
    </>
  );
};

export default StoryCards;
