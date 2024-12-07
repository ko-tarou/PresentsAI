import React from "react";
import { useNavigate } from "react-router-dom";
import "./TopPage.css";
import ButtonLine from "../../components/button/ButtonLine/ButtonLine";

function TopPage() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <main className="main">
        <h1 className="title">PresentsAI</h1>
        <div className="buttons">
          {/* 各ボタンを独立して縦に配置 */}
            <ButtonLine name="viewSlidesButton" onClick={() => navigate("/slideview")}>
              作ったスライドを見る
            </ButtonLine>
            <ButtonLine name="makeSlidesButton" onClick={() => navigate("/slidepage")}>
              スライドを作成
            </ButtonLine>
        </div>
      </main>
    </div>
  );
}

export default TopPage;
