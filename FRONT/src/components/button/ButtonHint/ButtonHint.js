import './ButtonHint.css';
import React, { useState } from 'react';

const ButtonHint = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            <button className="circle-button" onClick={openModal}>?</button>
            <Modal isOpen={isModalOpen} onClose={closeModal} />
        </div>
        );
};

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>×</button>
                <h3>説明書</h3>
                <p>使い方ここに書く（行によって×ボタンの位置変更いる）</p>
            </div>
        </div>
    );
};

export default ButtonHint;