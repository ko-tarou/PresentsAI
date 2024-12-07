import React, { useEffect } from "react";

function ZindexBox({
    selectedBoxId,
    isTextBoxFocused,
    setTextBoxes,
}) {
    const increaseZIndex = () => {
        setTextBoxes((prevTextBoxes) =>
            prevTextBoxes.map((box) =>
                box.id === selectedBoxId
                    ? { ...box, zIndex: (box.zIndex || 50) + 1 }
                    : box
            )
        );
    };

    const decreaseZIndex = () => {
        setTextBoxes((prevTextBoxes) =>
            prevTextBoxes.map((box) =>
                box.id === selectedBoxId
                    ? { ...box, zIndex: Math.max((box.zIndex || 50) - 1, 0) }
                    : box
            )
        );
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (isTextBoxFocused && selectedBoxId !== null) {
                if (event.key === "ArrowUp") {
                    increaseZIndex();
                } else if (event.key === "ArrowDown") {
                    decreaseZIndex();
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isTextBoxFocused, selectedBoxId]);

    return null; // UIを持たないコンポーネントとして機能
}

export default ZindexBox;
