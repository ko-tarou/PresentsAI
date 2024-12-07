import axios from 'axios';

const apiKey = process.env.OPENAI_API_KEY; // .envファイルに保存
const apiUrl = 'https://api.openai.com/v1/chat/completions';

export const callChatGPT = async (prompt) => {
  try {
    const response = await axios.post(
      apiUrl,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'あなたは親切なアシスタントです。' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 50,
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('API呼び出しエラー:', error.response?.data || error.message);
    return 'エラーが発生しました';
  }
};
