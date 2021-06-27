import { useEffect, useState } from "react";
import { Divider, Row, Col } from 'antd';

const VotedTime = ({place_options, UID}) =>{
    const [show_options, setShowOptions] = useState([])
    
    useEffect(()=>{
        if(place_options){
            const options = Object.keys(place_options)
            let newShowOptions = []
            options.forEach((e)=>{
                if(place_options[e].indexOf(UID) !== -1){
                    newShowOptions.push(e)
                }
            })
            setShowOptions(newShowOptions)
        }
    }, [place_options])

    return(
        <>
            <Row>
                <Col span={2}></Col>
                <Col span={18}>
                    <Divider style={{ borderColor: "#d8d8d8", color: "#D0D0D0"}} orientation="center" plain>
                        你已經投票囉！
                    </Divider>
                    <h3 className='content'>地點如下：</h3>
                    <div>
                        {show_options?(show_options.map((e, index)=>(<p className='content' key={index}>{e}</p>))):(null)}
                    </div>
                </Col>
            </Row>
        </>
    )
}
export default VotedTime;