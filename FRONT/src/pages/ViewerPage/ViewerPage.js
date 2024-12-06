import React, { useRef } from 'react';
import './ViewerPage.css'; // 必要に応じてCSSでスタイルを調整

const ViewerPage = () => {
  const imageRef = useRef(null); // 画像の参照

  // ページを画像だけにするために画像以外の要素は削除
  return (
    <div className="viewer-container">
      <img
        ref={imageRef}
        src="/img/169.png" // プレゼン用の画像を指定
        alt="プレゼン画像"
        className="viewer-image"
      />
    </div>
  );
};

export default ViewerPage;
