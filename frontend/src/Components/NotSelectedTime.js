import { useEffect, useState } from "react";
import { Divider, Row, Col, Radio, Button } from 'antd';


const NotSelectedTime = ({UID, DID, time_options, isAdmin, sendData, displayStatus}) =>{
    const show_options = []
    let max = 0
    const options = Object.keys(time_options)
    const [time_result, setTimeResult] = useState('')

    useEffect(()=>{
        options.map((e)=>{
            let cnt = time_options[e].length
            if(cnt > max){
                max = cnt
            }
            show_options.push({option:e, cnt})
        }) 

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
                        投票結果！
                    </Divider>
                    <h2>如下：</h2>
                    {isAdmin?(
                        <>
                        <Radio.Group name="radiogroup" onChange={(e)=>{setTimeResult(e.target.value)}}>
                            {show_options.map(({option, cnt})=>{
                                if(cnt === max){
                                    return(<p>{option}: {cnt}</p>)
                                }
                                else{
                                    return(<Radio value={option}>{option}: {cnt}</Radio>)
                                }
                            })}
                        </Radio.Group>
                        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                            確認時間
                        </Button>
                        </>
                    ):(
                    <div>
                        {show_options.map(({option, cnt})=>(<p>{option}: {cnt}</p>))}
                    </div>
                    )}
                    
                </Col>
            </Row>
        </>
    )

}

export default NotSelectedTime 