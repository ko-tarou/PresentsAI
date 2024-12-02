import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopPage from './pages/TopPage/TopPage.js';
import SlideView from './pages/SlideView/SlideView.js';
import PresenPage from './pages/PresenPage/PresenPage.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TopPage />} />
        <Route path="/slideview" element={<SlideView />} />
        <Route path="/presen" element={<PresenPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;