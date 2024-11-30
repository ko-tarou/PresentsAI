import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css'; // スタイル用（存在しない場合は削除してもOK）
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
