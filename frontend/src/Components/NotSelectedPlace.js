import { useEffect, useState } from "react";
import { Divider, Row, Col, Radio, Button, Tag } from 'antd';


const NotSelectedPlace = ({UID, DID, place_options, isAdmin, sendData, displayStatus}) =>{
    const [show_options, setShowOptions] = useState([])
    const [place_result, setPlaceResult] = useState('')
    const [max, setMax] = useState(0)

    console.log(place_options, show_options)

    useEffect(()=>{
        if(place_options){
            let options = []
            options = Object.keys(place_options)
            let newShowOptions = [] // 這裡改 show_options 就不行?
            let newMax = 0
            options.map((e)=>{
                let cnt = place_options[e].length
                if(cnt > newMax){
                    newMax = cnt
                }
                newShowOptions.push({option:e, cnt})
            }) 
            setMax(newMax)
            setShowOptions(newShowOptions)
        }
    }, [place_options])

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
                        投票結果！（創建討論者還未選擇最終結果）
                    </Divider>
                    <h2>如下：</h2>
                    {isAdmin?(
                        <>
                        <Radio.Group name="radiogroup" onChange={(e)=>{setPlaceResult(e.target.value)}}>
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
                        <Button type="primary" htmlType="submit"  style={{marginTop: "10px"}} onClick={handleSubmit}>
                            確認地點
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

export default NotSelectedPlace