import {useState} from "react";

const useData = () =>{
    const [file, setFile] = useState("")
    const [code, setCode] = useState("")
    const [group, setGroup] = useState("")
    const [UName, setUName] = useState("")
    const [isAdmin, setIsAdmin] = useState("")
    const [content, setContent] = useState("")
    const [discussion, setDiscussion] = useState([])
    const client = new WebSocket('ws://localhost:4000')
    console.log("hello")
    client.onopen = () =>{
        console.log("client connected")
    }
    
    client.onmessage = (byteString) =>{
        const message = JSON.parse(byteString.data);
        const { api, data } = message

        switch(api){
            case "register":{
                break
            }
            case "login":{
                break
            }
            case "index":{
                const { status } = data;
                if(status === true){
                    let un = data.UName
                    let g = data.group
                    setUName(un)
                    setGroup(g)
                }
                break
            }
            case "createGroup":{
                break
            }
            case "joinGroup":{
                break
            }
            case "renewProfile":{
                break
            }
            case "group":{
                const { status } = data;
                if(status === "true"){
                    setCode(data.code)
                    // setG(message.GName)
                    setContent(data.content)
                    setDiscussion(data.discussion)
                    setIsAdmin(data.isAdmin)
                    setFile(data.file)
                }
                
                break
            }
            case "renewFile":{
                break
            }
            case "createDiscussion":{
                break
            }
            case "discussion":{
                break
            }
            case "time":{
                break
            }
            default: 
                break
        }
    }

    
    const sendData = (api, data)=>{
        const message = {api, data}
        client.send(JSON.stringify(message))
        // client.onopen = async () =>{
        // }
    }
    
    return{
        sendData,
        code, 
        group, 
        isAdmin, 
        content,
        discussion,
        file,
        UName,
    }
}
export default useData;