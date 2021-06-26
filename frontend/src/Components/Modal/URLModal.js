// import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Form, Modal, Input } from "antd";

const ChatModal = ({visible, onCreate, onCancel}) =>{
    const [form] = Form.useForm()
    return(
        <Modal
            visible={visible}
            title="請在下方輸入新的資料集連結"
            okText="更新"
            cancelText="取消"
            onCancel={onCancel}
            onOk={() => {
            form.validateFields().then((values) => {
                form.resetFields(); 
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
                name="url" 
                label="新連結"
                rules={[
                    {
                      required: true,
                      message: '錯誤：請輸入新的連結！',
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