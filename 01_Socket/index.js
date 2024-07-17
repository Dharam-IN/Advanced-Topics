const express = require("express");
const http = require('http');
const path = require("path");
const {Server} = require("socket.io")

const PORT = 9000;
const app = express();
const server = http.createServer(app)
const io = new Server(server)

// SOCKET IO
io.on('connection', (socket) => {
    socket.on('user-message', (message) => {
        // console.log("User Message:- ", message)
        io.emit("message", message)
    })
})

app.use(express.static(path.resolve('./public')));

app.get("/" , (req, res) => {
    return res.sendFile("/public/index.html");
})



server.listen(PORT, () => console.log(`Server is Running On ${PORT}`));