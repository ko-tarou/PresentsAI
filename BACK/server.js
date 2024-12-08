const express = require('express');
const axios = require('axios');
const cors = require('cors'); // CORS対応
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors()); // フロントエンドとバックエンド間のリクエストを許可

// 環境変数からAPIキーを取得
const apiKey = process.env.OPENAI_API_KEY;
const apiUrl = 'https://api.openai.com/v1/chat/completions';

// 起動時に環境変数のチェック
if (!apiKey) {
  console.error('Error: OPENAI_API_KEY is not set in the environment variables.');
  process.exit(1); // サーバーを停止
}

// ChatGPT APIを呼び出すエンドポイント
app.post('/api/chatgpt', async (req, res) => {
  const { prompt } = req.body; // フロントエンドから送信されたプロンプトを取得

  // プロンプトが空の場合のエラーチェック
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'プロンプトが無効です。内容を入力してください。' });
  }

  try {
    const response = await axios.post(
      apiUrl,
      {
        model: 'gpt-3.5-turbo', // 使用するモデル
        messages: [
          { role: 'system', content: 'あなたは親切なアシスタントです。' }, // システムメッセージ
          { role: 'user', content: prompt }, // ユーザーメッセージ
        ],
        max_tokens: 200, // 応答のトークン数の制限
        temperature: 0.7, // 応答の創造性を制御
    	},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    // ChatGPTの応答を取得し、クライアントに返す
    const message = response.data.choices[0]?.message?.content || '応答がありません。';
    res.json({ message });
  } catch (error) {
    console.error('OpenAI API呼び出しエラー:', error.response?.data || error.message);
    res.status(500).json({ error: 'ChatGPT APIの呼び出しに失敗しました。' });
  }
});

// サーバーの起動
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
