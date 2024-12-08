import React, { useState } from 'react';

const EditableText = ({ fontSize }) => {
	// ローカルステートで文字を管理
	const [value, setValue] = useState('');
	const [isEditing, setIsEditing] = useState(false);

	const handleDoubleClick = () => setIsEditing(true); // 編集モードに切り替え
	const handleBlur = () => setIsEditing(false);       // 表示モードに戻る

	return isEditing ? (
		<input
			type="text"
			value={value} // ローカルステートの値を表示
			onChange={(e) => setValue(e.target.value)} // 入力された値をローカルステートに保存
			onBlur={handleBlur} // フォーカスが外れたら編集終了
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
				cursor: 'text',
			}}
			onDoubleClick={handleDoubleClick} // ダブルクリックで編集モードに切り替え
		>
			{value || ''} {/* 初期表示 */}
		</div>
	);
};

export default EditableText;
