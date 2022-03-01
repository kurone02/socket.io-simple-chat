import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let users = {};

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/client.js', (req, res) => {
    res.sendFile(__dirname + "/client.js");
})

io.on('connection', (socket) => {

    socket.on('registered', (user) => {
        users[socket.id] = user;
        io.emit('registered', user);
    });

    socket.on('chat message', (user, msg) => {
        io.emit('chat message', user, msg);
    });
    
    socket.on('disconnect', (x) => {
        io.emit("leaving", users[socket.id]);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});