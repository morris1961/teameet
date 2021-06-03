import { Checkbox, Row, Col, Button } from 'antd';
import { useEffect } from 'react'
import { useParams } from 'react-router';

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}



const DiscussionTime = ({time_options, voted, isDue, sendData}) =>{
    const { UID, GID, DID } = useParams()
    const options = Object.keys(time_options)
    useEffect(()=>{
      let data = {UID, DID}  
      sendData("time", data)
    }, [])


    return(
      <>
        <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
          <Row>
            {options.map((option, index)=>{
              return(
              <>
                <Col span={2}></Col>
                <Col span={22}>
                  <Checkbox  style={{margin: "1%"}}>{option}</Checkbox>
                </Col>
                {index === options.length-1?(
                <>
                  <Col span={2}></Col>
                  <Button type="primary" htmlType="submit">
                    送出投票
                  </Button>
                </>):null}
              </>)
            })}
            
          </Row>
        </Checkbox.Group>
        
      </>
    )
}
export default DiscussionTime;
