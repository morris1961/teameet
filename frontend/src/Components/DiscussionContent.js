import {useState} from 'react'
import { Divider, Row, Col } from 'antd';




const DiscussionContent = () =>{
    return(
        <>
            <Row>
                <Col span={2}></Col>
                <Col span={18}>
                    <Divider orientation="left" plain>
                        主題
                    </Divider>
                    <Divider orientation="left" plain>
                        內容
                    </Divider>
                </Col>
            </Row>
            
        </>
    )
}
export default DiscussionContent;