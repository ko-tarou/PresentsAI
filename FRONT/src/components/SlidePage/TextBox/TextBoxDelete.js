import React, { useEffect, useCallback } from 'react';

function KeyboardHandler({ selectedBoxId, isTextBoxFocused, setTextBoxes, socket, setSelectedBoxId }) {
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Backspace' && selectedBoxId !== null && !isTextBoxFocused) {
        setTextBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== selectedBoxId));
        socket.emit("deleteTextBox", selectedBoxId); // サーバーに削除を通知
        setSelectedBoxId(null);
      }
    },
    [selectedBoxId, isTextBoxFocused, setTextBoxes, socket, setSelectedBoxId]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return null; // UIを持たないため、何も描画しない
}

export default KeyboardHandler;
