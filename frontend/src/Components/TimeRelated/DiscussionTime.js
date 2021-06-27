import { Checkbox, Row, Col, Button, message } from 'antd';
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
    const [loading, setLoading] = useState(false)
    
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

    useEffect(()=>{
      if(message.api === 'voteTime'){
        setLoading(false)
        if(message.status === true){
          displayStatus({type: 'error', msg: '投票成功'})
        }
        else{
          displayStatus({type: 'error', msg: '投票失敗'})
        }
      }
      
    }, [message])


    return(
      <>
        {isDue?(isSelect?(<SelectedTime time_options={time_options} time_result={time_result}/>):(
        <NotSelectedTime 
        UID={UID} 
        DID={DID} 
        isAdmin={isAdmin} 
        time_options={time_options} 
        sendData={sendData}
        displayStatus={displayStatus}
        message={message} />)):(voted?
        (<VotedTime time_options={time_options} UID={UID} />)
        :(
        <>
        <Row>
          <Col span={2}></Col>
          <Col span={18}>
          {options.map((option, index)=>{
            return(
              <Checkbox key={index} style={{margin: "1%"}} onChange={(e)=>{handleCheck(e, option)}} className='content'>{moment(option).tz('Asia/Taipei').format('YYYY-MM-DD HH:mm')}</Checkbox>
              )})}
          </Col>)
          }
        </Row>
        <div style={{display: "flex", justifyContent: "flex-end", marginRight: "5%"}}>
          <Button type="primary" htmlType="submit" onClick={handleVote} loading={loading}>
            送出投票
          </Button>
        </div>
      </>))}
        
      </>
    )
}
export default DiscussionTime;
