//yarn add express
//yarn add body-parser
//yarn add cors

import React, {useEffect, useState} from 'react';
import io from 'socket.io-client'
const SocketClient = () => {
    const [messages, setMessages] = useState([])
    const [username, setUsername] = useState("")
    const [message, setMessage] = useState("")
    const socket = io('https://secret-dawn-11778.herokuapp.com/')
    useEffect(()=>{
        socket.emit('joinRoom', {roomName : "room"})
    },[])

    const onclick = e=>{
        e.preventDefault()
        socket.emit('reqMsg',{
            author :username,
            message : message
        } )
    }

    socket.on('recMsg', data=>{
        addMessage(data)
    })

    const addMessage = data=>{
        console.log(`소켓에서 넘어온 data : ${data}`)
        setMessages(messages => [...messages,data])
    }
    const leaveRoom = ()=>{
        socket.emit('leaveRoom', {roomName : "room"})
    }
    return (
        <div>
            <div className="messages" style={{width : "300px", height : "500px", border : "1px solid black"}}>
                {messages.map(item=>{
                    return (
                        <div key={item.id}>{item.author} : {item.message}</div>
                    )
                })}
            </div><br/>
            <input type="text" placeholder="Username" className="form-control" value={username} onChange={e=>setUsername(e.target.value)}/>
            <br/>
            <input type="text" placeholder="Message" className="form-control" value={message} onChange={e=>setMessage(e.target.value)}/>
            <br/>
            <input type="button" value="msg submit" onClick={onclick}/>
            <br/>
            <button onClick={leaveRoom}>방 나가기</button>
        </div>
    );
};


export default SocketClient;