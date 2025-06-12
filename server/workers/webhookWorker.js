const axios = require('axios');
const webhookModel = require('../models/webhook.model');
const webhookLog = require('../models/webhookLog.model');

const start = (channel) => {
    channel.consume('webhook_events', async (msg) => {
        if (msg !== null) {
            try {
                const data = JSON.parse(msg.content.toString());
                const { subscriptionId, eventType, payload } = data;

                const subscription = await webhookModel.findById(subscriptionId);

                if (subscription && subscription.active && subscription.events.includes(eventType)) {
                    try {
                        const response = await axios.post(subscription.callbackUrl, {
                            eventType,
                            payload,
                        }, {
                            headers: {
                                Authorization: `Bearer ${process.env.WEBHOOK_AUTH_TOKEN}`,
                            },
                            timeout: 5000, // optional: timeout after 5s
                        });

                        console.log(`✅ Webhook delivered to ${subscription.callbackUrl}`);

                        // Log successful delivery
                        await webhookLog.create({
                            subscriptionId,
                            callbackUrl: subscription.callbackUrl,
                            eventType,
                            payload,
                            status: 'delivered',
                            responseCode: response.status,
                            responseBody: response.data
                        });

                    } catch (err) {
                        console.error(`❌ Delivery to ${subscription.callbackUrl} failed: ${err.message}`);

                        // Log failure
                        await WebhookLog.create({
                            subscriptionId,
                            callbackUrl: subscription.callbackUrl,
                            eventType,
                            payload,
                            status: 'failed',
                            responseCode: err.response?.status || 500,
                            responseBody: err.response?.data || { error: err.message }
                        });
                    }
                } else {
                    console.warn(`⚠️ Subscription ${subscriptionId} is inactive or doesn't handle ${eventType}`);
                }

                channel.ack(msg);
            } catch (err) {
                console.error('❌ Worker failed:', err.message);
                channel.nack(msg, false, false); // Drop the message (or send to DLQ if configured)
            }
        }
    });

    console.log('📩 Worker is consuming webhook_events');
};

module.exports = {
    start,
};
