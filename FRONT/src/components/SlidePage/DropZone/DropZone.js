import React, { useRef } from 'react';
import { useDrop } from 'react-dnd';

const ItemTypes = {
TEXT_BOX: 'textBox',
};

function DropZone({ onDrop }) {
const dropRef = useRef(null);

const [, drop] = useDrop({
	accept: ItemTypes.TEXT_BOX,
	drop: (item, monitor) => {
	if (!dropRef.current) return;

	const offset = monitor.getClientOffset();
	const dropZoneRect = dropRef.current.getBoundingClientRect();
	const relativeX = offset.x - dropZoneRect.left;
	const relativeY = offset.y - dropZoneRect.top;

	onDrop(item, { x: relativeX, y: relativeY });
	},
});

drop(dropRef);

return (
	<div
	ref={dropRef}
	style={{
		position: 'relative',
		width: '100%',
		height: '100%',
		border: '1px solid gray',
	}}
	/>
);
}

export default DropZone;