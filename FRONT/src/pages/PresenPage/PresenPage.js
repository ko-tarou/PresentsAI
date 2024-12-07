import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateをインポート
import { ImageContext } from '../ImageContext';
import './PresenPage.css'; // 既存のCSSファイルをインポート

const PresenPage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false); // 全画面表示状態
  const [showTaskbar, setShowTaskbar] = useState(false);   // タスクバー表示状態
  const slideRef = useRef(null);                           // スライド要素の参照
  const taskbarHeight = 50;                                // タスクバーの高さ
  const navigate = useNavigate();                          // navigateを呼び出す
  const { imageData } = useContext(ImageContext);

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

  // ページマウント時に全画面表示を開始
  useEffect(() => {
    toggleSlideFullscreen(); // ページが表示されたら全画面モードを開始
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

  // 全画面表示を終了する関数
  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen(); // 全画面モードを終了
    }
  };

  // タスク1をクリックしたときに新しいブラウザウィンドウを開くと同時に現在のウィンドウを/viewerに遷移する関数
  const openNewWindowAndNavigate = () => {
    // ディスプレイのサイズを取得
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    // 新しいウィンドウをフルスクリーンサイズで開く
    const newWindow = window.open(
      '/presenter',
      '_blank',
      `toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=${screenWidth},height=${screenHeight},top=0,left=0`
    );

    // 新しいウィンドウが開いた場合、focusを設定
    if (newWindow) {
      newWindow.focus();
    } else {
      alert('ポップアップブロックが有効です。ポップアップを許可してください。');
    }

    // 現在のウィンドウを /viewer に遷移
    navigate('/viewer');
  };

  return (
    <div className="presen-container">
      <button onClick={toggleSlideFullscreen} className="fullscreen-button">
        {isFullscreen ? '全画面表示を終了' : 'スライド全画面表示'}
      </button>
      <div className="slide-container">
        <div ref={slideRef} className={`slide ${isFullscreen ? 'fullscreen' : ''}`}>
          {/* <img src="/img/169.png" alt="プレゼンスライド" /> */}
		    {imageData ? (
            <img src={imageData} alt="プレゼンスライド"/>
          ) : (
            <p>画像データがありません。</p>
          )}
          {isFullscreen && (
            <div className={`taskbar ${showTaskbar ? 'taskbar-visible' : 'taskbar-hidden'}`}>
              <div className="taskbar-item">全画面表示を終了</div>
              <div className="taskbar-item" onClick={openNewWindowAndNavigate}>
                発表者モード 
              </div>
              <div className="taskbar-item" onClick={exitFullscreen}>
                <img
                  src="/img/fullscreen-exit.svg"
                  style={{ width: '30px', cursor: 'pointer', marginLeft: '-40px' }}
                  alt="Exit Fullscreen"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PresenPage;
