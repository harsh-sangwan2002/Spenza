import { Form, Input, Button, Select, message } from 'antd';
import { createWebhook } from '../api/webhook';

const WebhookForm = ({ onWebhookAdded }) => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        try {
            await createWebhook(values);
            message.success('Webhook created successfully!');
            form.resetFields();
            onWebhookAdded(); // refresh list
        } catch (err) {
            message.error('Failed to create webhook');
        }
    };

    return (
        <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item name="sourceUrl" label="Source URL" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="callbackUrl" label="Callback URL" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="events" label="Events">
                <Select mode="tags" placeholder="Enter event types" />
            </Form.Item>
            <Button type="primary" htmlType="submit">Create Webhook</Button>
        </Form>
    );
};

export default WebhookForm;
