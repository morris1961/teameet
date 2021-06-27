import "../App.css";
import { useEffect, useState, useRef } from "react"
import { Divider, Input } from "antd"
import moment from 'moment';
import 'moment-timezone';



const ChatRoom = ({UName, displayStatus, messages, sendData, UID, GID}) =>{
    const [messageInput, setMessageInput] = useState("") 
    const endMsg = useRef(null)  // 最新訊息的 ref

    // send new message
    const handleMessage = (msg) =>{
        let data = {UID, GID, body:msg}
        sendData('message', data)
    }

    // 滾輪自動滑到最新訊息
    useEffect(()=>{
        if(messages.length !== 0){
            endMsg.current.scrollIntoView({behavior: "smooth"})
        }
    }, [messages])
    
    let lastDate = ''
    return(
        <>
            <div className="ChatRoom">
                {messages === undefined ? null:(messages === []? (<p>loading...</p>): (messages.map(({sender, body, time}, index)=>{
                    let renderDate = false
                    let date = moment(time).tz('Asia/Taipei').format('YYYY/MM/DD')
                    if(lastDate !== date){
                        lastDate = date
                        renderDate = true
                    }
                    return sender === UName?(
                        <>
                            {renderDate?(
                            <Divider orientation="center" plain style={{color: "#ADADAD", fontStyle:"italic", fontSize: "10px"}}>
                                {date}
                            </Divider>):(null)}
                            <div key={index} style={{display: "flex", justifyContent: "flex-end"}} ref={index === messages.length - 1?endMsg:null}>
                                <p className="time" style={{marginRight: "5px"}}> {moment(time).tz('Asia/Taipei').format('HH:mm')} </p>
                                <p className="wrap" style={{marginRight: "5px"}}>{body}</p>
                                <p style={{fontStyle:"italic", fontWeight: "bold"}}>{sender}  &ensp;</p> 
                            </div> 
                        </>
                    ):(
                        <>
                            {renderDate?(
                            <Divider orientation="center" plain style={{color: "#ADADAD", fontStyle:"italic", fontSize: "10px"}}>
                                {date}
                            </Divider>):(null)}
                            <div key={index} style={{display: "flex", justifyContent: "flex-start"}} ref={index === messages.length - 1?endMsg:null}>
                                <p style={{fontStyle:"italic", fontWeight: "bold", marginLeft: "5px"}}>&ensp; {sender}  </p> 
                                <p className="wrap" style={{marginLeft: "5px"}}>{body}</p>
                                <p className="time" style={{marginLeft: "5px"}}> {moment(time).tz('Asia/Taipei').format('HH:mm')} </p>
                            </div>
                        </>
                    )})))}
            </div>
            
            <Input.Search
            placeholder="請在這裡輸入文字..."
            value={messageInput}
            enterButton="Send"
            onChange={(e)=>{setMessageInput(e.target.value)}}
            style={{maxWidth: "500px", margin: "2% 0", color: "#E0E0E0", borderRadius: "2px"}}
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
            }}
            ></Input.Search>
        </>
    )
}
export default ChatRoom;