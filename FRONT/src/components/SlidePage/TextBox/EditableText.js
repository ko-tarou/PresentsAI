import React, { useState, useEffect } from 'react';

const EditableText = ({ fontSize, storageKey = "editableText" }) => {
	// ローカルステートで文字を管理
	const [value, setValue] = useState('');
	const [isEditing, setIsEditing] = useState(false);

	// ページ読み込み時に localStorage から値を取得
	useEffect(() => {
		const savedValue = localStorage.getItem(storageKey);
		if (savedValue) {
			setValue(savedValue);
		}
	}, [storageKey]);

	// value が変更されたら localStorage に保存
	useEffect(() => {
		localStorage.setItem(storageKey, value);
	}, [value, storageKey]);

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
				fontSize: `${fontSize || 16}px`, // 非編集モードでもフォントサイズを適用
			}}
			onDoubleClick={handleDoubleClick} // ダブルクリックで編集モードに切り替え
		>
			{value || ''} {/* 初期表示 */}
		</div>
	);
};

export default EditableText;
