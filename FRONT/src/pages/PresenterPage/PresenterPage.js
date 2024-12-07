import React, { useRef, useState } from "react";
import "./PresenterPage.css"; // 必要に応じてCSSでスタイルを調整

const PresenterPage = () => {
  const imageRef = useRef(null); // 画像の参照
  const [time, setTime] = useState(0); // 初期値を0に設定
  const [isRunning, setIsRunning] = useState(false);

  const handleReset = () => {
    setTime(0); // 0にリセット
    setIsRunning(false);
  };

  const handlePlayPause = () => {
    setIsRunning((prev) => !prev);
  };

  React.useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // 時間を1秒ごとに増加
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <div className="presenter-container">
      <div className="timer-container">
        <div className="time-display">{`00:${time.toString().padStart(2, "0")}`}</div>
        <div className="button-group">
          <button className="reset-button" onClick={handleReset}>
            ↻
          </button>
          <button className="play-button" onClick={handlePlayPause}>
            {isRunning ? "⏸" : "▶"}
          </button>
        </div>
      </div>
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
