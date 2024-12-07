import React, { useState, useEffect } from 'react';
import './ViewerPage.css'; // 必要に応じてCSSでスタイルを調整
import { ImageContext } from '../ImageContext';

const ViewerPage = () => {
  const [showTaskbar, setShowTaskbar] = useState(false); // タスクバー表示状態
  const taskbarHeight = 50; // タスクバーの高さ
  
  // タスクバーの表示・非表示を制御
  useEffect(() => {
    const handleMouseMove = (event) => {
      if (event.clientY >= window.innerHeight - taskbarHeight) {
        setShowTaskbar(true); // マウスが下部にある場合タスクバーを表示
      } else {
        setShowTaskbar(false); // 上に移動したら非表示
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // タスク1をクリックしたときの処理
  const openNewWindowAndNavigate = () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;

    const newWindow = window.open(
      '/presenter',
      '_blank',
      `toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=${screenWidth},height=${screenHeight},top=0,left=0`
    );

    if (newWindow) {
      newWindow.focus();
    } else {
      alert('ポップアップブロックが有効です。ポップアップを許可してください。');
    }
  };

  return (
    <div className="viewer-container">
	    {imageData ? (
				<img src={imageData} alt="プレゼンスライド" className='viewer-image'/>
			) : (
				<p>画像データがありません。</p>
			)}
      <div className={`taskbar ${showTaskbar ? 'taskbar-visible' : 'taskbar-hidden'}`}>
        <div className="taskbar-item">スタート</div>
        <div className="taskbar-item" onClick={openNewWindowAndNavigate}>
          タスク1
        </div>
      </div>
    </div>
  );
};

export default ViewerPage;
