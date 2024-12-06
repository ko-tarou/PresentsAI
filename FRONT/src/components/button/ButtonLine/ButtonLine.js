import React, { useRef, useState, useEffect } from "react";
const ButtonLine = ({ children }) => {
  const buttonRef = useRef(null); // ボタン要素の参照
  const [textWidth, setTextWidth] = useState(0); // ボタンのテキスト幅
  const [isHovered, setIsHovered] = useState(false); // ホバー状態
  useEffect(() => {
    if (buttonRef.current) {
      // ボタンの文字幅を取得
      const computedStyle = window.getComputedStyle(buttonRef.current);
      const fontSize = parseFloat(computedStyle.fontSize);
      const fontFamily = computedStyle.fontFamily;
      // Canvasを使ってテキスト幅を計算
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.font = `${fontSize}px ${fontFamily}`;
      const measuredWidth = context.measureText(children).width;
      setTextWidth(measuredWidth); // 計算した幅を設定
    }
  }, [children]);
  return (
    <div
      style={{
        display: "inline-block",
        textAlign: "center",
      }}
      onMouseEnter={() => setIsHovered(true)} // ホバー開始
      onMouseLeave={() => setIsHovered(false)} // ホバー終了
    >
      <button
        ref={buttonRef}
        style={{
          width: `${textWidth}px`, // 幅をテキストの幅に設定
          padding: "5px 0",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "20px",
          position: "relative",
          backgroundColor:"#1e1e2f",
          color: "#ffffff", // 文字色を白に変更
        }}
      >
        {children}
      </button>
      <div
        style={{
          height: "2px",
          backgroundColor: "#ffffff", // 下線の色も白に変更
          width: isHovered ? `${textWidth}px` : "0", // ホバー時に幅を拡大
          margin: "5px auto 0", // 中央揃え
          transition: "width 0.4s ease", // アニメーション
          transformOrigin: "center", // 中央から伸びる
        }}
      />
    </div>
  );
};
export default ButtonLine;