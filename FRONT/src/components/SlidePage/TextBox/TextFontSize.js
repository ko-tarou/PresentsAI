import React, { useState } from "react";
import TextBox from "./TextBox";

function fontSize (){
	// フォーカスされたボックスID
	const [focusedBoxId, setFocusedBoxId] = useState(null);

	const handleClick = (ref, id) => {
		if (ref.current) {
		ref.current.focus(); // クリック時にフォーカスを設定
		setFocusedBoxId(id); // フォーカスされたボックスの ID を保存
		}
	};

	const increaseFontSize = () => {
		setFontSize(fontSize + 1); // フォントサイズを1px増加
	};

	const decreaseFontSize = () => {
		setFontSize(fontSize - 1); // フォントサイズを1px減少
	};

	//キーボードの↑か↓を押したときに実行するよ
	const handleKeyDown = (event) => {
		if (event.key === "↑" && focusedBoxId !== null) {
			increaseFontSize(); 
		}
		if (event.key === "↓" && focusedBoxId !== null) {
			decreaseFontSize(); 
		}
	};

	return (
		<div onKeyDown={handleKeyDown} tabIndex={0}>
		{/* TextBoxコンポーネントにフォントサイズやクリック処理を渡す */}
		<TextBox
			ref={textBoxRef}
			fontSize={fontSize}
			onClick={() => handleClick(textBoxRef, 1)} // ボックス1と仮定
		/>
		</div>
	);
};

export default TextSize;