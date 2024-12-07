import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import "./SlidePage.css";
import TabContent from "../../components/Tab/TabContent.js";
import DropZone from '../../components/SlidePage/DropZone/DropZone.js';
import TextBox from '../../components/SlidePage/TextBox/TextBox.js';
import {
	addTextBox,
	subscribeToTextBoxes,
	updateTextBox,
	deleteTextBox,
} from "../../firebase/realtimeService.js";
import KeyboardHandler from '../../components/SlidePage/TextBox/TextBoxDelete.js';
import FontSize from '../../components/SlidePage/TextBox/TextFontSize.js';
import Anglechange from '../../components/SlidePage/TextBox/AngleChange.js';

function Slidepage() {
	const [activeTab, setActiveTab] = useState("tab1");
	const [textBoxes, setTextBoxes] = useState([]); // テキストボックスのデータ
	const [selectedBoxId, setSelectedBoxId] = useState(null); // 選択されているボックスID
	const [isTextBoxFocused, setIsTextBoxFocused] = useState(false); // ボックスがフォーカス中か


	useEffect(() => {
		const unsubscribe = subscribeToTextBoxes((fetchedTextBoxes) => {
			setTextBoxes(fetchedTextBoxes);
	
			if (selectedBoxId && !fetchedTextBoxes.some((box) => box.id === selectedBoxId)) {
				setSelectedBoxId(null);
			}
		});
	
		return () => {
			console.log('Firebase listener解除');
			unsubscribe();
		};
	}, [selectedBoxId]);
	

	// テキストボックスを移動
	const handleBoxMove = async (id, newPosition) => {
		await updateTextBox(id, { x: newPosition.x, y: newPosition.y });
	};
	

	const handleDrop = async (item, position) => {
		if (item.id) {
			await handleBoxMove(item.id, {
				x: position.x,
				y: position.y,
				text: item.text
			});
		} else {
			const newBox = {
				text: item.text || `TextBox ${textBoxes.length + 1}`,
				x: position.x,
				y: position.y,
				fontSize: 16,
			};
			await addTextBox(newBox);
		}
	};

	// テキスト変更時に Firebase を更新
	const handleTextChange = async (id, newText) => {
		await updateTextBox(id, { text: newText });
	};

	const handleKeyDown = useCallback(async (event) => {
		if (event.key === 'Backspace' && selectedBoxId !== null && !isTextBoxFocused) {
			try {
				// Firebase から削除
				await deleteTextBox(selectedBoxId);
	
				// 選択状態をリセット（同期処理と競合しないよう確実に実行）
				setSelectedBoxId(null);
			} catch (error) {
				console.error('テキストボックス削除時のエラー:', error);
			}
		}
	}, [selectedBoxId, isTextBoxFocused]);	


	// キーボードイベントのリスナーを設定
	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [handleKeyDown]);

	return (
		<DndProvider backend={HTML5Backend}>
			<div className='slide-page'>
				<div className='content'>
					<div className='left-sidebar'>
						<TabContent activeTab={activeTab} />
					</div>
					<div className='main-slide' style={{ position: 'relative', height: '100%' }}>
						<KeyboardHandler
							selectedBoxId={selectedBoxId}
							isTextBoxFocused={isTextBoxFocused}
							setTextBoxes={setTextBoxes}
							setSelectedBoxId={setSelectedBoxId}
						/>
						<FontSize
							selectedBoxId={selectedBoxId}
							isTextBoxFocused={isTextBoxFocused}
							setTextBoxes={setTextBoxes}
							setSelectedBoxId={setSelectedBoxId}
						/>
						<DropZone onDrop={handleDrop} />
						{textBoxes.map((box) => (
							<TextBox
								key={box.id}
								id={box.id}
								text={box.text}
								x={box.x}
								y={box.y}
								fontSize={box.fontSize || 16}
								onTextChange={(newText) => handleTextChange(box.id, newText)}
								onSelect={() => setSelectedBoxId(box.id)}
								onFocus={() => setIsTextBoxFocused(true)}
								onBlur={() => setIsTextBoxFocused(false)}
							/>
						))}
					</div>
					<div 
						className='comment-area' 
						contentEditable="true"
						onInput={(e) => console.log(e.target.innerText)} // コメント入力（必要に応じて実装）
					/>

					<div className='slide-list'>
						<div className="slide-item"></div>
						<div className="slide-item"></div>
						<div className="slide-item"></div>
					</div>
					{/* 発表原稿を記述する棚 */}
					<div className="footer"></div>
				</div>
			</div>
		</DndProvider>
	);
}

export default Slidepage;