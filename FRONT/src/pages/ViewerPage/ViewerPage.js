import React, { useState, useEffect,useContext } from 'react';
import './ViewerPage.css'; // 必要に応じてCSSでスタイルを調整
import { ImageContext } from '../ImageContext';

const ViewerPage = () => {
  const [showTaskbar, setShowTaskbar] = useState(false); // タスクバー表示状態
  const taskbarHeight = 50; // タスクバーの高さ
  const {imageData,setImageDate} = useContext(ImageContext)

  const [IsFirstImage, setIsFirstImage] = useState(true);
  

  useEffect(() => {
    const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      setIsFirstImage((prev) => !prev);
    }}
    window.addEventListener("keydown", handleKeyDown);
    return () => {
    window.removeEventListener("keydown", handleKeyDown);
    }
  }, []);

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
				<img 
          src={IsFirstImage ? imageData : '/img/image.png'} 
          alt="プレゼンスライド" 
          className='viewer-image'
        />
			) : (
				<p>画像データがありません。</p>
			)}
      <div className={`taskbar ${showTaskbar ? 'taskbar-visible' : 'taskbar-hidden'}`}>
        <div className="taskbar-item">全画面表示を終了</div>
        <div className="taskbar-item" onClick={openNewWindowAndNavigate}>
          発表者モード
        </div>
      </div>
    </div>
  );
};

export default ViewerPage;
