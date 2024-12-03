import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import "./SlidePage.css";
import TabContent from "../../components/Tab/TabContent.js";
import DropZone from '../../components/SlidePage/DropZone/DropZone.js';
import TextBox from '../../components/SlidePage/TextBox/TextBox.js';

function Slidepage() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [textBoxes, setTextBoxes] = useState([]);
  const [selectedBoxId, setSelectedBoxId] = useState(null);
  const [isTextBoxFocused, setIsTextBoxFocused] = useState(false);

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

        {/* 上部バー */}
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
          
          <div className='comment-area'></div>
            
          <div className='slide-list'>
            <div className="slide-item"></div>
            <div className="slide-item"></div>
            <div className="slide-item"></div>
          </div>
        </div>

        {/* 発表原稿を記述する棚 */}
        <div className="footer"></div>
      </div>
    </DndProvider>
  );
}

export default Slidepage;
