import { callChatGPT } from './api.js';
import dotenv from 'dotenv';

// .envファイルを読み込む
dotenv.config();

// 環境変数を確認
if (!process.env.OPENAI_API_KEY) {
console.error('Error: OPENAI_API_KEY is not defined in .env');
process.exit(1); // エラー終了
}

// テスト用プロンプト
const testPrompt = 'こんにちは、次にどんなことを話すべきですか？';

// APIを呼び出す
(async () => {
console.log('ChatGPT APIに問い合わせ中...');
const response = await callChatGPT(testPrompt);
console.log('ChatGPTからの応答:', response);
})();
