import React, { useEffect } from "react";

function FontSize({
    selectedBoxId,
    isTextBoxFocused,
    setTextBoxes,
}) {
    const increaseFontSize = () => {
        setTextBoxes((prevTextBoxes) =>
            prevTextBoxes.map((box) =>
                box.id === selectedBoxId
                    ? { ...box, fontSize: (box.fontSize || 16) + 1 }
                    : box
            )
        );
    };

    const decreaseFontSize = () => {
        setTextBoxes((prevTextBoxes) =>
            prevTextBoxes.map((box) =>
                box.id === selectedBoxId
                    ? { ...box, fontSize: Math.max((box.fontSize || 16) - 1, 1) }
                    : box
            )
        );
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isTextBoxFocused && selectedBoxId !== null) {
                if (event.key === "ArrowUp") {
                    increaseFontSize();
                } else if (event.key === "ArrowDown") {
                    decreaseFontSize();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isTextBoxFocused, selectedBoxId]);

    return null; // UIを持たないコンポーネントとして機能
}

export default FontSize;
