import React from 'react';
import PresenPage from '../PresenPage/PresenPage.js'; // 新しいパスでインポート

const PresenterPage = () => {
  return (
    <div>
      <h1>JUST DO IT</h1>
      <PresenPage /> {/* PresenPageコンポーネントをここに埋め込む */}
    </div>
  );
};

export default PresenterPage;
