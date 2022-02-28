//benötigte Pakete einbinden 
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

//zu verwendeten Port werwenden 
const PORT = process.env.PORT || 3000;


const app= express();
const server = http.createServer(app);
const io =  socketio(server);

server.listen(PORT, () => {
    console.log(`Example app listening at port ${PORT}`)
});

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    socket.on('message',msg =>{
        console.log(msg);

        socket.emit('message', 'Hallo Client');
        socket.broadcast.emit('message', 'Hello alle Client');
        io.emit('message', 'Hallo Wlet');
    })
});