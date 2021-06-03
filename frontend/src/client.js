import { useState } from "react";
const client = new WebSocket('ws://localhost:4000')


const useData = () => {
    const [file, setFile] = useState("")
    const [code, setCode] = useState("")
    const [group, setGroup] = useState([])
    const [UName, setUName] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const [discuss_content, setDiscussContent] = useState("") 
    const [discussions, setDiscussions] = useState([])
    const [GName, setGName] = useState("")
    const [subject, setSubject] = useState("")
    const [time_options, setTimeOptions] = useState({})
    const [place_options, setPlaceOptions] = useState({})
    const [isDue, setIsDue] = useState(false)
    const [voted, setVoted] = useState(false)


    client.onopen = () => {
        console.log("client connected")
    }

    client.onmessage = (byteString) => {
        const message = JSON.parse(byteString.data);
        const { api, data } = message
        switch (api) {
            case "register": {
                break
            }
            case "login": {
                break
            }
            case "index": {
                const { status } = data;
                if (status === true) {
                    let un = data.UName
                    let g = data.group
                    setUName(un)
                    setGroup(g)
                }
                break
            }
            case "createGroup": {
                break
            }
            case "joinGroup": {
                break
            }
            case "renewProfile": {
                break
            }
            case "group": {
                const { status } = data;
                if (status === true) {
                    setCode(data.code)
                    setGName(data.GName)
                    // setContent(data.content)
                    setDiscussions(data.discussions)
                    setIsAdmin(data.isAdmin)
                    setFile(data.file)
                }

                break
            }
            case "renewFile": {
                break
            }
            case "createDiscussion": {
                break
            }
            case "discussion": {
                const { status } = data;
                if (status === true){
                    setSubject(data.subject)
                    setDiscussContent(data.content)
                    setIsAdmin(data.isAdmin)
                    setVoted(data.voted)
                }
                break
            }
            case "time": {
                const { status } = data;
                if (status === true){
                    setTimeOptions(data.time_options)
                    setIsDue(data.isDue)
                    setIsAdmin(data.isAdmin)
                }
                break
            }
            case "place": {
                const { status } = data;
                if (status === true){
                    setPlaceOptions(data.place_options)
                    setIsDue(data.isDue)
                    setIsAdmin(data.isAdmin)
                }
                break
            }
            case "addPlace":{
                const { status } = data;
                if (status === true){
                    setPlaceOptions(data.place_options)
                }
                break

            }
            default:
                break
        }
    }


    const sendData = async (api, data) => {
        await waitForOpenSocket()
        const message = { api, data }
        client.send(JSON.stringify(message))
    }

    const waitForOpenSocket = () => {
        return new Promise((resolve, reject) => {
            const maxNumberOfAttempts = 10
            const intervalTime = 200 //ms
    
            let currentAttempt = 0
            const interval = setInterval(() => {
                if (currentAttempt > maxNumberOfAttempts - 1) {
                    clearInterval(interval)
                    reject(new Error('Maximum number of attempts exceeded'))
                } else if (client.readyState === client.OPEN) {
                    clearInterval(interval)
                    resolve()
                }
                currentAttempt++
            }, intervalTime)
        })
    }


    return {
        sendData,
        code,
        group,
        isAdmin,
        discussions,
        file,
        UName,
        GName,
        discuss_content,
        subject,
        time_options,
        isDue,
        voted,
        place_options,
    }
}
export default useData;