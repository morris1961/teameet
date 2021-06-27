import { useEffect, useState } from "react";
import { Divider, Row, Col } from 'antd';
import moment from 'moment';
import 'moment-timezone';

const VotedTime = ({time_options, UID}) =>{
    const [show_options, setShowOptions] = useState([])

    useEffect(()=>{
        if(time_options){
            let options = []
            options = Object.keys(time_options)
            let newShowOptions = []
            options.forEach((e)=>{
                if(time_options[e].indexOf(UID) !== -1){
                    newShowOptions.push(e)
                }
            }) 
            setShowOptions(newShowOptions)
        }
    }, [time_options])

    return(
        <>
            <Row>
                <Col span={2}></Col>
                <Col span={18}>
                    <Divider style={{ borderColor: "#d8d8d8", color: "#D0D0D0"}} orientation="center" plain>
                        你已經投票囉！
                    </Divider>
                    <h3 className='content'>時間如下：</h3>
                    <div>
                        {show_options.map((e, index)=>(<p className='content' key={index}>{moment(e).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm')}</p>))}
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default VotedTime;