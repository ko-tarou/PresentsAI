import React, { useRef } from 'react';
import './PresenterPage.css'; // 必要に応じてCSSでスタイルを調整

const PresenterPage = () => {
  const imageRef = useRef(null); // 画像の参照

  // ページを画像だけにするために画像以外の要素は削除
  return (
    <div className="presenter-container">
      <img
        ref={imageRef}
        src="/img/169.png" // プレゼン用の画像を指定
        alt="プレゼン画像"
        className="presenter-image"
      />
    </div>
  );
};

export default PresenterPage;
