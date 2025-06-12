import { useEffect, useState } from 'react';
import { getWebhookLogs } from '../api/webhook';
import { Table, Tag, Spin } from 'antd';

const EventLogList = ({ subscriptionId }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLogs = async () => {
        console.log("  Fetching logs for subscription ID:", subscriptionId);
        if (!subscriptionId) return;
        setLoading(true);
        try {
            const res = await getWebhookLogs(subscriptionId);
            setLogs(res.data.logs);
        } catch (err) {
            console.error('Failed to fetch logs:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [subscriptionId]);

    const columns = [
        { title: 'Event Type', dataIndex: 'eventType' },
        { title: 'Payload', dataIndex: 'payload', render: payload => JSON.stringify(payload, null, 2).slice(0, 50) + '...' },
        { title: 'Timestamp', dataIndex: 'timestamp', render: val => new Date(val).toLocaleString() },
        {
            title: 'Status',
            dataIndex: 'status',
            render: status => (
                <Tag color={status === 'Success' ? 'green' : 'red'}>{status}</Tag>
            )
        }
    ];

    if (!subscriptionId) return null;

    return (
        <div className="mt-10">
            <h3 className="text-xl mb-4">Event Delivery Logs</h3>
            {loading ? <Spin /> : (
                <Table
                    dataSource={logs}
                    columns={columns}
                    rowKey="_id"
                    pagination={{ pageSize: 5 }}
                />
            )}
        </div>
    );
};

export default EventLogList;
