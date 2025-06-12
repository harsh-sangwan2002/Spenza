// routes/webhook.route.js

const express = require('express');
const webhookRouter = express.Router();

const {
    createWebhook,
    getAllWebhooks,
    handleIncomingEvent,
    cancelWebhook,
    triggerWebhookEvent,
    getWebhookLogs
} = require('../controllers/webhooks.controller');

const authMiddleware = require('../middlewares/authMiddleware');

// Create a webhook subscription
webhookRouter.post('/', createWebhook);

// Trigger a webhook manually (used for testing)
webhookRouter.post('/trigger', triggerWebhookEvent);

// Get all webhooks for the logged-in user
webhookRouter.get('/', getAllWebhooks);

// Receive a webhook event from an external service
webhookRouter.post('/event', handleIncomingEvent);

// Cancel a webhook subscription
webhookRouter.delete('/:id', cancelWebhook);

// Get logs for a specific webhook subscription
webhookRouter.get('/logs/:subscriptionId', getWebhookLogs);

module.exports = webhookRouter;