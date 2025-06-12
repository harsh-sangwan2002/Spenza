import { useState, useEffect } from 'react';
import { Form, Input, Button, Table, message } from 'antd';
import axiosInstance from '../api/axiosInstance';

const Webhook = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [webhooks, setWebhooks] = useState([]);

    const fetchWebhooks = async () => {
        try {
            const res = await axiosInstance.get('/webhooks');
            setWebhooks(res.data);
        } catch (err) {
            message.error('Failed to fetch webhooks');
        }
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            await axiosInstance.post('/webhooks/subscribe', values);
            message.success('Webhook subscribed successfully');
            form.resetFields();
            fetchWebhooks();
        } catch (err) {
            message.error(err.response?.data?.message || 'Subscription failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWebhooks();
    }, []);

    const columns = [
        { title: 'Source URL', dataIndex: 'sourceUrl', key: 'sourceUrl' },
        { title: 'Callback URL', dataIndex: 'callbackUrl', key: 'callbackUrl' },
        { title: 'Created At', dataIndex: 'createdAt', key: 'createdAt' },
    ];

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Webhook Subscriptions</h2>

            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item label="Source URL" name="sourceUrl" rules={[{ required: true }]}>
                    <Input placeholder="Enter source URL" />
                </Form.Item>

                <Form.Item label="Callback URL" name="callbackUrl" rules={[{ required: true }]}>
                    <Input placeholder="Enter callback URL" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Subscribe Webhook
                    </Button>
                </Form.Item>
            </Form>

            <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">Subscribed Webhooks</h3>
                <Table dataSource={webhooks} columns={columns} rowKey="_id" />
            </div>
        </div>
    );
};

export default Webhook;
