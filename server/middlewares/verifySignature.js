const crypto = require('crypto');

module.exports = function (req, res, next) {
    const signature = req.headers['x-webhook-signature'];
    const payload = JSON.stringify(req.body);
    const secret = process.env.WEBHOOK_SECRET;

    const expectedSig = crypto
        .createHmac('sha256', secret)
        .update(payload)
        .digest('hex');

    if (signature !== expectedSig) {
        return res.status(401).json({ message: 'Invalid signature' });
    }

    next();
};
