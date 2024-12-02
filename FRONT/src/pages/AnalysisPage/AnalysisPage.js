import React from 'react';
import { Radar } from 'react-chartjs-2';

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
	// データの定義
	const data = {
		labels: ['項目1', '項目2', '項目3', '項目4', '項目5'], // 五角形の頂点の名前
		datasets: [
			{
				label: '分析結果',
				data: [80, 65, 90, 70, 85], // 各項目のスコア
				backgroundColor: 'rgba(0, 123, 255, 0.2)', // 塗りつぶしの色
				borderColor: 'rgba(0, 123, 255, 1)', // 線の色
				borderWidth: 2,
			},
		],
	};

	// オプションの設定
	const options = {
		responsive: true,
		scales: {
			r: {
				angleLines: { color: '#ddd' }, // 軸の線の色
				grid: { color: '#eee' }, // 背景グリッド線の色
				ticks: { display: false }, // 軸目盛りの非表示
				beginAtZero: true, // 0から始める
			},
		},
		plugins: {
			legend: {
				position: 'top', // 凡例の位置
			},
		},
	};

	return (
		<div className='AnalysisPage' style={{ width: '600px', margin: 'auto' }}>
			<h2 style={{ textAlign: 'center' }}>分析結果</h2>
			<Radar data={data} options={options} />
		</div>
	);
}

export default AnalysisPage;
