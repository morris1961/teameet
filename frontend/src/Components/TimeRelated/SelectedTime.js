import { useEffect, useState } from "react";
import { Divider, Row, Col, Tag } from 'antd';
import moment from 'moment';
import 'moment-timezone';

const SelectedTime = ({time_options, time_result}) =>{
    const [show_options, setShowOptions] = useState([])


    useEffect(()=>{
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
        setShowOptions(newShowOptions)
    }, [time_options])

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
                        if(option === moment(time_result).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm')){
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