import React, { useState, useEffect } from 'react';
import './PresenPage.css';

const PresenPage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTaskbar, setShowTaskbar] = useState(false);
  const taskbarHeight = 50; // タスクバーの高さ

  // 全画面表示を切り替える関数
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  // `fullscreenchange` イベントリスナーで全画面モードを監視
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // マウスの位置によってタスクバーの表示・非表示を切り替え
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (event.clientY >= window.innerHeight - taskbarHeight) {
        setShowTaskbar(true);
      } else {
        setShowTaskbar(false);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="presen-container">
      <h1>プレゼンテーション画面</h1>
      <button onClick={toggleFullscreen} className="fullscreen-button">
        {isFullscreen ? '全画面表示を終了' : '全画面表示'}
      </button>

      {isFullscreen && (
        <div className={`taskbar ${showTaskbar ? 'taskbar-visible' : 'taskbar-hidden'}`}>
          <div className="taskbar-item">スタート</div>
          <div className="taskbar-item">タスク1</div>
          <div className="taskbar-item">タスク2</div>
          <div className="taskbar-item">通知</div>
        </div>
      )}
    </div>
  );
};

export default PresenPage;
