
const http = require('http');
const express = require('express');
const cors = require('cors')
const app = express();
const server = app.listen(3000, () => { console.log('connect') });
const io = require("socket.io")(server)
app.use(cors())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
let arr = []
io.on('connection', (socket) => {
    console.log("Connected succesfully to the socket ...");
    socket.on('getMessage',()=>{
        io.emit('getMessageToClient',arr)
    })

    socket.on('sendMessage', (massageText, callback) => {
        arr.push(massageText)
        console.log('message:', arr)
        io.emit('messageToClient', arr)
    })
})
