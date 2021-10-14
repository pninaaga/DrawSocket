
const express = require('express');
const cors = require('cors')
const app = express();
const server = app.listen(8080, () => { console.log('connect') });
const http = require('http');

app.use(cors())

const io = require("socket.io")(server,{
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET","POST"]
    }
})

let arrPointsDraw = []
let arrNames = []
io.on('connection', (socket) => {
    console.log("Connect socket ...");

    socket.on('sendPointsDraw', (pointsDraw, callback) => {
        console.log('points_____:', pointsDraw)
        arrPointsDraw.push(pointsDraw)
        io.emit('pointsDrawToClient', pointsDraw)
    })

    socket.on('sendConnect', () => {
        console.log('arrPointsDraw____:',arrPointsDraw)
        const setArrPoints= arrPointsDraw.length>0?arrPointsDraw:'-1'
        io.emit('getStartDraw', {setArrPoints,arrNames})
    })

    socket.on('sendName', (newName, callback) => {
        arrNames.push(newName)
        console.log('arrNames____:',arrNames)
    })
})
