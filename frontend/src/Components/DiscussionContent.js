import {useState} from 'react'
import { Divider, Row, Col } from 'antd';




const DiscussionContent = ({subject, content}) =>{

    

    return(
        <>
            <Row>
                <Col span={2}></Col>
                <Col span={18}>
                    <Divider orientation="left" plain>
                        主題
                    </Divider>
                    <p>{subject}</p>
                    <Divider orientation="left" plain>
                        內容
                    </Divider>
                    <p>{content}</p>
                </Col>
            </Row>
            
        </>
    )
}
export default DiscussionContent;