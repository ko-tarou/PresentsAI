import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import TopPage from './pages/TopPage/TopPage.js';
import SlideView from './pages/SlideView/SlideView.js';
import PresenPage from './pages/PresenPage/PresenPage.js';

const Header = () => {
  const location = useLocation();

  return ( // JSX を返す
    <header>
      <nav>
        <Link to="/">TopPage</Link>
        <Link to="/slideview">SlideView</Link>
        <Link to="/presen">Presen</Link>
      </nav>
      {['/', '/slideview'].includes(location.pathname) && (
        <div className="search-container">
          <input type="text" placeholder="検索…" className="search-field" />
          <button className="search-button">検索</button>
        </div>
      )}
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
        <Route path="/presen" element={<PresenPage />} />
      </Routes>
    </Router>
  );
}

export default App;
