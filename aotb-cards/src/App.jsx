import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import CharacterCards from './components/CharacterCards';
import StoryCards from './components/StoryCards';
import Wrappers from './components/Wrappers';
import Maps from './components/Maps';
import Assets from './components/Assets';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/characters" element={<CharacterCards />} />
          <Route path="/stories" element={<StoryCards />} />
          <Route path="/wrappers" element={<Wrappers />} />
          <Route path="/maps" element={<Maps />} />
          <Route path="/assets" element={<Assets />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
