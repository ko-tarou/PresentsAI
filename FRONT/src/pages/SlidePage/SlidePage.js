import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import "./SlidePage.css";
import TabContent from "../../components/Tab/TabContent.js";
import DropZone from '../../components/SlidePage/DropZone/DropZone.js';
import TextBox from '../../components/SlidePage/TextBox/TextBox.js';
import { io } from "socket.io-client";
import KeyboardHandler from '../../components/SlidePage/TextBox/TextBoxDelete.js';
import FontSize from '../../components/SlidePage/TextBox/TextFontSize.js';
import Anglechange from '../../components/SlidePage/TextBox/AngleChange.js';
import ZindexBox from '../../components/SlidePage/TextBox/ZindexBox.js';

const socket = io("https://1d32-202-13-166-100.ngrok-free.app"); // サーバーのURLに合わせて変更


function Slidepage() {
	const [activeTab, setActiveTab] = useState("tab1");
	const [textBoxes, setTextBoxes] = useState([]);
	const [selectedBoxId, setSelectedBoxId] = useState(null);
	const [isTextBoxFocused, setIsTextBoxFocused] = useState(false);
	const [content, setContent] = useState(''); // 初期値を空文字に設定
	
	const handleInput = (e) => {
		setContent(e.target.innerText); // ユーザーが入力した内容を更新
	};

	const handleDrop = (item, position) => {
		const newId = item.id || `box_${textBoxes.length + 1}`;
		setTextBoxes((prevBoxes) => {
		const existingBoxIndex = prevBoxes.findIndex((box) => box.id === item.id);
		if (existingBoxIndex !== -1) {
			// 既存テキストボックスの位置を更新
			const updatedBoxes = [...prevBoxes];
			updatedBoxes[existingBoxIndex] = {
			...updatedBoxes[existingBoxIndex],
			x: position.x,
			y: position.y,
			};
			return updatedBoxes;
		} else {
			// 新規テキストボックスを追加
			const newBox = {
			id: newId,
			text: item.text || `TextBox ${newId}`,
			x: position.x,
			y: position.y,
			fontSize: 16,
			};
			return [...prevBoxes, newBox];
		}
		});
	};

	const handleTextChange = (id, newText) => {
		setTextBoxes((prevBoxes) =>
		prevBoxes.map((box) => {
			if (box.id === id) {
			return { ...box, text: newText };
			}
			return box;
		})
		);
	};

	// サーバーからテキストボックスの追加・更新情報を受け取る
	socket.on("textBoxUpdated", (updatedBox) => {
		setTextBoxes((prevBoxes) => {
			const existingIndex = prevBoxes.findIndex(box => box.id === updatedBox.id);
			if (existingIndex !== -1) {
				// 既存のテキストボックスを更新
				const updatedBoxes = [...prevBoxes];
				updatedBoxes[existingIndex] = updatedBox;
				return updatedBoxes;
			} else {
				// 新規のテキストボックスを追加
				return [...prevBoxes, updatedBox];
			}
		});
	});

	const handleKeyDown = useCallback((event) => {
		if (event.key === 'Backspace' && selectedBoxId !== null && !isTextBoxFocused) {
		setTextBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== selectedBoxId));
		setSelectedBoxId(null);
		}
	}, [selectedBoxId, isTextBoxFocused]);

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
				<ZindexBox
					selectedBoxId={selectedBoxId}
					isTextBoxFocused={isTextBoxFocused}
					setTextBoxes={setTextBoxes}
					socket={socket}
					setSelectedBoxId={setSelectedBoxId}
				/>
				<KeyboardHandler
					selectedBoxId={selectedBoxId}
					isTextBoxFocused={isTextBoxFocused}
					setTextBoxes={setTextBoxes}
					socket={socket}
					setSelectedBoxId={setSelectedBoxId}
				/>
				<FontSize
					selectedBoxId={selectedBoxId}
					isTextBoxFocused={isTextBoxFocused}
					setTextBoxes={setTextBoxes}
					socket={socket} // 必要に応じて WebSocket を設定
					setSelectedBoxId={setSelectedBoxId}
				/>
				<Anglechange
					selectedBoxId={selectedBoxId}
					isTextBoxFocused={isTextBoxFocused}
					setTextBoxes={setTextBoxes}
					socket={socket} // 必要に応じて WebSocket を設定
					setSelectedBoxId={setSelectedBoxId}
				/>
				<DropZone onDrop={handleDrop} />
				{textBoxes.map((box) => (
				<TextBox
					rotate={box.rotate}
					key={box.id}
					id={box.id}
					text={box.text}
					x={box.x}
					y={box.y}
					fontSize={box.fontSize || 16}
					onTextChange={handleTextChange}
					onSelect={() => setSelectedBoxId(box.id)}
					onFocus={() => setIsTextBoxFocused(true)}
					onBlur={() => setIsTextBoxFocused(false)}
				/>
				))}
				</div>
				<div 
					className='comment-area' 
					contentEditable="true"
					onInput={handleInput}
				>
				
				</div>
							
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
