const express = require('express');
const app = express();
const path = require('path');

app.set('port', process.env.PORT || 3000);

const publicPath = path.resolve(__dirname, "../public");
app.use(express.static(publicPath));


app.get('/', (req,res) =>{
    res.sendFile(path.resolve(__dirname, 'views', 'home.html'));
})

//websockets
const { Server } = require('socket.io');
const io = new Server(server);

io.on('connection', (socket)=>{
    console.log('new connection', socket.id);

    socket.on('chat:message', (data) =>{
        io.sockets.emit('chat:message', data);
    })

    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data)
    })
})

//start the server
const server = app.listen(app.get('port'), ()=>{
    console.log(`Escuchando al servidor http://localhost:${app.get('port')}`);
});


