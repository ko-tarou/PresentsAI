import React, { useEffect,useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../DropZone/ItemTypes.js';
import ResizeHandle from './ResizeHandle';
import EditableText from './EditableText.js';
import { useResizable } from './useResizable.js';

function TextBox({ id, text, x, y, onTextChange, fontSize, onSelect, onFocus, onBlur }) {
	const { size, handleResizeStart } = useResizable({ width: 100, height: 50 });
    const [value, setValue] = useState(text);

	useEffect(() => {
		setValue(text);
	}, [text]);

	const [{ isDragging }, drag] = useDrag({
		type: ItemTypes.TEXT_BOX,
		item: { id, x, y },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const handleTextChange = (newValue) => {
		onTextChange(id, newValue);
	};

	return (
		<div
			ref={drag}
			onClick={() => onSelect && onSelect(id)}
			onFocus={onFocus}
			onBlur={onBlur}
			className='text-box-wrapper'
			style={{
				width: `${size.width}px`,
				height: `${size.height}px`,
				fontSize: `${fontSize}px`,
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
			<EditableText value={text} onChange={handleTextChange} fontSize={fontSize} />

			{/* リサイズハンドル */}
			{['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((direction) => (
				<ResizeHandle
					key={direction}
					direction={direction}
					onResizeStart={handleResizeStart}
				/>
			))}
		</div>
	);
}

export default TextBox;
