//yarn add socket.io
//yarn add socket.io-client

const io= require('socket.io').listen(3100)
let roomName = ""
io.on('connection', socket=>{
    console.log("server socket is connected with client socket")

    socket.on('reqMsg', data=>{
        console.log(data)
        io.to(roomName).emit('recMsg', data)
    })
    socket.on('joinRoom', data=>{
        console.log(`room name : ${data.roomName}에 들어왔습니다.`)
        socket.join(data.roomName)
        roomName = data.roomName
    })
    socket.on("leaveRoom", data=>{
        socket.leave(data.leave)
        console.log(`roomName : ${roomName}을 나갑니다.`)
    })
})

