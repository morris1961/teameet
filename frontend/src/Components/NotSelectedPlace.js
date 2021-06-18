import { useEffect, useState } from "react";
import { Divider, Row, Col, Radio, Button, Tag } from 'antd';


const NotSelectedPlace = ({UID, DID, place_options, isAdmin, sendData, displayStatus}) =>{
    const [show_options, setShowOptions] = useState([])
    const [place_result, setPlaceResult] = useState('')
    let max = 0

    useEffect(()=>{
        const options = Object.keys(place_options)
        let newShowOptions = [] // 這裡改 show_options 就不行?
        options.map((e)=>{
            let cnt = place_options[e].length
            if(cnt > max){
                max = cnt
            }
            newShowOptions.push({option:e, cnt})
        }) 
        setShowOptions(newShowOptions)
    }, [])

    const handleSubmit = () =>{
        if(place_result === ''){
            displayStatus({type: 'error', msg: '請選擇最終地點'})
        }
        let data = {UID, DID, place_result}
        sendData("confirmPlace", data)
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
                        <Radio.Group name="radiogroup" onChange={(e)=>{setPlaceResult(e.target.value)}}>\
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
                        <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                            確認地點
                        </Button>
                        </>
                    ):(
                    <div>
                        {show_options.map(({option, cnt}, index)=>{
                            return (
                            <p key={index}>{option}： 
                                <Tag color="blue">{cnt} 票</Tag>
                            </p>)
                        })}
                    </div>
                    )}
                    
                </Col>
            </Row>
        </>
    )

}

export default NotSelectedPlace