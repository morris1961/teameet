import { useEffect, useState } from "react";
import { Divider, Row, Col, Radio, Button, Tag } from 'antd';
import moment from 'moment';
import 'moment-timezone';


const NotSelectedTime = ({UID, DID, time_options, isAdmin, sendData, displayStatus}) =>{
    const [show_options, setShowOptions] = useState([])
    const [time_result, setTimeResult] = useState('')
    const [max, setMax] = useState(0)

    useEffect(()=>{
        if(time_options){
            const options = Object.keys(time_options)
            let newShowOptions = [] // 這裡改 show_options 就不行?
            let newMax = 0
            options.map((e)=>{
                let cnt = time_options[e].length
                if(cnt > newMax){
                    newMax = cnt
                }
                let formated = moment(e).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm')
                newShowOptions.push({option:formated, cnt})
            }) 
            setMax(newMax)
            setShowOptions(newShowOptions)
        } 
    }, [])

    const handleSubmit = () =>{
        if(time_result === ''){
            displayStatus({type: 'error', msg: '請選擇最終時間'})
        }

        let data = {UID, DID, time_result}
        sendData("confirmTime", data)
    }

    return(
        <>
            <Row>
                <Col span={2}></Col>
                <Col span={18}>
                    <Divider orientation="center" plain>
                        投票結果！（創建討論者還未選擇最終結果）
                    </Divider>
                    <h2>如下：</h2>
                    {isAdmin?(
                        <>
                        <Radio.Group name="radiogroup" onChange={(e)=>{
                            let time = moment.tz(e.target.value, 'Asia/Taipei').format(); setTimeResult(time)}}>
                            {show_options.map(({option, cnt}, index)=>{
                                if(cnt === max){
                                    return(<Radio key={index} value={option} style={{margin:'3px'}}>{option}： 
                                        <Tag color="cyan">{cnt} 票</Tag>
                                    </Radio>)
                                }
                                else{
                                    return(<Radio key={index} value={option} style={{margin:'3px'}} disabled={true}>{option}： 
                                        <Tag color="blue">{cnt} 票</Tag>
                                    </Radio>)
                                }
                            })}
                        </Radio.Group>
                        <Button type="primary" htmlType="submit" style={{marginTop: "10px"}} onClick={handleSubmit}>
                            確認時間
                        </Button>
                        </>
                    ):(
                    <div>
                        {show_options.map(({option, cnt}, index)=>{
                            if(cnt === max){
                                return(
                                    <p key={index} value={option} style={{margin:'3px'}}>{option}： 
                                        <Tag color="cyan">{cnt} 票</Tag>
                                    </p>
                                )
                            }
                            else{
                                return (
                                    <p key={index} value={option} style={{margin:'3px'}}>{option}： 
                                        <Tag color="blue">{cnt} 票</Tag>
                                    </p>)
                            }
                            
                        })}
                    </div>
                    )}
                    
                </Col>
            </Row>
        </>
    )

}

export default NotSelectedTime 