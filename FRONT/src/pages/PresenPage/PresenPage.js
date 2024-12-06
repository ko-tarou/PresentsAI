import React, { useRef } from 'react';

function PresenPage() {
	const containerRef = useRef(null); // 全画面にする要素を参照
	
	// フルスクリーンにする関数
	const enterFullscreen = () => {
		if (containerRef.current) {
			if (containerRef.current.requestFullscreen) {
				containerRef.current.requestFullscreen();
			} else if (containerRef.current.webkitRequestFullscreen) {
				containerRef.current.webkitRequestFullscreen();
			} else if (containerRef.current.mozRequestFullScreen) {
				containerRef.current.mozRequestFullScreen();
			} else if (containerRef.current.msRequestFullscreen) {
				containerRef.current.msRequestFullscreen();
			}
		}
	};

	// フルスクリーンを終了する関数 (Escキーで自動的に呼ばれる)
	const exitFullscreen = () => {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen();
		}
	};

	return (
		<div
			ref={containerRef} // 全画面の対象
			className="PresenPage"
			style={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				height: '100vh',
				backgroundColor: '#f4f4f4',
			}}
		>
			{/* 緑の四角 */}
			<div
				style={{
					width: '200px',
					height: '200px',
					backgroundColor: 'green',
				}}
			></div>

			{/* フルスクリーンにするボタン */}
			<button
				onClick={enterFullscreen}
				style={{
					position: 'absolute',
					bottom: '20px',
					padding: '10px 20px',
					fontSize: '16px',
					cursor: 'pointer',
				}}
			>
				フルスクリーン
			</button>

			{/* Escキーで元に戻す（ブラウザのフルスクリーン機能に依存するので特別なコード不要） */}
		</div>
	);
}

export default PresenPage;
