import React from 'react';

const ResizeHandle = ({ direction, onResizeStart }) => {
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

    return (
        <div
            style={resizeHandleStyle(direction)}
            onMouseDown={(e) => onResizeStart(e, direction)}
        />
    );
};

export default ResizeHandle;
