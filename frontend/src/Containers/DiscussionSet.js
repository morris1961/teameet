import {useState} from 'react'
import {
    Form,
    Input,
    Radio,
    RangePicker,
    rangeConfig,
    DatePicker,
  } from 'antd';

const DiscussionSet = () =>{
    const [componentSize, setComponentSize] = useState('default');

    return(
        <>
            <Form
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
            <Form.Item label="截止時間">
            <DatePicker />
            </Form.Item>
            <Form.Item label="時間間隔" name="size">
                <Radio.Group>
                    <Radio.Button value="small">30 分鐘</Radio.Button>
                    <Radio.Button value="default">1 小時</Radio.Button>
                    <Radio.Button value="large">2 小時</Radio.Button>
                </Radio.Group>
            </Form.Item>

        </Form>
        </>

    )
}
export default DiscussionSet;