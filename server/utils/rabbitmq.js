// utils/rabbitmq.js

const amqp = require('amqplib');

let channel;

const connect = async () => {
    try {
        const connection = await amqp.connect('amqp://localhost');
        channel = await connection.createChannel();
        console.log('✅ Connected to RabbitMQ');

        // Assert the queue
        await channel.assertQueue('webhook_events', { durable: true });

        // ⏬ Start the worker after connection
        require('../workers/webhookWorker').start(channel); // Pass the channel to reuse it

    } catch (err) {
        console.error('❌ Failed to connect to RabbitMQ:', err.message);
    }
};

const getChannel = () => channel;

// ✅ Publish to queue
const publishToQueue = async (queueName, data) => {
    if (!channel) {
        throw new Error('RabbitMQ channel is not initialized');
    }

    const success = channel.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(data)),
        { persistent: true } // Ensures the message survives broker restarts
    );

    if (!success) {
        console.warn('⚠️ Failed to enqueue message');
    } else {
        console.log(`📤 Message enqueued to ${queueName}`);
    }
};

module.exports = {
    connect,
    getChannel,
    publishToQueue
};
