import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../DropZone/ItemTypes';

function ShapeBox({ id, text, x, y, onSelect, onFocus, onBlur }) {
const [value, setValue] = useState(text || "");
const [size, setSize] = useState({ width: 100, height: 50 });
const [isEditing, setIsEditing] = useState(false); // 新しく追加

useEffect(() => {
	setValue(text);
}, [text]);

const [{ isDragging }, drag] = useDrag({
	type: ItemTypes.SHAPE_BOX,
	item: { id, text: value, x, y },
	collect: (monitor) => ({
	isDragging: monitor.isDragging(),
	}),
});

const handleClick = () => {
	if (onSelect) {
	onSelect(id);
	}
};

const handleResize = (e, direction) => {
	e.stopPropagation();
	e.preventDefault();

	const startX = e.clientX;
	const startY = e.clientY;
	const startWidth = size.width;
	const startHeight = size.height;

	const handleMouseMove = (e) => {
	let newWidth = startWidth;
	let newHeight = startHeight;

	if (direction.includes("right")) {
		newWidth = startWidth + (e.clientX - startX);
	} else if (direction.includes("left")) {
		newWidth = startWidth - (e.clientX - startX);
	}

	if (direction.includes("bottom")) {
		newHeight = startHeight + (e.clientY - startY);
	} else if (direction.includes("top")) {
		newHeight = startHeight - (e.clientY - startY);
	}

	setSize({ width: newWidth, height: newHeight });
	};

	const handleMouseUp = () => {
	document.removeEventListener("mousemove", handleMouseMove);
	document.removeEventListener("mouseup", handleMouseUp);
	};

	document.addEventListener("mousemove", handleMouseMove);
	document.addEventListener("mouseup", handleMouseUp);
}; //マウスでBOXの大きさを変更する

return (
	<div
	ref={drag}
	onClick={handleClick}
	onFocus={onFocus}
	onBlur={onBlur}
	style={{
		width: `${size.width}px`,
		height: `${size.height}px`,
		opacity: isDragging ? 0.5 : 1,
		padding: '10px',
		border: '1px solid black',
		cursor: 'move',
		position: 'absolute',
		left: x,
		top: y,
		transform: 'translate(-50%, -50%)',
	}}
	>
	{/* 四隅のリサイズハンドル */}
	<div onMouseDown={(e) => handleResize(e, "top-left")} style={resizeHandleStyle("top", "left")} />
	<div onMouseDown={(e) => handleResize(e, "top-right")} style={resizeHandleStyle("top", "right")} />
	<div onMouseDown={(e) => handleResize(e, "bottom-left")} style={resizeHandleStyle("bottom", "left")} />
	<div onMouseDown={(e) => handleResize(e, "bottom-right")} style={resizeHandleStyle("bottom", "right")} />
	{/* 上下左右のリサイズハンドル */}
	<div onMouseDown={(e) => handleResize(e, "top")} style={resizeHandleStyle("top")} />
	<div onMouseDown={(e) => handleResize(e, "right")} style={resizeHandleStyle("right")} />
	<div onMouseDown={(e) => handleResize(e, "bottom")} style={resizeHandleStyle("bottom")} />
	<div onMouseDown={(e) => handleResize(e, "left")} style={resizeHandleStyle("left")} />
	</div>
);
}

const resizeHandleStyle = (vertical, horizontal) => ({
position: 'absolute',
width: vertical ? '100%' : '8px',
height: horizontal ? '100%' : '8px',
backgroundColor: 'transparent',
cursor: `${vertical || ''}${horizontal || ''}-resize`,
[vertical]: vertical && 0,
[horizontal]: horizontal && 0,
});

const centerHandleStyle = (position) => ({
position: 'absolute',
width: position === 'top' || position === 'bottom' ? '30px' : '8px',
height: position === 'left' || position === 'right' ? '30px' : '8px',
backgroundColor: 'transparent',
cursor: 'pointer',
[position]: '50%',
transform: 'translate(-50%, -50%)',
});

export default ShapeBox;