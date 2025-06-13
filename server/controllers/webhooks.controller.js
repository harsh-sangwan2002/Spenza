const webhookModel = require('../models/webhook.model');
const webhookLogModel = require('../models/webhookLog.model');
const retryQueue = require('../utils/retryQueue');
const { publishToQueue } = require('../utils/rabbitmq');

const triggerWebhookEvent = async (req, res) => {
    try {
        const { sourceUrl, eventType, payload } = req.body;

        if (!sourceUrl || !eventType || !payload) {
            return res.status(400).json({ message: 'sourceUrl, eventType and payload are required' });
        }

        // Find matching webhooks
        const subscribers = await webhookModel.find({
            sourceUrl,
            events: eventType,
            active: true
        });

        if (subscribers.length === 0) {
            return res.status(200).json({ message: 'No subscribers for this event' });
        }

        // Publish to RabbitMQ queue
        for (const sub of subscribers) {
            await publishToQueue('webhook_events', {
                callbackUrl: sub.callbackUrl,
                eventType,
                payload,
                subscriptionId: sub._id
            });
        }

        res.status(200).json({ message: 'Event queued for delivery', subscribers: subscribers.length });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const createWebhook = async (req, res) => {
    try {
        // sourceUrl -> where the event orignates from
        // callbackUrl -> where the event should be sent
        // events -> array of event types to subscribe to
        const { sourceUrl, callbackUrl, events } = req.body;

        if (!sourceUrl || !callbackUrl || !events || !Array.isArray(events) || events.length === 0) {
            return res.status(400).json({ message: 'sourceUrl, callbackUrl, and at least one event are required' });
        }

        const newWebhook = await webhookModel.create({ sourceUrl, callbackUrl, events });

        res.status(201).json({
            message: 'Webhook subscription created',
            webhook: newWebhook
        });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error', error: err.message });
    }
};

const getAllWebhooks = async (req, res) => {
    const webhooks = await webhookModel.find({ active: true });
    res.json(webhooks);
};

const handleIncomingEvent = async (req, res) => {
    try {
        const { eventType, payload } = req.body;

        const webhooks = await webhookModel.find({ active: true });

        webhooks.forEach(async (hook) => {
            try {
                await retryQueue.sendEvent(hook.callbackUrl, { eventType, payload });
            } catch (err) {
                console.error(`Failed to send to ${hook.callbackUrl}:`, err.message);
            }
        });

        res.status(200).json({ message: 'Events dispatched' });
    } catch (err) {
        res.status(500).json({ message: 'Error handling event', error: err.message });
    }
};

const cancelWebhook = async (req, res) => {
    const { id } = req.params;
    const webhook = await webhookModel.findByIdAndUpdate(id, { active: false }, { new: true });
    if (!webhook) return res.status(404).json({ message: 'Webhook not found' });
    res.json({ message: 'Webhook cancelled', webhook });
};

const receiveWebhook = async (req, res) => {
    const { eventType, payload } = req.body;

    const subscriptions = await WebhookSubscription.find({ eventTypes: eventType });

    subscriptions.forEach(sub => {
        // Send to message broker here (e.g., RabbitMQ)
        publishToQueue('webhookEvents', { callbackUrl: sub.callbackUrl, payload });
    });

    res.status(200).json({ message: 'Webhook received and queued.' });
};

const getWebhookLogs = async (req, res) => {
    try {
        const { subscriptionId } = req.params;
        const logs = await webhookLogModel.find({ subscriptionId }).sort({ createdAt: -1 });

        res.status(200).json({ logs });
    } catch (err) {
        console.error('Failed to fetch logs:', err.message);
        res.status(500).json({ message: 'Error fetching logs', error: err.message });
    }
};

module.exports = {
    createWebhook,
    triggerWebhookEvent,
    getAllWebhooks,
    handleIncomingEvent,
    cancelWebhook,
    receiveWebhook,
    getWebhookLogs,
};