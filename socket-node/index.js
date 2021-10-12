
const express = require('express');
const cors = require('cors')
const app = express();
const server = app.listen(3000, () => { console.log('connect') });
const http = require('http');
const io = require("socket.io")(server)

app.use(cors())

let arr = []
io.on('connection', (socket) => {
    console.log("Connect socket ...");

    socket.on('sendPointsDraw', (pointsDraw, callback) => {
        console.log('points_____:', pointsDraw)
        io.emit('pointsDrawToClient', pointsDraw)
    })
})
