import React, { useState } from "react";
import "./ButtonSave.css"
import { useNavigate } from "react-router-dom"; // ページ遷移用

const ButtonSave = () => {
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate();

    const handleSave = () => {
        setShowMessage(true); // メッセージを表示

    // 3秒後にページ遷移
        setTimeout(() => {
            navigate("/slideview"); // 遷移先のパス
        }, 1500);
    };

    return (
        <div>
            <button className="save-button" onClick={handleSave}>
                保存
            </button>
            {showMessage && <div className="save-message">保存されました！</div>}
        </div>
    );
};

export default ButtonSave;
