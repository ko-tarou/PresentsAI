import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import TopPage from './pages/TopPage/TopPage.js';
import SlideView from './pages/SlideView/SlideView.js';
import SlidePage from './pages/SlidePage/SlidePage.js';
import PresenPage from './pages/PresenPage/PresenPage.js';
import ButtonHint from './components/button/ButtonHint/ButtonHint.js';
import AnalysisPage from './pages/AnalysisPage/AnalysisPage.js';

const Header = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header>
      <nav>
        <Link to="/">TopPage</Link>
        <Link to="/slideview">SlideView</Link>
        <Link to="/presen">Presen</Link>
      </nav>
      {['/slideview'].includes(location.pathname) && (
        <div className="search-container">
          <input type="text" placeholder="検索…" className="search-field" />
          <button className="search-button">検索</button>
        </div>
      )}
      <ButtonHint isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />
    </header>
  );
};

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/slideview" element={<SlideView />} />
        <Route path="/slidepage" element={<SlidePage />} />
        <Route path="/presen" element={<PresenPage />} />
        <Route path="/Ana" element={<AnalysisPage />} />
      </Routes>
    </Router>
  );
}

export default App;
