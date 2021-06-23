import "../App.css";
import { useEffect, useState, useRef } from "react"
import {Tabs, Input} from "antd"


const ChatRoom = ({UName, displayStatus, messages, sendData, UID, GID}) =>{
    const [messageInput, setMessageInput] = useState("") 
    const endMsg = useRef(null) 

    const handleMessage = (msg) =>{
        let data = {UID, GID, body:msg}
        sendData('message', data)
    }

    useEffect(()=>{
        endMsg.current.scrollIntoView({behavior: "smooth"})
    })
    
    
    return(
        <>
            <div className="App-message">
                {console.log(messages)}
                {messages === undefined ? null:(messages === []? (<p>loading...</p>): (messages.map(({sender, body}, index)=>{

                    return sender === UName?(
                        <div id={index} style={{display: "flex", justifyContent: "flex-end"}} ref={index === messages.length - 1?endMsg:null}>
                            <p className="wrap">{body}</p>
                            <p style={{fontStyle:"italic"}}>{sender}  &ensp;</p> 
                        </div> //這裡 p 沒有 key 會噴 error //&ensp; -> 半形空格
                    ):(
                        <div id={index} style={{display: "flex", justifyContent: "flex-start"}}>
                            <p style={{fontStyle:"italic"}}>{sender}  &ensp;</p> 
                            <p className="wrap">{body}</p>
                        </div>
                    )})))}
            </div>
            
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
                handleMessage(msg)
                setMessageInput("")
                // endMsg.current.scrollIntoView({behavior: "smooth"})
            }}
            ></Input.Search>
        </>
    )
}
export default ChatRoom;