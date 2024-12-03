import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopPage.css'

function TopPage() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <main className="main">
        <h1 className="title">PresentsAI</h1>
        <div className="buttons">
          <button className="button" onClick={() => navigate('/slideview')}>
            作ったスライドを見る
          </button>
          <button className="button" onClick={() => navigate('/slidepage/')}>
            スライドを作成
          </button>
          <button className="button" onClick={() => navigate('/presen')}>
            発表
          </button>
        </div>
      </main>
    </div>
  );
}

export default TopPage;