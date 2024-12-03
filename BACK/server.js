const WebSocket = require('ws');

const server = new WebSocket.Server({ port:8080 });

server.on('connection',(socket) => {
    console.log('接続完了')

    socket.on('message',(message) => {
        console.log('受信:',message);

        socket.send('サーバーからの返信:${message}');
    });

    socket.on('close',() => {
        console.log('切断しました');
    })
})

console.log('起動しました');