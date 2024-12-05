import React from 'react';
import Menu from './Menu';

class ParentPage extends React.Component {
  // コンストラクタ
  constructor(props){
    super(props);

    // stateを初期化
    this.state = {message: "Please Click Anywhere you like."}

    // メニュー要素への参照を初期化（後ほどレンダラーの中でrefを割り当てます。）
    this.menu = null;

    // イベントハンドラのバインド
    this.onContextMenu = this.onContextMenu.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
  }

  // 右クリックイベントハンドラ
  onContextMenu(event) {
    // preventDefault()を忘れると、普通の右クリックメニューが表示されますよ。
    event.preventDefault();

    // メニュー要素の"show()"メソッドを呼び出します。
    // 引数にはマウスポインタの位置情報を渡してあげます。
    this.menu.show(event.clientX, event.clientY);
  }

  // 右クリックメニューでメニューが選択された際にコールバックしてもらうメソッドです。
  // 選択されたメニューの内容(innnerHTML)をstateに設定しています。
  // (これにより、画面左上のメッセージが切り替わるはず。)
  onMenuItemClick(message) {
    this.setState({message: message});
  }

  // レンダラー
  render(){
    return (
      <React.Fragment>
        { /* 自身の右クリックイベントハンドラをonContextMenu=で指定 */ }
        <div className="ParentBox" onContextMenu={this.onContextMenu} >
         { this.state.message }
         { /* コンポーネントもrefで参照できるので、子要素のメソッドを呼び出すことが可能になります。 */ }
         <Menu onMenuItemClick={this.onMenuItemClick} ref={(node) => this.menu = node} />
        </div>
      </React.Fragment>
    );
  }
}

export default ParentPage;