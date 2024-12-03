import React, { useEffect, useState } from 'react'

function useWebSocket() {
	const [messages,setMessages] = useState([]);
	const[input,setInput] = useState('');
	const[socket,setSocket] = useState(null);

	useEffect(() => {
		const ws = new WebSocket('ws://localhost:8080');

		ws.onopen = () => {
			console.log('接続完了')
		}

		ws.onmessage = (event) => {
			console.log('サーバーからのメッセージ:',event.data)
			setMessages((prev) => [...prev,event.data])
		}

		ws.onclose = () => {
			console.log('切断しました')
		}

		ws.onerror = (error) => {
			console.error('WebSocketエラー',error)
		}

		setSocket(ws);

		return () => {
			ws.close();
		}
	},[])

	const sendMessage = () => {
		if (socket && input){
			socket.send(input);
			setInput('');
		}
	}

	return { messages, input, setInput, sendMessage };
}

export default useWebSocket