const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    console.log('Received Webhook:', req.body);
    console.log('Received Webhook:', req.body?.payment?.products);
    // if (req.body?.paymentsystem === 'custom.fondy') {
    //     req.body.payments = {status: 'paid'}
    // }

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()+3).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

    const dataTotal = {
        "buyer_comment": req?.body?.comment,
        "source_id": 3,
        "ordered_at": formattedDate,
        "buyer": {
            "full_name": req?.body?.payment?.delivery_fio,
            "email": req?.body?.email
        },
        "shipping": {
            "delivery_service_id": 1,
            "shipping_service": "Нова Пошта",
            "shipping_receive_point": req?.body?.payment?.delivery_address,
            "recipient_full_name": req?.body?.payment?.delivery_fio,
            "recipient_phone": req?.body?.phone,
        },
        "products": req.body?.payment?.products.map((item) => {
            return {
                "sku": item?.sku,
                "name": item?.name,
                "unit_type": "шт",
                "price": item?.price,
                "quantity": item?.quantity
            }
        }),
        "payments": [
            {
                "payment_method_id": req?.body?.paymentsystem === 'cash' ? 6 : 10,
                "payment_method": req?.body?.paymentsystem,
                "amount": req?.body?.payment?.amount,
                "payment_date": formattedDate,
                "status": req?.body?.paymentsystem === 'cash' ? "notpaid" : "paid"
            }
        ]
    }
    axios.post('https://openapi.keycrm.app/v1/order', dataTotal,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Authorization':  'Bearer OWJhMTkyNGFlNDQ0YzQ3NjhiYjU0YzFmYzQxMGVmYmIzMzEwMTBlYQ'
        }
    }).then((resp) => {console.log(resp.data); }).catch((error) => {console.log(error)})

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

});
