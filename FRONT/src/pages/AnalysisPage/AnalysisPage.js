import './AnalysisPage.css';
import React, { useState } from 'react';
import { Radar } from 'react-chartjs-2';  // Radarコンポーネントをインポート
import { useNavigate } from 'react-router-dom'; // useNavigateをインポート

// 必要なチャート設定
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart.jsに必要なコンポーネントを登録
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function AnalysisPage() {
  const [responses, setResponses] = useState([]); // 複数の回答を保持
  const [loading, setLoading] = useState(false); // ローディング状態を管理
  const [scores] = useState([50, 30, 20, 10, 50]); // 初期スコアを[50, 30, 20, 10, 50]として設定
  const navigate = useNavigate(); // useNavigateフックを呼び出し

  const handleClose = () => {
    navigate('/SlidePage'); // SlidePageへの遷移
  };

  const questionsLabels = [
    "声の大きさ",
    "声のトーン",
    "話すスピード",
    "詰まった回数",
    "話の適切さ",
  ];

  // 質問を5つに変更
  const questions = [
    `アドバイスを100文字以内でください。発表の声の大きさの点数が100点中${scores[0]}だった。`,
    `アドバイスを100文字以内でください。発表の声のトーンの点数が100点中${scores[1]}点だった。`,
    `アドバイスを100文字以内でください。発表の話すスピードの点数が100点中${scores[2]}点だった。`,
    `アドバイスを100文字以内でください。発表の詰まった回数の点数が100点中${scores[3]}点だった。`,
    `アドバイスを100文字以内でください。発表の話の適切さの点数が100点中${scores[4]}点だった。`,
  ];

  // 質問をChatGPTに送信（同期的に動作する形で管理）
  const sendToChatGPT = async () => {
    setLoading(true); // ローディング開始

    try {
      let allResponses = []; // レスポンスを一時的に保存

      // 質問のインデックスを順番に処理
      for (let i = 0; i < questions.length; i++) {
        const res = await fetch('https://a433-153-221-223-4.ngrok-free.app/api/chatgpt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: questions[i] }), // 質問を送信
        });

        const data = await res.json();

        // デバッグ用にレスポンス内容をログ出力
        console.log('ChatGPT Response:', data);

        if (data && data.message) {
          const message = data.message; // GPTの応答全体
          allResponses.push(message); // レスポンスを配列に追加
        } else {
          console.error('Invalid response structure:', data);
          allResponses.push('エラーが発生しました。');
        }
      }

      setResponses(allResponses); // 最後にレスポンスセットを保存

    } catch (error) {
      console.error('Error calling ChatGPT API:', error);
      setResponses((prevResponses) => [...prevResponses, 'エラーが発生しました。']);
    }

    setLoading(false); // ローディング終了
  };

  // レーダーチャート用データ
  const data = {
    labels: ["声の大きさ", "声のトーン", "話すスピード", "詰まった回数", "話の適切さ"], // 五角形の頂点の名前
    datasets: scores.length > 0 ? [{
      label: '総合評価', // 評価結果を1つのデータセットとして表示
      data: scores, // scoresをそのまま利用（変更なし）
      backgroundColor: 'rgba(52, 58, 64, 0.1)', // チャートの背景色
      borderColor: 'rgba(255, 99, 132, 1)', // 5角形のふちと角度線を同じ色に設定（赤色）
      borderWidth: 2,
    }] : [], // 質問がなければ空のデータを表示
  };

  const options = {
    responsive: true,
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.3)', // 角度線の色
        },
        grid: { color: 'rgba(255, 255, 255, 0.3)' },
        pointLabels: {
          color: '#fff' // 目盛りのラベルを白色に設定
        },
        ticks: { display: false },
        beginAtZero: true,
        max: 100,
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // 平均点数を計算
  const averageScore = scores.reduce((total, score) => total + score, 0) / scores.length;

  return (
    <div className="box2-8">
      <div className="AnalysisPage">
        <div className="result">
          <h2>✔ 結果発表</h2>
          <button className='Closebutton' onClick={handleClose}>閉じる</button>
        </div>
        <div className="content">
            {/* 平均スコア表示ボックス */}
            <div className="average-score-box">
              <h1>点数: {averageScore.toFixed(2)}点</h1>
              <h4>声の大きさ: {scores[0]}点</h4>
              <h4>声のトーン: {scores[1]}点</h4>
              <h4>話すスピード: {scores[2]}点</h4>
              <h4>詰まった回数: {scores[3]}点</h4>
              <h4>話の適切さ: {scores[4]}点</h4>
            </div>

          {/* descriptionを分けたdiv */}
          <div className="chart">
            <Radar data={data} options={options} /> {/* レーダーチャートの表示 */}
          </div>
        </div>
      </div>

      <div className="description">
        <button 
          onClick={sendToChatGPT} 
          disabled={loading} // ローディング中は無効
        >
          {loading ? '処理中...' : '質問を送信'}
        </button>

        {/* 各質問とその応答をリストとして表示 */}
        {responses.map((response, index) => (
          <div key={index}>
            <p>{questionsLabels[index]}</p>
            <h5>{response}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AnalysisPage;
