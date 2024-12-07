import React, { useState } from "react";
import "./SlideView.css";

const SlideView = () => {
  const initialBoxes = Array.from({ length: 12 }).map((_, index) => ({
    id: index,
    content: `Box ${index + 1}`,
  }));

  const [boxes, setBoxes] = useState(initialBoxes);

  // ピン留め処理
  const handlePin = (id) => {
    const selectedBox = boxes.find((box) => box.id === id);
    const remainingBoxes = boxes.filter((box) => box.id !== id);
    setBoxes([selectedBox, ...remainingBoxes]);
  };

  return (
    <div className="SlideView">
      <div className="leftside">
        <input type="text" placeholder="スライド名を入力" className="search-field-leftside" />
        <button className="search-button-leftside">検索</button>
      </div>
      <div className="rightside">
        <div className="box-whole">
          {boxes.map((box) => (
            <div className="box-container" key={box.id}>
              <div className="box">{box.content}</div>
              <div className="button-group">
                <button className="button feedback-button">💬</button>
                <button
                  className="button pin-button"
                  onClick={() => handlePin(box.id)}
                >
                  ⭐
                </button>
                <button className="button create-button">➕</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SlideView;
