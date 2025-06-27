import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import CharacterCards from './components/CharacterCards';
import StoryCards from './components/StoryCards';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/characters" element={<CharacterCards />} />
          <Route path="/stories" element={<StoryCards />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
