import React, { useRef } from 'react';
import './SlideList.css';

const SlideList = () => {
	const textRef = useRef(null);

const handleClick = () => {
	if (textRef.current) {
	textRef.current.focus(); // クリック時にフォーカスを設定
	}
};
return (
	<div
	ref={textRef}
	tabIndex={0}  // フォーカス可能にするために tabIndex を追加
	className="clickable-text"
	onClick={handleClick}
	>
	</div>
);
};

export default SlideList;