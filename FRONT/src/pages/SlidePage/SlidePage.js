import React from "react";
import "./SlidePage.css";

function SlidePage() {
  return (
    <div className="slide-page">
      {/* 上部バー */}
      <div className="header">
        <button className="enter-room-button">部屋に入る</button>
      </div>

      {/* メインコンテンツ */}
      <div className="content">
        {/* 左サイドバー */}
        <div className="left-sidebar"></div>

        {/* メインスライドエリア */}
        <div className="main-slide"></div>

        {/*コメント書くエリア*/}
        <div className="comment-area">
        </div>

        {/* 右サイドバー（スライド一覧） */}
        <div className="slide-list">
          <div className="slide-item"></div>
          <div className="slide-item"></div>
          <div className="slide-item"></div>
        </div>
      </div>

      {/* 発表原稿を記述する棚 */}
      <div className="footer">
      </div>
    </div>
  );
}

export default SlidePage;
