import { useState, useCallback } from 'react';

export const useResizable = (initialSize) => {
	const [size, setSize] = useState(initialSize);

	const handleResizeStart = useCallback((e, direction) => {
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
	}, [size]);

	return { size, handleResizeStart };
};
