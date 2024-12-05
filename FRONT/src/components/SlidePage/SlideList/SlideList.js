import React, { useRef, useState, useEffect } from "react";
import "./SlideList.css";

const SlideList = () => {
// refs配列を管理するuseRef
const refs = useRef([]);
// ボックスの数を管理するuseState
const [boxCount, setBoxCount] = useState(1);
// フォーカスされたボックスID
const [focusedBoxId, setFocusedBoxId] = useState(null);

// ボタンをクリックしたときの処理
const addBox = () => {
	// refs配列に新しいrefを追加
	refs.current.push(React.createRef());
	// ボックス数を増やす
	setBoxCount((prevCount) => prevCount + 1);
};

const delBox = () => {
	if (focusedBoxId !== null) {
	// フォーカスされたボックスを削除
	refs.current.splice(focusedBoxId, 1); // 対応する ref を削除
	setBoxCount((prevCount) => prevCount - 1); // ボックス数を減らす
	setFocusedBoxId(null); // フォーカスをリセット
	}
};

const handleClick = (ref, id) => {
	if (ref.current) {
	ref.current.focus(); // クリック時にフォーカスを設定
	setFocusedBoxId(id); // フォーカスされたボックスの ID を保存
	}
};

// バックスペースキーを検知して削除する処理
const handleKeyDown = (event) => {
	if (event.key === "Backspace" && focusedBoxId !== null) {
	delBox(); // バックスペースが押されたときにdelBoxを実行
	}
};

// バックスペースのイベントリスナーを追加
useEffect(() => {
	window.addEventListener("keydown", handleKeyDown);
	return () => {
	window.removeEventListener("keydown", handleKeyDown);
	};
}, [focusedBoxId]); // focusedBoxIdが変わったときに再実行されるように依存配列に追加

return (
	<div className="slide-container">
	{Array.from({ length: boxCount }).map((_, index) => (
		<div
		key={index}
		ref={refs.current[index] || (refs.current[index] = React.createRef())}
		tabIndex={0} // フォーカス可能にするために tabIndex を追加
		className="clickable-text"
		onClick={() => handleClick(refs.current[index], index)} // indexを引数に追加
		></div>
	))}
	<button className="add-box-button" onClick={addBox}>
		+
	</button>
	</div>
);
}

export default SlideList;