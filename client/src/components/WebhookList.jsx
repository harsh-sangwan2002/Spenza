import { useEffect, useState } from 'react';
import { getWebhooks, deleteWebhook, triggerWebhook } from '../api/webhook';
import { Table, Button, Popconfirm, message } from 'antd';

const WebhookList = ({ onViewLogs }) => {
    const [webhooks, setWebhooks] = useState([]);

    const loadWebhooks = async () => {
        const res = await getWebhooks();
        setWebhooks(res.data);
    };

    const handleDelete = async (id) => {
        await deleteWebhook(id);
        message.success('Webhook deleted');
        loadWebhooks();
    };

    const handleTrigger = async (webhook) => {
        try {
            await triggerWebhook({
                sourceUrl: webhook.sourceUrl,
                eventType: webhook.events?.[0] || 'test_event',
                payload: {
                    sample: 'data',
                    triggeredFrom: 'Frontend UI',
                    timestamp: new Date().toISOString()
                }
            });
            message.success('Webhook triggered');
        } catch (err) {
            console.error(err);
            message.error('Trigger failed');
        }
    };

    useEffect(() => { loadWebhooks(); }, []);

    const columns = [
        { title: 'Source URL', dataIndex: 'sourceUrl' },
        { title: 'Callback URL', dataIndex: 'callbackUrl' },
        { title: 'Events', dataIndex: 'events', render: ev => ev.join(', ') },
        {
            title: 'Actions',
            render: (_, record) => (
                <>
                    <Button onClick={() => handleTrigger(record)} size="small">Trigger</Button>
                    <Button
                        onClick={() => onViewLogs && onViewLogs(record._id)}
                        size="small"
                        style={{ marginLeft: 8 }}
                    >
                        View Logs
                    </Button>
                    <Popconfirm title="Delete webhook?" onConfirm={() => handleDelete(record._id)}>
                        <Button danger size="small" style={{ marginLeft: 8 }}>Delete</Button>
                    </Popconfirm>
                </>
            )
        }
    ];

    return <Table dataSource={webhooks} rowKey="_id" columns={columns} />;
};

export default WebhookList;
