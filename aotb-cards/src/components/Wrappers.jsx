import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Wrappers.css';
import storyData from '../data/stories.json';

const Wrappers = () => {
  const [wrappers, setWrappers] = useState([]);

  useEffect(() => {
    // Create a set of areas and the phase number from the story data
    const areas = new Set();
    storyData.forEach((story) => {
      if (!areas.has(story.Area)) {
        areas.add(story.Area);
      }
    });

    // Convert areas to array and create wrapper objects
    const wrapperObjects = Array.from(areas).map((area) => {
      const story = storyData.find((s) => s.Area === area);
      return {
        text: area,
        phase: story.Phase || 1,
      };
    });

    // Sort wrappers by phase
    const sortedWrappers = wrapperObjects.sort((a, b) => a.phase - b.phase);
    setWrappers(sortedWrappers);
  }, []);

  const WrapperCard = ({ phase, text }) => {
    const [area, location] = text.split('-').map((part) => part.trim());

    return (
      <div className="wrapper">
        <img
          className="wrapper-back-image"
          src={process.env.PUBLIC_URL + `/Corners/Corner_${phase}.png`}
          alt=""
        />
        <div className="wrapper-title">{location}</div>
        <div className="wrapper-subtitle">{area}</div>
      </div>
    );
  };

  const renderWrappers = () => {
    const wrappersPerPage = 3;
    let allPages = [];

    for (let i = 0; i < wrappers.length; i += wrappersPerPage) {
      const pageChunk = wrappers.slice(i, i + wrappersPerPage);
      const pageWrappers = pageChunk.map((wrapper, index) => (
        <WrapperCard key={`wrapper-${i + index}`} phase={wrapper.phase} text={wrapper.text} />
      ));

      allPages.push(
        <div className="page" key={`wrapper-page-${i / wrappersPerPage}`}>
          {pageWrappers}
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
        <h1 className="title">Wrappers</h1>
      </div>
      <div id="wrapper-container">{renderWrappers()}</div>
    </>
  );
};

export default Wrappers;
