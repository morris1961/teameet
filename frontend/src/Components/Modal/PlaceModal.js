import '@ant-design/compatible/assets/index.css';
import { Form, Modal, Input } from "antd";

const PlaceModal = ({visible, onCreate, onCancel}) =>{
    const [form] = Form.useForm()
    return(
        <Modal
            visible={visible}
            title="請輸入新增地點名稱"
            okText="新增"
            cancelText="取消"
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
                name="place" 
                label="新地點"
                rules={[
                    {
                      required: true,
                      message: '錯誤：請輸入要新增的地點！',
                    },
                ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default PlaceModal;