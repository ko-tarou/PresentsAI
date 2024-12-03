import React from 'react';
import Char from "./Char/char.js"

function TabContent({ activeTab }) {
return (
	<div style={{display: "flex",flexDirection : "column",height:"100%",width:"100%",justifyContent: "center",alignItems: "center" }}>
	{activeTab === "tab1" && <div><Char/></div>}
	</div>
);
}

export default TabContent;