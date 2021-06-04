import {useState} from 'react'
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Input, Radio, DatePicker, Button, Row, Col } from 'antd';

const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
    },
};

const { RangePicker, rangeConfig } = DatePicker
const DiscussionSet = ({UID, GID, sendData}) =>{
    const [componentSize, setComponentSize] = useState('default');
    const config = {
        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
    };
    const rangeConfig = {
        rules: [{ type: 'array', required: true, message: 'Please select time!' }],
    };

    const handleCreate = () =>{

    }

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };


    // const createDiscussion = () =>{
    //     let data = { UID, GID, subject, content, time_start, time_end, time_span, deadline } 
    //     sendData("createDiscussion", data)
    // }

    return(
        <>
            <Form
            {...formItemLayoutWithOutLabel}
            name="create_discussion"
            onFinish={onFinish}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            initialValues={{ size: componentSize }}
            >
                <Form.Item label="主題">
                <Input />
                </Form.Item>
                <Form.Item label="內容">
                <Input.TextArea />
                </Form.Item>
                <Form.Item name="range-time-picker" label="討論時間範圍" {...rangeConfig}>
                    <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
                <Form.Item label="討論時間間隔" name="size">
                    <Radio.Group>
                        <Radio.Button value="small">30 分鐘</Radio.Button>
                        <Radio.Button value="default">1 小時</Radio.Button>
                        <Radio.Button value="large">2 小時</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="date-time-picker" label="投票截止時間" {...config}>
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                </Form.Item>
                
                <Row>
                    <Col span={4}></Col> 
                    <Button type="primary" htmlType="submit" onClick={handleCreate}>
                        創建討論
                    </Button>
                </Row>
            </Form>
        </>

    )
}
export default DiscussionSet;