require('dotenv').config(); // .envファイルを読み込む
const axios = require('axios');

// OpenAI APIの設定
const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';

// ユーザーからの入力を取得
const prompt = 'あなたの好きな食べ物は何ですか？';

// ChatGPT APIを呼び出す関数
async function callChatGPT(prompt) {
try {
	const response = await axios.post(
	apiUrl,
	{
		model: 'gpt-3.5-turbo', // 使用するモデル
		messages: [
		{ role: 'system', content: 'あなたは親切なアシスタントです。' }, // システムの指示
		{ role: 'user', content: prompt }, // ユーザーからの入力
		],
		max_tokens: 100, // 応答のトークン数の制限
		temperature: 0.7, // 応答の創造性を制御
	},
	{
		headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${apiKey}`,
		},
	}
	);

	// ChatGPTの応答を取得
	const message = response.data.choices[0].message.content;
	console.log('ChatGPTの応答:', message);
} catch (error) {
	console.error('API呼び出しエラー:', error.response?.data || error.message);
}
}

// 関数を実行
callChatGPT(prompt);
