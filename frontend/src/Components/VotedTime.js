import { useEffect, useState } from "react";
import { Divider, Row, Col } from 'antd';
import moment from 'moment';
import 'moment-timezone';

const VotedTime = ({time_options, UID}) =>{
    const [show_options, setShowOptions] = useState([])
    const options = Object.keys(time_options)


    useEffect(()=>{
        if(options){
            let newShowOptions = []
            options.map((e)=>{
                if(time_options[e].indexOf(UID) !== -1){
                    newShowOptions.push(e)
                }
            }) 
            setShowOptions(newShowOptions)
        }
        
    }, [])

    return(
        <>
            <Row>
                <Col span={2}></Col>
                <Col span={18}>
                    <Divider orientation="center" plain>
                        你已經投票囉！
                    </Divider>
                    <h2>時間如下：</h2>
                    <div>
                        {show_options.map((e)=>(<p>{moment(e).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm')}</p>))}
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default VotedTime;