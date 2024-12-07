import React, { useState } from 'react';

const AudioRecognition = () => {
const [prompt, setPrompt] = useState('');
const [response, setResponse] = useState('');

const handleSubmit = async () => {
	try {
	const res = await fetch('http://localhost:5000/api/chatgpt', {
		method: 'POST',
		headers: {
		'Content-Type': 'application/json',
		},
		body: JSON.stringify({ prompt }), // ユーザーが入力したプロンプトを送信
	});

	const data = await res.json();
	setResponse(data.message); // ChatGPTの応答を設定
	} catch (error) {
	console.error('Error calling ChatGPT API:', error);
	setResponse('エラーが発生しました。');
	}
};

return (
	<div>
		<h1>ChatGPTと対話</h1>
		<textarea
			value={prompt}
			onChange={(e) => setPrompt(e.target.value)}
			placeholder="質問を入力してください"
			rows={4}
			cols={50}
		/>
		<br/>
		<button onClick={handleSubmit}>送信</button>
		<h2>ChatGPTの応答:</h2>
		<p>{response}</p>
	</div>
);
};

export default AudioRecognition;