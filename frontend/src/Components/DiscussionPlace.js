import { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router';

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

const DiscussionPlace = ({isDue, isAdmin, voted, place_options, sendData}) =>{
    const { UID, GID, DID } = useParams()
    const options = Object.keys(place_options)
    const places = {"places": options.map((e, index)=>({key: index, name: e}))}
    const [checkList, setCheckList] = useState([])

    const onFinish = values => {
        let newPlaces = values.places.map((e)=>(e.name)) // 取全部的 place
        let newPlace = newPlaces.filter((e)=>{
            return options.indexOf(e) === -1
        })// 跟原本的比
        let data = {UID, DID, place: newPlace[0]}
        sendData("addPlace", data)
    };

    useEffect(()=>{
        let data = {UID, DID}  
        sendData("place", data)
    }, [])

    const handleCheck = (e) =>{
        
        let id = e.target.value.key
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

    const handleVote = (e) =>{
        let data = {UID, DID, places:checkList}
        sendData("votePlace", data)
    }

    
    return(
        <>

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
                        <Checkbox onChange={handleCheck} value={field}>
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
            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={handleVote}>
                    送出投票
                </Button>
            </Form.Item>
            </Form>
        </>
    )
}
export default DiscussionPlace;