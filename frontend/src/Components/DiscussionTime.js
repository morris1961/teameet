import { Checkbox, Row, Col, Button } from 'antd';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import VotedTime from './VotedTime';




const DiscussionTime = ({time_options, voted, isDue, isAdmin, sendData}) =>{
    const { UID, GID, DID } = useParams()
    const [checkList, setCheckList] = useState([])
    const options = Object.keys(time_options)
    useEffect(()=>{
      let data = {UID, DID}  
      sendData("time", data)
    }, [])

    const handleCheck = (e, option)=>{
      let newCheckList = checkList
      let n = `${option}`
      if(e.target.checked){
        newCheckList.push(n)
      }
      else{
        newCheckList = newCheckList.filter(item => (item !== n))
      }
      setCheckList(newCheckList)
    }

    const handleVote = () =>{
      if(checkList !== []){
        let data = {UID, DID, times:checkList}
        sendData("voteTime", data)
      }
      else{
        // displayStatus
      }
    }

    return(
      <>
        {isDue?(isAdmin?(null):(null)):(voted?
        (<VotedTime time_options={time_options} UID={UID} />)
        :(<Row>
          {console.log(checkList)}
          {options.map((option, index)=>{
            return(
            <>
              <Col span={2}></Col>
              <Col span={22}>
                <Checkbox  style={{margin: "1%"}} onChange={(e)=>{handleCheck(e, option)}}> {option}</Checkbox>
              </Col>
              {index === options.length-1?(
              <>
                <Col span={2}></Col>
                <Button type="primary" htmlType="submit" onClick={handleVote}>
                  送出投票
                </Button>
              </>):null}
            </>)
          })}
        </Row>))}
        
      </>
    )
}
export default DiscussionTime;
