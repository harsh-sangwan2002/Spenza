const mongoose = require('mongoose');

const webhookSubscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    sourceUrl: String,
    callbackUrl: String,
    eventTypes: [String], // e.g., ['order.created', 'order.cancelled']
    createdAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('webhookSubscriptions', webhookSubscriptionSchema);
