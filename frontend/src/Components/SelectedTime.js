import { useEffect, useState } from "react";
import { Divider, Row, Col, Tag } from 'antd';
import moment from 'moment';
import 'moment-timezone';

const SelectedTime = ({time_options, time_result}) =>{
    const [show_options, setShowOptions] = useState([])
    const [result, setResult] = useState('')
    const [max, setMax] = useState(0)

    useEffect(()=>{
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
        let formatedResult = moment(time_result).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm')
        setResult(formatedResult)
        setMax(newMax)
        setShowOptions(newShowOptions)
    }, [])

    return(
        <>
            <Row>
                <Col span={2}></Col>
                <Col span={18}>
                    <Divider orientation="center" plain>
                        投票結果！（藍底白字為最終結果）
                    </Divider>
                    <h2>如下：</h2>
                    <div>
                        {show_options.map(({option, cnt}, index)=>{
                        if(option === result){
                            return (
                                <p key={index}>{option}：
                                    <Tag color="#0066CC">{cnt} 票</Tag>
                                </p>
                            )
                        }
                        else{
                            return (
                                <p key={index}>{option}：
                                    <Tag color="blue">{cnt} 票</Tag>
                                </p>
                            )
                        }
                        
                    })}
                    </div>
                </Col>
            </Row>
        </>
    )

}

export default SelectedTime 