import { Checkbox, Row, Col, Button } from 'antd';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import VotedTime from './VotedTime';
import SelectedTime from './SelectedTime';
import NotSelectedTime from './NotSelectedTime';
import moment from 'moment';
import 'moment-timezone';


const DiscussionTime = ({voted, isDue, isAdmin, isSelect, time_options, time_result, sendData, displayStatus}) =>{

    const { UID, DID } = useParams()
    const [checkList, setCheckList] = useState([])
    const [options, setOptions] = useState([])
    
    useEffect(()=>{
      if(time_options){
        let newOptions = []
        newOptions = Object.keys(time_options)
        setOptions(newOptions)
      }
    }, [time_options])

    const handleCheck = (e, option)=>{

      let newCheckList = checkList
      // 將時間轉換成 DB 所需形式
      let time = moment.tz(option, 'Asia/Taipei').format()
      if(e.target.checked){
        newCheckList.push(time)
      }
      else{
        newCheckList = newCheckList.filter(item => (item !== time))
      }
      setCheckList(newCheckList)
    }

    const handleVote = () =>{
      if(checkList !== []){
        let data = {UID, DID, times:checkList}
        sendData("voteTime", data)
      }
      else{
        displayStatus({type: "error", msg: '請選擇要投票的時間'})
      }
    }

    return(
      <>
        {isDue?(isSelect?(<SelectedTime time_options={time_options} time_result={time_result}/>):(
        <NotSelectedTime 
        UID={UID} 
        DID={DID} 
        isAdmin={isAdmin} 
        time_options={time_options} 
        sendData={sendData}
        displayStatus={displayStatus} />)):(voted?
        (<VotedTime time_options={time_options} UID={UID} />)
        :(<Row>
          {options.map((option, index)=>{
            return(
            <>
              <Col key={index} span={2}></Col>
              <Col key={index} span={22}>
                <Checkbox key={index} style={{margin: "1%"}} onChange={(e)=>{handleCheck(e, option)}}>{moment(option).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm')}</Checkbox>
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
