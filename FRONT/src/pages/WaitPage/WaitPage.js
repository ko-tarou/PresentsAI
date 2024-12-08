import React, { useState, useEffect } from 'react';
import './WaitPage.css';

const WaitPage = () => {
  const [loading, setLoading] = useState(true);

  // ローディング画面を3秒間表示
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // 3秒後にローディングを終了
    }, 4000); // 3000ミリ秒 = 3秒

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="loading-screen">
      {loading && <div className="loader"></div>} {/* ローディング中はローダーだけ表示 */}
    </div>
  );
};

export default WaitPage;
