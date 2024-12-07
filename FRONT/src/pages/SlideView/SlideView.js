import React from "react";
import "./SlideView.css";

const SlideView = () => {
  const boxCount = 12;
  return (
    <div className="SlideView">
    	<div className="leftside">
	  		<input type="text" placeholder="スライド名を入力" className="search-field-leftside" />
		<button className="search-button-leftside">検索</button>
	  </div>
      <div className="rightside">
        <div className="box-whole">
          {Array.from({ length: boxCount }).map((_, index) => (
            <div className="box-container" key={index}>
              <div className="box"></div>
              <div className="button-group">
                <button className="button feedback-button">💬</button>
                <button className="button pin-button">⭐</button>
                <button className="button create-button">➕</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
 
};

export default SlideView;
