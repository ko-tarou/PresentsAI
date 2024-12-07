import './AnalysisPage.css';
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
	const data = {
    labels: ['項目1', '項目2', '項目3', '項目4', '項目5'], // 五角形の頂点の名前
    datasets: [
		{
			label: '分析結果',
        	data: [80, 65, 90, 70, 85],
        	backgroundColor: 'rgba(52, 58, 64, 0.1)', // チャートの背景色
            borderColor: 'rgba(255, 99, 132, 1)', // 5角形のふちと角度線を同じ色に設定（赤色）
			borderWidth: 2,
        },
    ],
};

const options = {
    responsive: true,
    scales: {
		r: {
        	angleLines: { 
                color: 'rgba(255, 255, 255, 0.3)', // 角度線の色（例：赤色）
				 },
        	grid: { color: 'rgba(255, 255, 255, 0.3)', // 内側のグリッド線を白色（薄い白色）に設定
        
				 },
			pointLabels: {
				color: '#fff' // 目盛りのラベルを白色に設定
			},
			ticks: { display: false },
			beginAtZero: true,
		},
    },
    plugins: {
		legend: {
        	position: 'top',
			},
    },
};

return (
	<div class="box2-8">
		<div className="AnalysisPage">
			<div className="result">
				<h2>✔ 結果発表</h2>
			</div>
			<div className="content">
				<div className="description">
					<h3>項目の説明</h3>
					<ul>
						<li><strong>項目1:</strong> 説明文1</li>
						<li><strong>項目2:</strong> 説明文2</li>
						<li><strong>項目3:</strong> 説明文3</li>
						<li><strong>項目4:</strong> 説明文4</li>
						<li><strong>項目5:</strong> 説明文5</li>
					</ul>
				</div>
				<div className="chart">
					<Radar data={data} options={options} />
				</div>
			</div>
		</div>
	</div>
	
	);
}

export default AnalysisPage;

