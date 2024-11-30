import "./App.css"
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import SlideView from "./pages/SlideView/SlideView.js";
import React, { useState } from "react";

const Header = () => {
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    return (
      <header>
        <nav>
          <Link to="/">ホーム</Link>
          <Link to="/project">プロジェクト</Link>
          <Link to="/slide">スライド</Link>
          <Link to="/test">実験</Link>
          {['/', '/slide'].includes(location.pathname) && (
            <div className="search-container">
              <input
                type="text"
                placeholder="検索..."
                className="search-field"
              />
              <button className="search-button">検索</button>
            </div>
          )}
        </nav>
        <button className="circle-button" onClick={openModal}>?</button>
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      </header>
    );
  };

function App() {
    return (
        <Router>
            <Header />
             <Routes>
                <Route path="/" element={<Toppage />} />
                <Route path="/slideview" element={<SlideView />} />
            </Routes>
        </Router>
    );
}
export default App;
