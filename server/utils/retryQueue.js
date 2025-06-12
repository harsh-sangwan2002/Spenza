const axios = require('axios');

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

const sendEvent = async (url, data, retries = 0) => {
    try {
        await axios.post(url, data);
    } catch (err) {
        if (retries < MAX_RETRIES) {
            console.log(`Retry ${retries + 1} for ${url}`);
            setTimeout(() => {
                exports.sendEvent(url, data, retries + 1);
            }, RETRY_DELAY);
        } else {
            console.error(`Failed after ${MAX_RETRIES} retries:`, err.message);
            throw err;
        }
    }
};

module.exports = {
    sendEvent
};