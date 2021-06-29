import { useEffect, useState } from "react";
import { Divider, Row, Col, Radio, Button, Tag, notification } from 'antd';


const NotSelectedPlace = ({UID, DID, place_options, isAdmin, sendData, message}) =>{
    const [show_options, setShowOptions] = useState([])
    const [place_result, setPlaceResult] = useState('')
    const [max, setMax] = useState(0)
    const [loading, setLoading] = useState(false)

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
        setLoading(true)
        if(place_result === ''){
            notification['error']({
                message: '錯誤',
                description:
                '請選擇最終地點',
              });
            setLoading(false)
        }
        else{
            let data = {UID, DID, place_result}
            sendData("confirmPlace", data)
        }
        
    }

    useEffect(()=>{
        if(message.api === 'confirmPlace'){
          setLoading(false)
          if(message.data.status === true){
            notification['success']({
                message: '成功',
                description:
                '確認成功',
              });
          }
          else{
            notification['error']({
                message: '錯誤',
                description:
                '確認失敗',
              });
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
                            <Button type="primary" htmlType="submit"  style={{marginTop: "10px"}} onClick={handleSubmit} loading={loading}>
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