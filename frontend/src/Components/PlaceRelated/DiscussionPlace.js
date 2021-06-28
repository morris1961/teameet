import { useState, useEffect } from 'react'
import { Button, Checkbox, Row, Col,  } from 'antd';
import { useParams } from 'react-router';
import VotedPlace from './VotedPlace';
import SelectedPlace from './SelectedPlace';
import NotSelectedPlace from './NotSelectedPlace';
import PlaceModal from '../Modal/PlaceModal';



const DiscussionPlace = ({isDue, isAdmin, voted, place_options, sendData, isSelect, displayStatus, place_result, message}) =>{

    const { UID, DID } = useParams()
    const [checkList, setCheckList] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [options, setOptions] = useState([])
    const [voteLoading, setVoteLoading] = useState(false)
    const [addLoading, setAddLoading] = useState(false)
    
    // 取 option key render
    useEffect(()=>{
        if(place_options){
            let newOptions = []
            newOptions = Object.keys(place_options)
            setOptions(newOptions)
        }
    }, [place_options])


    const addPlace = (place) =>{
        setAddLoading(true)
        let data = {UID, DID, place}
        sendData("addPlace", data)
    }

    const handleSubmit = () =>{
        if(checkList.length === 0){
            displayStatus({type: 'error', msg: '請選擇要投票的地方'})
            return 
        }
        setVoteLoading(true)
        let data = {UID, DID, places:checkList}
        sendData("votePlace", data)
    }

    useEffect(()=>{
        const { data } = message
        if(message.api === 'addPlace'){
            setAddLoading(false)
            if(data.status === true){
                displayStatus({type:'success', msg:'成功新增討論地點'})
            }
            else{
                displayStatus({type:'error', msg:'新增討論地點失敗'})
            }
        }
        else if(message.api === 'votePlace'){
            setVoteLoading(false)
            if(data.status === true){
                displayStatus({type:'success', msg:'投票成功'})
            }
            else{
                displayStatus({type:'error', msg:'投票失敗'})
            }
        }
    }, [message])
    
    return(
        <>
            {isDue?(isSelect?(<SelectedPlace place_options={place_options} place_result={place_result}/>):(
            <NotSelectedPlace 
                UID={UID} 
                DID={DID} 
                place_options={place_options} 
                isAdmin={isAdmin} 
                sendData={sendData}
                displayStatus={displayStatus} 
                message={message} />)):
            voted?(<VotedPlace UID={UID} place_options={place_options} />):
            (<>
            <Checkbox.Group style={{ width: '100%' }} onChange={(list)=>{setCheckList(list)}}>
                <Row>
                    <Col span={2}></Col>
                    <Col span={18}>
                    {options.map((option, index)=>{
                        return(
                        <>
                            <Checkbox value={option} key={index}  className='content'>{option}</Checkbox>
                        
                        {index === options.length-1?(
                            <>
                                <br />
                                <Button type="dashed" key="addPlace" onClick={()=>{setModalVisible(true)}} style={{marginTop: "10px"}} loading={addLoading}> 新增地點 </Button>
                            </>
                        ):null}
                        </>
                        )
                    })}
                    </Col>
                </Row>
            </Checkbox.Group>
            
            <PlaceModal 
                visible={modalVisible}
                onCreate={({place})=>{
                    setModalVisible(false) 
                    addPlace(place)
                }}
                onCancel={()=>{
                    setModalVisible(false)
                }}/>

            <br />
            <div style={{display: "flex", justifyContent: "flex-end", marginRight: "5%"}}>
                <Button type="primary" onClick={()=>{handleSubmit()}} style={{marginTop: "10px"}} loading={voteLoading}>
                    送出投票
                </Button>
            </div>

            </>)}
        </>
    )
}
export default DiscussionPlace;