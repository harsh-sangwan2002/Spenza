const mongoose = require('mongoose');

const webhookLogSchema = new mongoose.Schema({
    subscriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'webhooks',
    },
    eventType: String,
    payload: mongoose.Schema.Types.Mixed,
    status: {
        type: String,
        enum: ['pending', 'success', 'failed', 'delivered'],
        required: true,
    },
    response: mongoose.Schema.Types.Mixed,
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('webhookLogs', webhookLogSchema);
