import React, { useState, useRef } from 'react';

function Anglechange() {
	const [rotate, setRotate] = useState(0); // 回転角度の状態
	const boxRef = useRef(null); // ボックスの参照

	const handleMouseDown = (e) => {
		e.preventDefault();

		const box = boxRef.current;
		const boxRect = box.getBoundingClientRect();
		const centerX = boxRect.left + boxRect.width / 2; // ボックスの中心 X 座標
		const centerY = boxRect.top + boxRect.height / 2; // ボックスの中心 Y 座標

		const startAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX); // 初期角度

		const handleMouseMove = (e) => {
			const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
			const angleDiff = currentAngle - startAngle;

			setRotate((prevRotate) => prevRotate + angleDiff * (180 / Math.PI)); // ラジアンから度に変換
		};

		const handleMouseUp = () => {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	return (
		<div
			ref={boxRef}
			onMouseDown={handleMouseDown}
			style={{
				width: '200px',
				height: '200px',
				backgroundColor: 'lightblue',
				transform: `rotate(${rotate}deg)`,
				transformOrigin: 'center', // 回転の基準を中心に設定
				position: 'absolute',
				top: '50%',
				left: '50%',
				translate: '-50% -50%',
				cursor: 'grab',
			}}
		>
		</div>
	);
}

export default Anglechange;
