import React, { useState, useEffect, useRef } from 'react';
import './PresenPage.css';
const PresenPage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false); // 全画面表示状態
  const [showTaskbar, setShowTaskbar] = useState(false);   // タスクバー表示状態
  const slideRef = useRef(null);                           // スライド要素の参照
  const taskbarHeight = 50;                                // タスクバーの高さ
  // スライドを全画面表示にする関数
  const toggleSlideFullscreen = () => {
    if (slideRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen(); // 全画面モードを終了
      } else {
        slideRef.current.requestFullscreen(); // スライド要素を全画面表示
      }
    }
  };
  // 全画面状態の変更を監視
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);
  // タスクバーの表示・非表示を制御
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isFullscreen && slideRef.current) {
        const rect = slideRef.current.getBoundingClientRect();
        if (event.clientY >= rect.bottom - taskbarHeight) {
          setShowTaskbar(true); // スライドの下部にマウスがある場合タスクバーを表示
        } else {
          setShowTaskbar(false); // それ以外の場合は非表示
        }
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isFullscreen]);
  return (
    <div className="presen-container">
      <h1>プレゼンテーション画面</h1>
      {/* 全画面切り替えボタン */}
      <button onClick={toggleSlideFullscreen} className="fullscreen-button">
        {isFullscreen ? '全画面表示を終了' : 'スライド全画面表示'}
      </button>
      {/* スライド */}
      <div className="slide-container">
        <div
          ref={slideRef}
          className={`slide ${isFullscreen ? 'fullscreen' : ''}`}
        >
          <img src="your-slide-image.jpg" alt="プレゼンスライド" />
          {/* タスクバー（スライド内に配置） */}
          {isFullscreen && (
            <div
              className={`taskbar ${
                showTaskbar ? 'taskbar-visible' : 'taskbar-hidden'
              }`}
            >
              <div className="taskbar-item">スタート</div>
              <div className="taskbar-item">タスク1</div>
              <div className="taskbar-item">タスク2</div>
              <div className="taskbar-item">通知</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default PresenPage;