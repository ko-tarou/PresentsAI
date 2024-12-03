import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import "./SlidePage.css";
import TabContent from "../../components/Tab/TabContent.js";
import DropZone from '../../components/SlidePage/DropZone/DropZone.js';
import TextBox from '../../components/SlidePage/TextBox/TextBox.js';
import { io } from "socket.io-client";

const socket = io("https://1d32-202-13-166-100.ngrok-free.app"); // サーバーのURLに合わせて変更


function Slidepage() {
const [activeTab, setActiveTab] = useState("tab1");
const [textBoxes, setTextBoxes] = useState([]);
const [selectedBoxId, setSelectedBoxId] = useState(null);
const [isTextBoxFocused, setIsTextBoxFocused] = useState(false);

	useEffect(() => {
		// 初回ロード時、サーバーからテキストボックスのデータを取得
		socket.on("textBoxes", (data) => {
			setTextBoxes(data);
		});

		socket.on("connect_error", (error) => {
			console.error("WebSocket connection error:", error);
		});		

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

		socket.on("deleteTextBox",(boxId) => {
			setTextBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !==boxId))
		})

		// クリーンアップでリスナーを解除
		return () => {
			socket.off("textBoxes");
			socket.off("textBoxUpdated");
			socket.off("deleteTextBox")
		};
	}, []);

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
			// サーバーに位置変更を通知
			socket.emit("updateTextBox", updatedBoxes[existingBoxIndex]);
			return updatedBoxes;
		} else {
			// 新規テキストボックスを追加
			const newBox = {
			id: newId,
			text: item.text || `TextBox ${newId}`,
			x: position.x,
			y: position.y,
			};
			// サーバーに追加を通知
			socket.emit("addTextBox", newBox);
			return [...prevBoxes, newBox];
		}
		});
	};

	const handleTextChange = (id, newText) => {
		setTextBoxes((prevBoxes) =>
		prevBoxes.map((box) => {
			if (box.id === id) {
				const updatedBox = { ...box, text: newText };
				socket.emit("updateTextBox", updatedBox);
			return updatedBox;
			}
			return box;
		})
		);
	};

	const handleKeyDown = useCallback((event) => {
		if (event.key === 'Backspace' && selectedBoxId !== null && !isTextBoxFocused) {
			setTextBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== selectedBoxId));
			socket.emit("deleteTextBox", selectedBoxId); // サーバーに削除を通知
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
			<div className="header">
			<button className="enter-room-button">部屋に入る</button>
			</div>
			<div className='content'>
			<div className='left-sidebar'>
				<TabContent activeTab={activeTab} />
			</div>
			<div className='main-slide' style={{ position: 'relative', height: '100%' }}>
				<DropZone onDrop={handleDrop} />
				{textBoxes.map((box) => (
				<TextBox
					key={box.id}
					id={box.id}
					text={box.text}
					x={box.x}
					y={box.y}
					onTextChange={handleTextChange}
					onSelect={() => setSelectedBoxId(box.id)}
					onFocus={() => setIsTextBoxFocused(true)}
					onBlur={() => setIsTextBoxFocused(false)}
				/>
				))}
			</div>
			</div>
		</div>
		</DndProvider>
	);
}


export default Slidepage;
