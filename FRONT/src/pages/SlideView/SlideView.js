import React from "react";
import "./SlideView.css";

const SlideView = () => {
const boxCount = 12; 
return (
	<div className="SlideView">
	<div className="leftside">左側</div>
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
