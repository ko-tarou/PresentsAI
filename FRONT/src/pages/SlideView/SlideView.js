import React from "react";
import "./SlideView.css";

const SlideView = () => {
const boxCount = 12; 
return (
	<div className="SlideView">
	<div className="leftside">
		<button className="SlideView-Button1">ボタン1</button>
		<button className="SlideView-Button2">ボタン2</button>
		<button className="SlideView-Button3">ボタン3</button>
		<button className="SlideView-Button4">ボタン4</button>
	</div>
	<div className="rightside">
		<div className="box-whole">
		{Array.from({ length: boxCount }).map((_, index) => (
			<div className="box" key={index}></div>
		))}
		</div>
	</div>
	</div>
);
};

export default SlideView;
