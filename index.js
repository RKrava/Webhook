const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    console.log('Received Webhook:', req.body);
    console.log('Received Webhook:', req.body?.payment?.products);
    console.log('Received Webhook:', req.body?.payment?.products?.options);
    if (req.body?.paymentsystem === 'custom.fondy') {
        req.body.payments = {status: 'paid'}
    }
    res.status(200).send('OK');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Webhook receiver listening on port ${PORT}`);
    // axios.post('https://integrations.keycrm.app/NWUwN2RkZmM3ZjE1ZmQ1NjFlMDQ3ZTQyYWY3YjY2MDRhODhhNjM2Yg/order', {
    //     phone: '+380 (12) 312-31-23',
    //     email: 'brazhnik.sasha85@gmail.com',
    //     comment: 'asdasdad',
    //     withoutCallback: 'yes',
    //     paymentsystem: 'custom.fondy',
    //     payment: {
    //         sys: 'custom.fondy',
    //         systranid: '0',
    //         orderid: '1227634018',
    //         products: [ [Object] ],
    //         amount: '71.02',
    //         subtotal: '1',
    //         delivery: 'Нова Пошта',
    //         delivery_price: 70.02,
    //         delivery_fio: 'asdasda',
    //         delivery_address: 'UA: Point: Київ, Пирогівський шлях, 135 (Відділення №1: вул. Пирогівський шлях, 135)01001, Київ',
    //         delivery_comment: '',
    //         delivery_pickup_id: '1',
    //         delivery_zip: '01001'
    //     },
    //     formid: 'form642680077',
    //     formname: 'Cart'
    // })
    //
    // axios.post('https://openapi.keycrm.app/v1/order', {
    //     "source_id": 3,
    //     "ordered_at": new Date(Date.now()).getFullYear() + '-' + new Date(Date.now()).getDay().toString().padStart(2, '0') + '-' + new Date(Date.now()).getMonth().toString().padStart(2, '0') + ' ' + new Date(Date.now()).getHours().toString().padStart(2, '0') + ':' + new Date(Date.now()).getMinutes().toString().padStart(2, '0') + ':' + new Date(Date.now()).getSeconds().toString().padStart(2, '0'),
    //     "buyer": {
    //         "full_name": "John Doe123",
    //         "email": "john.doe@mail.app",
    //         "phone": "+1 555-234-1234"
    //     },
    //     "shipping": {
    //         "delivery_service_id": 1,
    //         "shipping_service": "Нова Пошта",
    //         "shipping_receive_point": "Склад #12",
    //         "recipient_full_name": "Ann Doe",
    //         "recipient_phone": "+1 555-234-7777",
    //     },
    //     "products": [
    //         {
    //             "sku": "001-242",
    //             "price": 124.5,
    //             "quantity": 1,
    //             "unit_type": "шт",
    //             "name": "Iphone XS max 256gb",
    //             "properties": [
    //                 {
    //                     "name": "Color",
    //                     "value": "Gold"
    //                 }
    //             ]
    //         }
    //     ],
    //     "payments": [
    //         {
    //             "payment_method_id": 2,
    //             "payment_method": "Apple Pay",
    //             "amount": 123.5,
    //             "description": "Авансовий платіж",
    //             "payment_date": "2021-02-21 14:44:00",
    //             "status": "paid"
    //         }
    //     ]
    // },{
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Accept': 'application/json',
    //         'Cache-Control': 'no-cache',
    //         'Pragma': 'no-cache',
    //         'Authorization':  'Bearer OWJhMTkyNGFlNDQ0YzQ3NjhiYjU0YzFmYzQxMGVmYmIzMzEwMTBlYQ'
    //     }
    // }).then((resp) => {console.log(resp.data)})
});
