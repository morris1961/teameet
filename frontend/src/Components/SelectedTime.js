import { useEffect } from "react";
import { Divider, Row, Col } from 'antd';

const SelectedTime = ({time_options, time_result}) =>{
    const show_options = []
    const options = Object.keys(time_options)

    useEffect(()=>{
        options.map((e)=>{
            let cnt = time_options[e].length
            show_options.push({option:e, cnt})
        }) 

    }, [])

    return(
        <>
            <Row>
                <Col span={2}></Col>
                <Col span={18}>
                    <Divider orientation="center" plain>
                        投票結果！
                    </Divider>
                    <h2>如下：</h2>
                    <div>
                        {show_options.map(({option, cnt})=>(<p>{option}: {cnt}</p>))}
                    </div>
                </Col>
            </Row>
        </>
    )

}

export default SelectedTime 