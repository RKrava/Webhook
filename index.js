const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    console.log('Received Webhook:', req.body);
    if (req.body?.paymentsystem === 'custom.fondy') {
        req.body.payments = {status: 'paid'}
    }
    axios.post('https://integrations.keycrm.app/NWUwN2RkZmM3ZjE1ZmQ1NjFlMDQ3ZTQyYWY3YjY2MDRhODhhNjM2Yg/order', req.body)
    res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Webhook receiver listening on port ${PORT}`);
});
