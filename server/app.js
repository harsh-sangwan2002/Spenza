const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', // your frontend port
    credentials: true                // allows cookies
}));

const connectDB = require('./utils/db');
const userRouter = require('./routes/user.route');
const webhookRouter = require('./routes/webhook.route');
const webhookController = require('./controllers/webhooks.controller');
const verifySignature = require('./middlewares/verifySignature');
const { connect } = require('./utils/rabbitmq');

app.use('/api/users', userRouter);
app.use('/api/webhooks', webhookRouter);
app.post('/api/webhook/event', verifySignature, webhookController.receiveWebhook);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    console.log(`Backend server is running on port: ${PORT}`);
    await connectDB();
    connect();
})