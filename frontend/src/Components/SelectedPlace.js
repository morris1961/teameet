import { useEffect, useState } from "react";
import { Divider, Row, Col, Tag } from 'antd';

const SelectedPlace = ({place_options, place_result}) =>{
    const [show_options, setShowOptions] = useState([])
    const [max, setMax] = useState(0)


    useEffect(()=>{
        const options = Object.keys(place_options)
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
                        if(option === place_result){
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

export default SelectedPlace