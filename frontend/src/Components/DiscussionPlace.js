import {useState} from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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

const DiscussionTime = () =>{
    const [places, setPlaces] = useState(['1F', '2F'])
    const onFinish = values => {
        console.log('Received values of form:', values);
    };
    
    return(
        <>
            <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish} autoComplete="off" initialValues={{"places": [{
                key: 0,
                name: "新體1F",
            }, {
                key: 1,
                name: "新體2F",
            }]}}>
            <Form.List
                name="places"
                rules={[
                {
                    validator: async (_, places) => {
                    if (!places || places.length < 1) {
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
                        <Checkbox>
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
                            {fields.length > 1 ? (
                            <MinusCircleOutlined
                                className="dynamic-delete-button"
                                style={{margin: "3%", color: "red"}}
                                onClick={() => remove(field.name)}
                            />
                            ) : null}
                        </Checkbox>
                    </Form.Item>
                   
                    ))}
                    <Form.Item>
                    <Button
                        type="default"
                        onClick={() => add()}
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
                <Button type="primary" htmlType="submit">
                    送出投票
                </Button>
            </Form.Item>
            </Form>
        </>
    )
}
export default DiscussionTime;