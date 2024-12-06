import React, { useState, useRef, useEffect } from "react";
import "./PresenPage.css"; // CSSファイルをインポート

const slides = [
  "Slide 1: Introduction",
  "Slide 2: Overview",
  "Slide 3: Key Points",
  "Slide 4: Conclusion"
];

const PresenPage = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [presenterWindow, setPresenterWindow] = useState(null); // 発表者ウィンドウ
  const viewerRef = useRef(null);
  const toolbarRef = useRef(null); // ツールバーの参照

  // 発表者用ウィンドウを開く
  const openPresenterWindow = () => {
    const newWindow = window.open("", "_blank", "width=800,height=600");
    setPresenterWindow(newWindow);

    // 発表者ウィンドウのHTMLを設定
    newWindow.document.write(`
      <html>
        <head><title>Presenter Mode</title></head>
        <body>
          <h1>Presenter Mode</h1>
          <div id="presenter-slide" style="font-size: 24px; padding: 20px; display: flex; justify-content: center; align-items: center; height: 100vh; text-align: center;"></div>
          <div id="presenter-tools" style="padding: 20px;">
            <p>Notes: This is a note for the current slide.</p>
            <p>Timer: 00:00</p>
          </div>
        </body>
      </html>
    `);

    // 発表者ウィンドウをフルスクリーンにする
    newWindow.document.documentElement.requestFullscreen();
  };

  // スライドを次に進める
  const nextSlide = () => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    updateSlideContent();
  };

  // 発表者ウィンドウにスライドの内容を更新
  const updateSlideContent = () => {
    if (presenterWindow) {
      presenterWindow.document.getElementById("presenter-slide").innerText = slides[currentSlideIndex];
    }
  };

  // 視聴者側のフルスクリーンモードを切り替え
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      viewerRef.current.requestFullscreen(); // 視聴者ビューだけフルスクリーンに
    } else {
      document.exitFullscreen(); // フルスクリーンを解除
    }
  };

  // フルスクリーン状態の変化を監視
  const handleFullScreenChange = () => {
    if (document.fullscreenElement) {
      // フルスクリーン時にツールバーを表示
      if (toolbarRef.current) {
        toolbarRef.current.style.display = "flex";
      }
    } else {
      // フルスクリーンが解除されたときにツールバーを非表示
      if (toolbarRef.current) {
        toolbarRef.current.style.display = "none";
      }
    }
  };

  // 発表者モードの切り替え
  const togglePresenterMode = () => {
    if (!presenterWindow) {
      openPresenterWindow();
    } else {
      updateSlideContent(); // 発表者ウィンドウが開かれている場合はスライド内容を更新
    }
  };

  // キーボードでスライドを操作
  const handleKeyPress = (e) => {
    if (e.key === "ArrowRight" || e.key === " ") {
      nextSlide(); // 右矢印キーまたはスペースキーで次のスライド
    } else if (e.key === "ArrowLeft") {
      setCurrentSlideIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
      updateSlideContent(); // 左矢印キーで前のスライド
    }
  };

  // コンポーネントがマウントされた時にキーボードイベントとフルスクリーンイベントをリスン
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    document.addEventListener("fullscreenchange", handleFullScreenChange);

    // コンポーネントがアンマウントされるときにイベントリスナーを削除
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, [currentSlideIndex]); // currentSlideIndexが変わるたびにリスナーが更新される

  return (
    <div className="presen-page">
      {/* 視聴者ビュー（スライドのみ） */}
      <div
        className="viewer-container"
        ref={viewerRef}
      >
        <div className="slide-content">
          <h2>{slides[currentSlideIndex]}</h2>
        </div>
      </div>

      {/* フルスクリーン時に表示するツールバー */}
      <div
        ref={toolbarRef}
        className="toolbar"
      >
        <button onClick={togglePresenterMode}>Enter Presenter Mode</button>
      </div>

      {/* 操作ボタン */}
      <div className="controls">
        {/* フルスクリーンボタン */}
        <button onClick={toggleFullScreen}>Go Full Screen (Viewer)</button>
      </div>
    </div>
  );
};

export default PresenPage;
