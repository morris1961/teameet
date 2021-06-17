import {useState} from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Radio, DatePicker, Button, Row, Col } from 'antd';
import moment from 'moment';

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

const { RangePicker, rangeConfig } = DatePicker
const DiscussionSet = ({UID, GID, sendData, displayStatus}) =>{
    const [sendCreate, setSendCreate] = useState(false)
    const [subject, setSubject] = useState('')
    const [content, setContent] = useState('')
    const [timeStart, setTimeStart] = useState('')
    const [timeEnd, setTimeEnd] = useState('')
    const [timeSpan, setTimeSpan] = useState('')
    const [deadline, setDeadline] = useState('')
    const [timeEnd2, setTimeEnd2] = useState('')

    const config = {
        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };
    const rangeConfig = {
        rules: [{ type: 'array', required: true, message: 'Please select time!' }],
    };

    const disabledDate = (current) => {
        // Can not select days before today and today
        return current && current < moment().endOf('day');
    }

    const disableDate2 = (current) =>{
        if(timeEnd2 === ''){
            return
        }
        return current && current < timeEnd2;
    }


    const handleSubmit = () =>{
        console.log(UID, GID, subject, content, timeStart, timeEnd, timeSpan, deadline)
        if(UID === ''){
            throw new Error ("Missing UID")
        }
        if(GID === ''){
            throw new Error ("Missing GID")
        }
        if(subject === ''){
            displayStatus({type:'error', msg:'請輸入討論主題'})
        }
        if(content === ''){
            displayStatus({type:'error', msg:'請輸入討論內容'})
        }
        if(timeStart === '' || timeEnd === ''){
            displayStatus({type:'error', msg:'請選擇討論時間範圍'})
        }
        if(timeSpan === ''){
            displayStatus({type:'error', msg:'請輸入討論時間間隔'})
        }
        if(deadline === ''){
            displayStatus({type:'error', msg:'請輸入投票截止日期'})
        }
        let data = { UID, GID, subject, content, time_start: timeStart, time_end: timeEnd, time_span: timeSpan, deadline } 
        sendData("createDiscussion", data)
    }

    const onChangeRangePicker = (value, dateString) =>{
        // Formatted Selected Time: dateString
        setTimeStart(dateString[0])
        setTimeEnd(dateString[1])
        // Origin: value(moment type)
        setTimeEnd2(value[1])
    }

    const onChangeDatePicker = (value, dateString) =>{
        // Formatted Selected Time: dateString
        setDeadline(dateString)
    }


    return(
        <>
            <Form
            {...formItemLayoutWithOutLabel}
            name="dynamic_form_item"
            // rules={[{ required: true }]}
            // onFinish={onFinish} // 通過驗證時觸發 (rules)
            autoComplete="off"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            >
                <Form.Item label="主題">
                <Input onChange={(e)=>{setSubject(e.target.value)}} />
                </Form.Item>
                <Form.Item label="內容">
                <Input.TextArea onChange={(e)=>{setContent(e.target.value)}}/>
                </Form.Item>
                <Form.Item name="range-time-picker" label="討論時間範圍" {...rangeConfig}>
                    <RangePicker showTime format="YYYY-MM-DD HH:mm" disabledDate={disabledDate} minuteStep={30} onChange={onChangeRangePicker}/>
                </Form.Item>
                <Form.Item label="討論時間間隔" name="size" defaultValue="60">
                    <Radio.Group onChange={(e)=>{setTimeSpan(e.target.value)}}>
                        <Radio.Button value="30">30 分鐘</Radio.Button>
                        <Radio.Button value="60">1 小時</Radio.Button>
                        <Radio.Button value="120">2 小時</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="date-time-picker" label="投票截止時間" {...config}>
                    <DatePicker showTime format="YYYY-MM-DD HH"  disabledDate={disableDate2} onChange={onChangeDatePicker}/>
                </Form.Item>
                {/* <Form.Item>
                    
                </Form.Item> */}
                
                {/* <Row>
                    <Col span={4}></Col> 
                    
                </Row> */}
            </Form>
            <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                創建討論
            </Button>
        </>

    )
}
export default DiscussionSet;