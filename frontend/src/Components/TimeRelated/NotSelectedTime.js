import { useEffect, useState } from "react";
import { Divider, Row, Col, Radio, Button, Tag } from 'antd';
import moment from 'moment';
import 'moment-timezone';


const NotSelectedTime = ({UID, DID, time_options, isAdmin, sendData, displayStatus, message}) =>{
    const [show_options, setShowOptions] = useState([])
    const [time_result, setTimeResult] = useState('')
    const [max, setMax] = useState(0)
    const [loading, setLoading] = useState(false)


    useEffect(()=>{
        if(time_options){
            const options = Object.keys(time_options)
            let newShowOptions = [] // 這裡改 show_options 會出 error
            let newMax = 0
            options.forEach((e)=>{
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
    }, [time_options])

    const handleSubmit = () =>{
        setLoading(true)
        if(time_result === ''){
            displayStatus({type: 'error', msg: '請選擇最終時間'})
        }

        let data = {UID, DID, time_result}
        sendData("confirmTime", data)
    }

    useEffect(()=>{
        const { data } = message
        if(message.api === 'confirmTime'){
          setLoading(false)
          if(message.status === true){
            displayStatus({type: 'error', msg: '確認成功'})
          }
          else{
            displayStatus({type: 'error', msg: '確認失敗'})
          }
        }
        
      }, [message])

    return(
        <>
            <Row>
                <Col span={2}></Col>
                <Col span={18}>
                    {isAdmin?
                    (<Divider style={{ borderColor: "#d8d8d8", color: "#D0D0D0"}} orientation="center" plain>
                        投票結果！（您還未選擇最終結果）
                    </Divider>):(
                    <Divider style={{ borderColor: "#d8d8d8", color: "#D0D0D0"}} orientation="center" plain>
                        投票結果！（創建者還未選擇最終結果）
                    </Divider>
                    )}
                    <h3 className='content'>如下：</h3>
                    {isAdmin?(
                        <>
                        <Radio.Group name="radiogroup" onChange={(e)=>{
                            let time = moment.tz(e.target.value, 'Asia/Taipei').format(); setTimeResult(time)}}>
                            {show_options.map(({option, cnt}, index)=>{
                                if(cnt === max){
                                    return(<Radio key={index} value={option} style={{margin:'3px'}}>
                                        <div style={{display: "flex", height: "23px"}}>
                                            <p className='content'>{option}： </p>
                                            <Tag color="cyan" textAlign='center'>{cnt} 票</Tag>
                                        </div>
                                    </Radio>)
                                }
                                else{
                                    return(<Radio key={index} value={option} style={{margin:'3px'}} disabled={true}>
                                        <div style={{display: "flex", height: "23px"}}>
                                            <p className='content'>{option}： </p>
                                            <Tag color="blue">{cnt} 票</Tag>
                                        </div>
                                    </Radio>)
                                }
                            })}
                        </Radio.Group>
                        <div style={{display: "flex", justifyContent: "flex-end", marginRight: "5%"}}>
                            <Button type="primary" htmlType="submit" style={{marginTop: "10px"}} onClick={handleSubmit} loading={loading}>
                                確認時間
                            </Button>
                        </div>
                        </>
                    ):(
                    <div>
                        {show_options.map(({option, cnt}, index)=>{
                            if(cnt === max){
                                return(
                                    <div key={index} style={{display: "flex", height: "23px", margin:'3px'}}>
                                        <p className='content'>{option}： </p>
                                        <Tag color="cyan">{cnt} 票</Tag>
                                    </div>
                                )
                            }
                            else{
                                return (
                                    <div key={index} style={{display: "flex", height: "23px", margin:'3px'}}>
                                        <p className='content'>{option}： </p>
                                        <Tag color="blue">{cnt} 票</Tag>
                                    </div>)
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