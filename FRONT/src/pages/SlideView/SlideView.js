import React, { useState } from "react";
import "./SlideView.css";

const SlideView = () => {
  const initialBoxes = Array.from({ length: 12 }).map((_, index) => ({
    id: index,
    content: `Box ${index + 1}`,
    name: "", // 初期名前なし
  }));

  const [boxes, setBoxes] = useState(initialBoxes);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearched, setIsSearched] = useState(false); // 検索が実行されたかどうかのフラグ

  // ピン留め処理
  const handlePin = (id) => {
    const selectedBox = boxes.find((box) => box.id === id);
    const remainingBoxes = boxes.filter((box) => box.id !== id);
    setBoxes([selectedBox, ...remainingBoxes]);
  };

  // 名前変更処理
  const handleNameChange = (id, newName) => {
    const updatedBoxes = boxes.map((box) =>
      box.id === id ? { ...box, name: newName } : box
    );
    setBoxes(updatedBoxes);
  };

  // 検索クエリの更新処理
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setIsSearched(false); // 新しいクエリ入力時にハイライトをリセット
  };

  // 検索ボタンがクリックされたときの処理
  const handleSearchClick = () => {
    setIsSearched(true); // 検索実行フラグを立てる
  };

  return (
    <div className="SlideView">
      <div className="leftside">
        <input
          type="text"
          placeholder="スライド名を検索"
          className="search-field-leftside"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          className="search-button-leftside"
          onClick={handleSearchClick} // 検索ボタンをクリックするとハイライトが反映される
        >
          検索
        </button>
      </div>
      <div className="rightside">
        <div className="box-whole">
          {boxes.map((box) => (
            <div
              className={`box-container`}
              key={box.id}
            >
              <div
                className={`box ${
                  isSearched && searchQuery !== "" && box.name === searchQuery
                    ? "highlight"
                    : ""
                }`}
              >
                <input
                  type="text"
                  value={box.name}
                  onChange={(e) => handleNameChange(box.id, e.target.value)}
                  className="box-name-input"
                  placeholder="名前を入力"
                />
              </div>
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
