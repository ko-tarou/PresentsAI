import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ImageProvider } from './pages/ImageContext.js';
import TopPage from './pages/TopPage/TopPage.js';
import SlideView from './pages/SlideView/SlideView.js';
import SlidePage from './pages/SlidePage/SlidePage.js';
import PresenPage from './pages/PresenPage/PresenPage.js';
import ButtonHint from './components/button/ButtonHint/ButtonHint.js';
import AnalysisPage from './pages/AnalysisPage/AnalysisPage.js';
import ButtonSave from './components/button/ButtonSave/ButtonSave.js';
import WaitPage from './pages/WaitPage/WaitPage.js';
import Audio from './pages/audio/AudioRecognition.js';
import PresenterPage from './pages/PresenterPage/PresenterPage.js'; 
import ViewerPage from './pages/ViewerPage/ViewerPage.js';

const Header = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);  

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const hiddenPaths = ['/presenter', '/viewer'];

  // Header を特定のパスで非表示
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <header>
      <nav>
        <Link to="/">TopPage</Link>
        <Link to="/slideview">SlideView</Link>
      </nav>
      {['/slideview'].includes(location.pathname) && (
        <div className="search-container">
          <input type="text" placeholder="検索…" className="search-field" />
          <button className="search-button">検索</button>
        </div>
      )}
      {['/slidepage'].includes(location.pathname) && (
        <ButtonSave />
      )}
      
      <ButtonHint isModalOpen={isModalOpen} openModal={openModal} closeModal={closeModal} />
    </header>
  );
};

function App() {
  return (
    <ImageProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/slideview" element={<SlideView />} />
          <Route path="/slidepage" element={<SlidePage />} />
          <Route path="/presen" element={<PresenPage />} />
          <Route path="/Ana" element={<AnalysisPage />} />
          <Route path="/Wait" element={<WaitPage />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/presenter" element={<PresenterPage />} />
          <Route path="/viewer" element={<ViewerPage />} />
          {/* デフォルトルートを追加 */}
          <Route path="*" element={<TopPage />} />
        </Routes>
      </Router>
    </ImageProvider>
  );
}

export default App;
