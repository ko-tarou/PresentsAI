import React from 'react';
import Char from "./Char/char.js"

function TabContent({ activeTab }) {
  return (
    <div style={{display: "flex",flexDirection : "column",height:"100%",width:"100%",justifyContent: "center",alignItems: "center" }}>
      {activeTab === "tab1" && <div><Char/></div>}
      {activeTab === "tab2" && <div>タブ2の内容</div>}
      {activeTab === "tab3" && <div>タブ3の内容</div>}
      {activeTab === "tab4" && <div>タブ4の内容</div>}
      {activeTab === "tab5" && <div>タブ5の内容</div>}
    </div>
  );
}

export default TabContent;