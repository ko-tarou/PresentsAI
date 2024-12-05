import React from 'react';
import PropTypes from 'prop-types';

class Menu extends React.Component {
// コンストラクタ
constructor(props){
	super(props);        // おまじないですね。

	// メニューを表示するdiv要素を参照するための変数です。
	this.menuElm = null;

	// イベントハンドラのバインド
	this.onCloseButtonClick = this.onCloseButtonClick.bind(this);
	this.onMenuItemClick = this.onMenuItemClick.bind(this);
	this.onKeyUp = this.onKeyUp.bind(this);

	// メニューに表示するアイテムの配列です。(適当すぎてやばい。)
	this.messages = ["You", "are", "incredible"];

}

// メニュー要素を表示(visibility="visible")します。
// 親要素から、呼び出されるメソッドです。
show(clientX, clientY){
	// 以下のようにstyle.top,style.leftを指定することで、好きな場所にメニューを表示できます。
	this.menuElm.style.top = clientY + "px";
	this.menuElm.style.left = clientX + "px";
	this.menuElm.style.visibility = "visible";

	// 表示したらフォーカスを割り当てます。
	// (これで、keyイベントを受け付けてくれるようになります。)
	this.menuElm.focus();
}

// メニューを閉じ(visibility="hidden"に変更し)ます。
close(){
	this.menuElm.style.visibility = "hidden";
}

// "close"クリック時のイベントハンドラ
onCloseButtonClick() {
	// close()を呼び出します。
	this.close();
}

// メニューアイテムクリック時のイベントハンドラ
onMenuItemClick(event) {
	// 自分自身を閉じて
	this.close();

	// 親要素から渡されたコールバック関数を呼び出します。
	// 引数には、アイテムに表示されているテキストを渡します。
	this.props.onMenuItemClick(event.target.innerHTML);
}

// エスケープキーで閉じるためのイベントハンドラです。
onKeyUp(event) {
	event.preventDefault();
	// 文字列で比較できるとは思いませんでした。。
	if ("Escape" == event.key) {
	this.close();
	}
}

// レンダラー
render(){
	return (
	<React.Fragment>
		{ /* refで要素を参照することで、styleの変更ができるようになります。 */ }
		<div className="MenuBox" ref={(node) => this.menuElm = node} onKeyUp={this.onKeyUp} tabIndex="0" >
		{
			this.messages.map((message) => 
			<div className="MenuItem" onClick={this.onMenuItemClick} key={ message }>{ message }</div> 
			)
		}
		<div className="MenuItem" onClick={this.onCloseButtonClick}>Close</div>
		</div>
	</React.Fragment>
	);
}
}

Menu.propTypes = {
onMenuItemClick: PropTypes.func
};

export default Menu;