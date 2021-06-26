import { Divider, Row, Col } from 'antd';


const DiscussionContent = ({subject, content}) =>{

    return(
        <>
            <Row>
                <Col span={2}></Col>
                <Col span={18}>
                    <Divider style={{ borderColor: "#d8d8d8", color: "#D0D0D0"}}  orientation="left" plain>
                        主題
                    </Divider>
                    <p className="content">{subject}</p>
                    <Divider style={{ borderColor: "#d8d8d8", color: "#D0D0D0"}} orientation="left" plain>
                        內容
                    </Divider>
                    <p className="content">{content}</p>
                </Col>
            </Row>
            
        </>
    )
}
export default DiscussionContent;