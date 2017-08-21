const express = require('express');

const app = express();
const server = require('http').Server(app);

const usersConnected = [];

app.set("view options", { layout: false });
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res) {
    res.render('index.html');
});

// Chargement de socket.io
const io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', (socket) => {
    console.log('Un client est connecté !');
    console.log(socket.id);

    usersConnected.push(socket.id);

    // console.log("Nombre d'utilisateurs connectés => ", usersConnected.length);

    let i = 0;

    setInterval(function() {
        socket.emit('news', { hello: 'world', index: i++ });
    }, 2000);

    socket.on('response', (data) => {
        console.log(socket.id);
        console.log(data);
    });
});


server.listen(3000, () => console.log("Server started on 3000"));