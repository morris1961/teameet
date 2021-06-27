import { useState, useEffect } from 'react'
import { Button, Checkbox, Row, Col,  } from 'antd';
import { useParams } from 'react-router';
import VotedPlace from './VotedPlace';
import SelectedPlace from './SelectedPlace';
import NotSelectedPlace from './NotSelectedPlace';
import PlaceModal from '../Modal/PlaceModal';



const DiscussionPlace = ({isDue, isAdmin, voted, place_options, sendData, isSelect, displayStatus, place_result}) =>{

    const { UID, DID } = useParams()
    const [checkList, setCheckList] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [options, setOptions] = useState([])
    
    // 取 option key render
    useEffect(()=>{
        if(place_options){
            let newOptions = []
            newOptions = Object.keys(place_options)
            setOptions(newOptions)
        }
    }, [place_options])


    const addPlace = (place) =>{
        let data = {UID, DID, place}
        sendData("addPlace", data)
    }

    const handleSubmit = () =>{
        if(checkList.length === 0){
            displayStatus({type: 'error', msg: '請選擇要投票的地方'})
            return 
        }
        let data = {UID, DID, places:checkList}
        sendData("votePlace", data)
    }

    
    return(
        <>
            {isDue?(isSelect?(<SelectedPlace place_options={place_options} place_result={place_result}/>):(
            <NotSelectedPlace 
                UID={UID} 
                DID={DID} 
                place_options={place_options} 
                isAdmin={isAdmin} 
                sendData={sendData}
                displayStatus={displayStatus} />)):
            voted?(<VotedPlace UID={UID} place_options={place_options} />):
            (<>
            <Checkbox.Group style={{ width: '100%' }} onChange={(list)=>{setCheckList(list)}}>
                <Row>
                    {options.map((option, index)=>{
                        return(
                        <>
                        <Col span={8}>
                            <Checkbox value={option} key={index}>{option}</Checkbox>
                        </Col>
                        <br />
                        </>
                        )
                    })}
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

            <Button type="dashed" key="addPlace" onClick={()=>{setModalVisible(true)}}  style={{marginTop: "10px"}}> 新增地點 </Button>
            <br />
            <Button type="primary" onClick={()=>{handleSubmit()}} style={{marginTop: "10px"}}>
                送出投票
            </Button>

            </>)}
        </>
    )
}
export default DiscussionPlace;