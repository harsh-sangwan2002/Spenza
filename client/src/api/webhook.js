import axiosInstance from '.';

export const createWebhook = (data) =>
    axiosInstance.post('/webhooks', data);

export const getWebhooks = () =>
    axiosInstance.get('/webhooks');

export const deleteWebhook = (id) =>
    axiosInstance.delete(`/webhooks/${id}`);

export const triggerWebhook = (eventPayload) =>
    axiosInstance.post('/webhooks/trigger', eventPayload);

export const getWebhookLogs = (subscriptionId) =>
    axiosInstance.get(`/webhooks/logs/${subscriptionId}`);
