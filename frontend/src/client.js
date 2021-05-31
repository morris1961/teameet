import {useState} from "react";

const useData = () =>{
    const [messages, setMessages]  = useState([])
    const [status, setStatus] = useState({})
    const client = new WebSocket('ws://localhost:4000')

    client.onmessage = (message) =>{
        message = JSON.parse(message);
        const { api } = message;
        switch(api){
            case "register":{
                setMessages([...messages, payload]) // 把 payload 接在原本的 messages 後面
                break
            }
            case "login":{
                setStatus(payload)
                break
            }
            case "index":{
                setMessages(payload)
                break
            }
            case "createGroup":{
                setMessages([])
                break
            }
            case "joinGroup":{
                setMessages([])
                break
            }
            case "renewProfile":{
                setMessages([])
                break
            }
            case "group":{
                setMessages([])
                break
            }
            case "renewFile":{
                setMessages([])
                break
            }
            case "createDiscussion":{
                setMessages([])
                break
            }
            case "discussion":{
                setMessages([])
                break
            }
            case "time":{
                setMessages([])
                break
            }
            default: 
                break
        }
    }

    const sendData = async (data)=>{
        await client.send(
            JSON.stringify(data)
        )
    }
    const sendMessage = (payload) =>{
        sendData(["input", payload])
    }

    return{
        status,
        messages,
        sendMessage,
    }
}
export default useData;