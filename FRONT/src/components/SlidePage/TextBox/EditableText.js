import React, { useState } from 'react';

const EditableText = ({ value, onChange, fontSize }) => {
	const [isEditing, setIsEditing] = useState(false);

	const handleDoubleClick = () => setIsEditing(true);
	const handleBlur = () => setIsEditing(false);

	return isEditing ? (
		<input
			type="text"
			value={value}
			onChange={(e) => onChange(e.target.value)}
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
		<div
			style={{
				width: '100%',
				height: '100%',
			}}
			onDoubleClick={handleDoubleClick}
		>
			{value || 'ダブルクリックで編集'}
		</div>
	);
};

export default EditableText;
