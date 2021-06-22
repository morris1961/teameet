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
    const [time_voted, setTimeVoted] = useState(false)
    const [place_voted, setPlaceVoted] = useState(false)
    const [isSelectPlace, setIsSelectPlace] = useState(false)
    const [isSelectTime, setIsSelectTime] = useState(false)
    const [time_result, setTimeResult] = useState('')
    const [place_result, setPlaceResult] = useState('')
    const [status, setStatus] = useState();
    const [UID, setUID] = useState("");
    const [error_msg, setError_msg] = useState("");
    const [recent, setRecent] = useState([{}]);
    const [voting, setVoting] = useState([{}]);
    const [admin, setAdmin] = useState("");
    const [GID, setGID] = useState("");
    const [mess, setMess] = useState("");

    client.onopen = () => {
        console.log("client connected")
    }

    client.onmessage = (byteString) => {
        const message = JSON.parse(byteString.data);
        setMess(message)
        const { api, data } = message
        console.log(message)
        switch (api) {
            case "register": {
                setMess(data);
                break
            }
            case "login": {
                setMess(data);
                break
            }
            case "index": {
                setMess(data);
                break
            }
            case "createGroup": {
                setMess(data);
                break
            }
            case "joinGroup": {
                setMess(data);
                break
            }
            case "renewProfile": {
                setMess(data);
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
                const { status } = data;
                if(status === true){
                    setFile(data.file)
                }
                else{
                    console.log("DB error")
                }
                break
            }
            case "createDiscussion": {
                setDiscussions(data.discussions)
                break
            }
            case "discussion": {
                const { status } = data;
                if (status === true){
                    setSubject(data.subject)
                    setDiscussContent(data.content)
                    setIsAdmin(data.isAdmin)
                    
                }
                break
            }
            case "time": {
                const { status } = data;
                if (status === true){
                    setTimeOptions(data.time_options)
                    setIsDue(data.isDue)
                    setIsAdmin(data.isAdmin)
                    setTimeVoted(data.voted)
                    setIsSelectTime(data.isSelect)
                    setTimeResult(data.time_result)
                }
                break
            }
            case "place": {
                const { status } = data;
                if (status === true){
                    setPlaceOptions(data.place_options)
                    setIsDue(data.isDue)
                    setIsAdmin(data.isAdmin)
                    setPlaceVoted(data.voted)
                    setIsSelectPlace(data.isSelect)
                    setPlaceResult(data.place_result)
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
            case "votePlace":{
                const { status } = data;
                if (status === true){
                    setPlaceOptions(data.place_options)
                    setPlaceVoted(data.status)
                }
                break

            }
            case "voteTime":{
                const { status } = data;
                if (status === true){
                    setTimeOptions(data.time_options)
                    setTimeVoted(data.status)
                }
                break

            }
            case "confirmTime":{
                const { status } = data;
                if(status === true){
                    setTimeResult(data.time_result)
                    setIsSelectTime(data.status)
                }
                break
            }
            case "confirmPlace":{
                const { status } = data;
                if(status === true){
                    setPlaceResult(data.place_result)
                    setIsSelectPlace(data.status)
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
        time_voted,
        place_voted,
        place_options,
        isSelectTime,
        isSelectPlace,
        time_result,
        place_result,
        status,
        UID,
        error_msg,
        recent,
        voting,
        admin,
        GID,
        time_options,
        place_options,
        mess,
    }
}
export default useData;