import WebhookForm from '../../components/WebhookForm';
import WebhookList from '../../components/WebhookList';
import EventLogList from '../../components/EventLogList';
import { useState } from 'react';

const WebhookDashboard = () => {
    const [reload, setReload] = useState(false);
    const [selectedWebhookId, setSelectedWebhookId] = useState(null);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="p-8 max-w-5xl w-full">
                <h2 className="text-2xl mb-6 text-center font-semibold">Webhook Dashboard</h2>
                <WebhookForm onWebhookAdded={() => setReload(!reload)} />
                <div className="mt-8">
                    <WebhookList key={reload} onViewLogs={setSelectedWebhookId} />
                </div>
                {selectedWebhookId && (
                    <div className="mt-10">
                        <h3 className="text-xl font-semibold mb-4">Event Logs</h3>
                        <EventLogList subscriptionId={selectedWebhookId} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default WebhookDashboard;
