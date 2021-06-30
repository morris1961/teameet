import { useState } from "react";

var HOST = `ws://localhost:4000/`;
if (process.env.NODE_ENV === "production") {
    HOST = `${window.location.origin.toString()}`.replace(/^http/, 'ws');
}
const client = new WebSocket(HOST)

const useData = () => {
    const [discussions, setDiscussions] = useState([])
    const [file, setFile] = useState('')
    const [time_options, setTimeOptions] = useState({})
    const [place_options, setPlaceOptions] = useState({})
    const [isDue, setIsDue] = useState(false)
    const [time_voted, setTimeVoted] = useState(false)
    const [place_voted, setPlaceVoted] = useState(false)
    const [isSelectPlace, setIsSelectPlace] = useState(false)
    const [isSelectTime, setIsSelectTime] = useState(false)
    const [time_result, setTimeResult] = useState('')
    const [place_result, setPlaceResult] = useState('')
    const [mess, setMess] = useState("");

    var ping = null;

    client.onopen = () => {
        console.log("client connected")
        if (process.env.NODE_ENV === "production") {
            ping = setInterval(async function () {
                // await waitForOpenSocket()
                client.send(JSON.stringify("ping"))
            }, 30 * 1000);
        }
    }

    if (process.env.NODE_ENV === "production") {
        client.onclose = () => {
            clearInterval(ping);
        }
    }

    client.onmessage = (byteString) => {
        const message = JSON.parse(byteString.data);
        setMess(message)
        const { api, data } = message
        // console.log(message)
        switch (api) {
            case "group": {
                const { status } = data;
                if (status === true) {
                    setDiscussions(data.discussions)
                    setFile(data.file)
                }
                break
            }
            case "createDiscussion": {
                setDiscussions(data.discussions)
                break
            }
            case "time": {
                const { status } = data;
                if (status === true) {
                    setTimeOptions(data.time_options)
                    setIsDue(data.isDue)
                    setTimeVoted(data.voted)
                    setIsSelectTime(data.isSelect)
                    setTimeResult(data.time_result)
                }
                break
            }
            case "place": {
                const { status } = data;
                if (status === true) {
                    setPlaceOptions(data.place_options)
                    setIsDue(data.isDue)
                    setPlaceVoted(data.voted)
                    setIsSelectPlace(data.isSelect)
                    setPlaceResult(data.place_result)
                }
                break
            }
            case "addPlace": {
                const { status } = data;
                if (status === true) {
                    setPlaceOptions(data.place_options)
                }
                break

            }
            case "votePlace": {
                const { status } = data;
                if (status === true) {
                    setPlaceOptions(data.place_options)
                    setPlaceVoted(data.status)
                }
                break

            }
            case "voteTime": {
                const { status } = data;
                if (status === true) {
                    setTimeOptions(data.time_options)
                    setTimeVoted(data.status)
                }
                break

            }
            case "confirmTime": {
                const { status } = data;
                if (status === true) {
                    setTimeResult(data.time_result)
                    setIsSelectTime(data.status)
                }
                break
            }
            case "confirmPlace": {
                const { status } = data;
                if (status === true) {
                    setPlaceResult(data.place_result)
                    setIsSelectPlace(data.status)
                }
                break
            }
            case "renewFile": {
                const { status } = data;
                if (status === true) {
                    setFile(data.file)
                }
            }
            default:
                break
        }
    }

    // send meesage to backend
    const sendData = async (api, data) => {
        await waitForOpenSocket()
        const message = { api, data }
        client.send(JSON.stringify(message))
    }

    // 處理 websocket connect 連接需延遲傳送問題
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
        isDue,
        isSelectTime,
        isSelectPlace,
        time_voted,
        place_voted,
        time_options,
        place_options,
        time_result,
        place_result,
        mess,
        discussions,
        file,
        sendData,
    }
}
export default useData;