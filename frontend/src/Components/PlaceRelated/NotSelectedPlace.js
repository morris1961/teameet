import { useEffect, useState } from "react";
import { Divider, Row, Col, Radio, Button, Tag } from 'antd';


const NotSelectedPlace = ({UID, DID, place_options, isAdmin, sendData, displayStatus}) =>{
    const [show_options, setShowOptions] = useState([])
    const [place_result, setPlaceResult] = useState('')
    const [max, setMax] = useState(0)

    // 取 option key render，並計算最大票數
    useEffect(()=>{
        if(place_options){
            let options = []
            options = Object.keys(place_options)
            let newShowOptions = [] // 這裡改 show_options 會出 error
            let newMax = 0
            options.forEach((e)=>{
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
                        <Radio.Group name="radiogroup" onChange={(e)=>{setPlaceResult(e.target.value)}}>
                            {show_options.map(({option, cnt}, index)=>{
                                if(cnt === max){
                                    return(<Radio key={index} value={option} style={{margin:'3px'}}>
                                    <div style={{display: "flex", height: "23px"}}>
                                        <p className='content'>{option}： </p>
                                        <Tag color="cyan">{cnt} 票</Tag>
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
                            <Button type="primary" htmlType="submit"  style={{marginTop: "10px"}} onClick={handleSubmit}>
                                確認地點
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

export default NotSelectedPlace