import { useEffect } from "react";

function Anglechange({
	selectedBoxId,
	isTextBoxFocused,
	setTextBoxes,
}){
	const rotateRight = () => {
			setTextBoxes((prevTextBoxes) =>
				prevTextBoxes.map((box) =>
					box.id === selectedBoxId
						? { ...box, rotate: (box.rotate || 0) + 5 } // 右回転 (5度増加)
						: box
				)
			);
		};
	
	const rotateLeft = () => {
		setTextBoxes((prevTextBoxes) =>
			prevTextBoxes.map((box) =>
				box.id === selectedBoxId
					? { ...box, rotate: (box.rotate || 0) - 5 } // 左回転 (5度減少)
					: box
			)
		);
	};
	
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (isTextBoxFocused && selectedBoxId !== null) {
				if (event.key === "ArrowRight") {
                    rotateRight();
				} else if (event.key === "ArrowLeft") {
					rotateLeft();
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [isTextBoxFocused, selectedBoxId]);

    return null;

}

export default Anglechange;
