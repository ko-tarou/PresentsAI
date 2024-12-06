import React, { useRef, useState, useEffect } from "react";

const ButtonLine = ({ children, onClick }) => {
  const buttonRef = useRef(null);
  const [textWidth, setTextWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (buttonRef.current) {
      const computedStyle = window.getComputedStyle(buttonRef.current);
      const fontSize = parseFloat(computedStyle.fontSize);
      const fontFamily = computedStyle.fontFamily;
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      context.font = `${fontSize}px ${fontFamily}`;
      const measuredWidth = context.measureText(children).width;
      setTextWidth(measuredWidth);
    }
  }, [children]);

  return (
    <div
      style={{
        display: "inline-block",
        textAlign: "center",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        ref={buttonRef}
        style={{
          width: `${textWidth}px`,
          padding: "5px 0",
          border: "none",
          background: "transparent",
          cursor: "pointer",
          fontSize: "16px",
          position: "relative",
          backgroundColor: "#1e1e2f",
          color: "#ffffff",
        }}
        onClick={onClick} // クリック時の動作を追加
      >
        {children}
      </button>
      <div
        style={{
          height: "2px",
          backgroundColor: "#ffffff",
          width: isHovered ? `${textWidth}px` : "0",
          margin: "5px auto 0",
          transition: "width 0.4s ease",
          transformOrigin: "center",
        }}
      />
    </div>
  );
};

export default ButtonLine;
