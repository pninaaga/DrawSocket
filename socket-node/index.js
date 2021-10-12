
const express = require('express');
const cors = require('cors')
const app = express();
const server = app.listen(3000, () => { console.log('connect') });
const http = require('http');
const io = require("socket.io")(server)

app.use(cors())

let arrPointsDraw = []
io.on('connection', (socket) => {
    console.log("Connect socket ...");

    socket.on('sendPointsDraw', (pointsDraw, callback) => {
        console.log('points_____:', pointsDraw)
        arrPointsDraw.push(pointsDraw)
        io.emit('pointsDrawToClient', pointsDraw)
    })
    socket.on('sendConnect', () => {
        console.log('arrPointsDrawwwwwwwwwwwwwwwwwww',arrPointsDraw)
        io.emit('getStartDraw', arrPointsDraw.length>0?arrPointsDraw:'-1')
    })

})
