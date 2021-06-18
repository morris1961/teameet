import { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router';
import VotedPlace from './VotedPlace';
import SelectedPlace from './SelectedPlace';
import NotSelectedPlace from './NotSelectedPlace';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

const DiscussionPlace = ({isDue, isAdmin, voted, place_options, sendData, isSelect, displayStatus, place_result}) =>{
    const { UID, GID, DID } = useParams()
    const options = Object.keys(place_options)
    const places = {"places": options.map((e, index)=>({key: index, name: e}))}
    const [checkList, setCheckList] = useState([])
    const [sendVote, setSendVote] = useState(false)

    const onFinish = values => {
        if(sendVote === false){
            let newPlaces = values.places.map((e)=>(e.name)) // 取全部的 place
            let newPlace = newPlaces.filter((e)=>{
                return options.indexOf(e) === -1
            })// 跟原本的比
            let data = {UID, DID, place: newPlace[0]}
            sendData("addPlace", data)
        }
        else{
            if(checkList === []){
                displayStatus({type: 'error', msg: '請選擇要投票的地方'})
                return 
            }
            let data = {UID, DID, places:checkList}
            sendData("votePlace", data)
            setSendVote(false)
        }
    };

    useEffect(()=>{
        let data = {UID, DID}  
        sendData("place", data)
    }, [])

    const handleCheck = (e, id) =>{
        let newCheckList = checkList
        let n = `${options[id]}`
        if(e.target.checked){
            newCheckList.push(n)
        }
        else{
            newCheckList = newCheckList.filter(item => (item !== n))
        }
        setCheckList(newCheckList)
    }


    
    return(
        <>
            {isDue?(isSelect?(<SelectedPlace place_options={place_options} place_result={place_result}/>):(
            <NotSelectedPlace 
                UID={UID} 
                DID={DID} 
                displayStatus={displayStatus} 
                time_options={place_options} 
                isAdmin={isAdmin} 
                sendData={sendData}/>)):
            voted?(<VotedPlace UID={UID} place_options={place_options} />):
            (<>
            <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish} autoComplete="off" initialValues={places}>
            {/* {console.log(checkList)}  */}
            <Form.List
                name="places"
                rules={[
                {
                    validator: async (_, options) => {
                    if (!options || options.length < 1) {
                        return Promise.reject(new Error('At least 1 place')); // 檢查至少有一個 place
                    }
                    },
                },
                ]}
            >
                {(fields, { add, remove }, { errors }) => (
                <>
                    {fields.map((field, index) => (
                    <Form.Item
                        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                        label={index === 0 ? '候選地點' : ''}
                        required={false}
                        key={field.key}
                    >
                        <Checkbox onChange={(e)=>{handleCheck(e, field.key)}}>
                            <Form.Item
                                {...field}
                                name={[field.name, 'name']} // 將 initialValue 顯示在畫面
                                validateTrigger={['onChange', 'onBlur']}
                                rules={[
                                    {
                                    required: true,
                                    whitespace: true,
                                    message: "請輸入地點名稱",
                                    },
                                ]}
                            noStyle>
                                <Input placeholder="請輸入地點名稱" style={{ width: '60%' }} />
                            </Form.Item>
                            {/* {fields.length > 1 ? (
                            <MinusCircleOutlined
                                className="dynamic-delete-button"
                                style={{margin: "3%", color: "red"}}
                                onClick={() => remove(field.name)}
                            />
                            ) : null} */}
                        </Checkbox>
                    </Form.Item>
                   
                    ))}
                    <Form.Item>
                    <Button
                        type="default"
                        onClick={() => {add()}}
                        style={{ width: '60%' }}
                        icon={<PlusOutlined />}
                    >
                        新增地點
                    </Button>
                    <Form.ErrorList errors={errors} />
                    </Form.Item>
                </>
                )}
            </Form.List>
            <Button type="primary" htmlType="submit" onFocus={()=>{setSendVote(true)}}>
                送出投票
            </Button>
            </Form>
            </>)}
        </>
    )
}
export default DiscussionPlace;