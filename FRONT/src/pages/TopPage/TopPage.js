import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopPage.css'

function TopPage() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <header className="header">
        <div className="header-section left"></div>
        <div className="header-section center"></div>
        <button className="header-section right">?</button>
      </header>
      <main className="main">
        <h1 className="title">PresentsAI</h1>
        <div className="buttons">
          <button className="button" onClick={() => navigate('/slideview')}>
            作ったスライドを見る
          </button>
          <button className="button" onClick={() => navigate('/slidepage/')}>
            新規作成 
          </button>
        </div>
      </main>
    </div>
  );
}

export default TopPage;