import { useEffect } from "react";
import { Divider, Row, Col } from 'antd';

const VotedTime = ({place_options, UID}) =>{
    const show_options = []
    const options = Object.keys(place_options)
    useEffect(()=>{
        options.map((e)=>{
            if(place_options[e].indexOf(UID) !== -1){
                show_options.push(e)
            }
        })
        
    }, [])

    return(
        <>
            <Row>
                <Col span={2}></Col>
                <Col span={18}>
                    <Divider orientation="center" plain>
                        你已經投票囉！
                    </Divider>
                    <h2>地點如下：</h2>
                    <div>
                        {show_options.map((e)=>(<p>{e}</p>))}
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default VotedTime;