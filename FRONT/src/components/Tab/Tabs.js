import React from 'react';

function Tabs({ activeTab, setActiveTab }) {
return (
	<div className = "tabs" style={{ display: 'flex', flexDirection: 'column'}}>
	<button 
		onClick={() => setActiveTab("tab1")}
		style={{ backgroundColor: activeTab === "tab1" ? 'lightblue' : 'white' ,height:"20%" }}>
		文字
	</button>
	<button 
		onClick={() => setActiveTab("tab2")} 
		style={{ backgroundColor: activeTab === "tab2" ? 'lightblue' : 'white' ,height:"20%"}}>
		図形
	</button>
	<button 
		onClick={() => setActiveTab("tab3")} 
		style={{ backgroundColor: activeTab === "tab3" ? 'lightblue' : 'white' ,height:"20%"}}>
		タブ3
	</button>
	<button 
		onClick={() => setActiveTab("tab4")} 
		style={{ backgroundColor: activeTab === "tab4" ? 'lightblue' : 'white' ,height:"20%"}}>
		タブ4
	</button>
	<button 
		onClick={() => setActiveTab("tab5")} 
		style={{ backgroundColor: activeTab === "tab5" ? 'lightblue' : 'white' ,height:"20%"}}>
		タブ5
	</button>
	</div>
);
}

export default Tabs;