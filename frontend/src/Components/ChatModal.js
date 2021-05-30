// import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Form, Modal, Input } from "antd";

const ChatModal = ({visible, onCreate, onCancel}) =>{
    const [form] = Form.useForm()
    return(
        // <h1>aaa</h1>
        <Modal
            visible={visible}
            title="Please enter a new URL below"
            okText="Renew"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
            form.validateFields().then((values) => {
                form.resetFields(); // 清空格子
                onCreate(values); 
            }).catch((error) => {
                window.alert('Validate Failed:', error);
            });
        }}>
            <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            >
                <Form.Item
                name="url" // name attr 後面取的名字是讓 onCreate 那邊可以取得使用者輸入的這格的值
                label="New URL"
                rules={[
                    {
                      required: true,
                      message: 'Error: Please enter the new URL first!',
                    },
                ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default ChatModal;