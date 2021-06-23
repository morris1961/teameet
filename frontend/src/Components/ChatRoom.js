import "../App.css";
import { useState } from "react"
import {Tabs, Input} from "antd"


const ChatRoom = ({UName, displayStatus}) =>{
    const [messageInput, setMessageInput] = useState("") 
    const [messages, setMessages] = useState([{sender:"a", body:"b"}, {sender:"c", body:"d"}])
    
    return(
        <>
            {messages.map(({sender, body}, index)=>{
                return sender === UName?(
                    <div key={index} style={{display: "flex", justifyContent: "flex-end"}}>
                        <p className="wrap">{body}</p>
                        <p style={{fontStyle:"italic"}}>{sender}  &ensp;</p> 
                    </div> //這裡 p 沒有 key 會噴 error //&ensp; -> 半形空格
                ):(
                    <div key={index} style={{display: "flex", justifyContent: "flex-start"}}>
                        <p style={{fontStyle:"italic"}}>{sender}  &ensp;</p> 
                        <p className="wrap">{body}</p>
                    </div>
                )})}
        
            
            <Input.Search
            placeholder="Please enter message here..."
            value={messageInput}
            enterButton="Send"
            onChange={(e)=>{setMessageInput(e.target.value)}}
            style={{width: "300px", margin: "50px"}}
            onSearch={(msg)=>{
                if(!msg){
                    displayStatus({
                        type: "error",
                        msg: "Please enter message."
                    })
                    return
                } 
                // storeMessage(me, friend, msg, activeKey, chatLog)
                setMessageInput("")
            }}
            ></Input.Search>
        </>
    )
}
export default ChatRoom;