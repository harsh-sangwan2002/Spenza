const mongoose = require('mongoose');

const webhookSchema = new mongoose.Schema({
    sourceUrl: {
        type: String,
        required: true
    },
    callbackUrl: {
        type: String,
        required: true
    },
    events: {
        type: [String],
        default: []
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

const webhookModel = mongoose.model('webhooks', webhookSchema);
module.exports = webhookModel;