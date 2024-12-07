import React, { useState, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../DropZone/ItemTypes.js';

function TextBox({ id, text, x, y, onTextChange, fontSize, onSelect, onFocus, onBlur }) {
	const [value, setValue] = useState(text || '');
	const [size, setSize] = useState({ width: 100, height: 50 });
	const [isEditing, setIsEditing] = useState(false);

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

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onTextChange(id, newValue);
    };

    const handleDoubleClick = () => setIsEditing(true);

    const handleBlur = () => setIsEditing(false);

    const handleResize = (e, direction) => {
        e.stopPropagation();
        e.preventDefault();

        const startX = e.clientX;
        const startY = e.clientY;
        const startWidth = size.width;
        const startHeight = size.height;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            setSize({
                width: direction.includes('right') ? startWidth + deltaX : startWidth - deltaX,
                height: direction.includes('bottom') ? startHeight + deltaY : startHeight - deltaY,
            });
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
            ref={drag}
            onClick={() => onSelect && onSelect(id)}
            onDoubleClick={handleDoubleClick}
            onFocus={onFocus}
            onBlur={onBlur}
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
            {isEditing ? (
                <input
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        outline: 'none',
                        fontSize: `${fontSize || 16}px`,
                    }}
                />
            ) : (
                <div style={{ width: '100%', height: '100%' }}>
                    {value || 'ダブルクリックで編集'}
                </div>
            )}

            {/* リサイズハンドル */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((direction) => (
                <div
                    key={direction}
                    onMouseDown={(e) => handleResize(e, direction)}
                    style={resizeHandleStyle(direction)}
                />
            ))}
        </div>
    );
}

const resizeHandleStyle = (direction) => {
    const baseStyle = {
        position: 'absolute',
        width: '8px',
        height: '8px',
        backgroundColor: 'gray',
        cursor: `${direction.split('-').join('-')}-resize`,
    };

    const positionMap = {
        'top-left': { top: '-4px', left: '-4px' },
        'top-right': { top: '-4px', right: '-4px' },
        'bottom-left': { bottom: '-4px', left: '-4px' },
        'bottom-right': { bottom: '-4px', right: '-4px' },
    };

    return { ...baseStyle, ...positionMap[direction] };
};

export default TextBox;
