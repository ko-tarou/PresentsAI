import React, { useState, useRef } from 'react';
import './ViewerPage.css'; // ここでCSSをインポート

const ViewerPage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false); // 全画面表示状態
  const imageRef = useRef(null); // 画像の参照

  // 全画面表示を切り替える関数
  const toggleFullscreen = () => {
    if (isFullscreen) {
      // 全画面モードを終了
      document.exitFullscreen();
    } else {
      // 全画面表示
      if (imageRef.current) {
        imageRef.current.requestFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen); // 状態を更新
  };

  return (
    <div className={`viewer-container ${isFullscreen ? 'fullscreen' : ''}`}>
      <h1>プレゼンテーションビューア</h1>
      <button onClick={toggleFullscreen} className="fullscreen-button">
        {isFullscreen ? '全画面表示を終了' : '全画面表示'}
      </button>
      <div className="image-container">
        <img
          ref={imageRef}
          src="your-slide-image.jpg" // プレゼン用の画像を指定
          alt="プレゼン画像"
          className={`presentation-image ${isFullscreen ? 'fullscreen-image' : ''}`}
        />
      </div>
    </div>
  );
};

export default ViewerPage;
