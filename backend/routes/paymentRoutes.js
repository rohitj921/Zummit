
const express = require('express');
const router = express.Router();
const razorpay = require('../services/razorpayService');
const crypto = require('crypto');
const Payment = require('../models/Payment/paymentModel')

router.post('/order', async (req, res) => {
    try {
        const { amount, currency,clientName, therapistName} = req.body;
        const options = {
            amount: amount * 100,
            currency: currency,
            receipt: crypto.randomBytes(16).toString('hex'),
        };
        const order = await razorpay.orders.create(options);
        const payment = new Payment({
            orderId: order.id,
            amount: order.amount,
            clientName,
            therapistName
        });

        await payment.save(); 
        res.json(order)
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/verify', async (req, res) => {
    const { order_id, payment_id, signature } = req.body;
    const body = order_id + '|' + payment_id;
    
    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest('hex');
    
    const isAuthentic = expectedSignature === signature;
    
    if (isAuthentic) {
        const payment = await Payment.findOneAndUpdate(
            { orderId: order_id },
            { paymentId: payment_id, status: 'completed' },
            { new: true }
        );
        res.json({ success: true, payment ,message: 'Payment verified successfully' });
    } else {
        res.status(400).json({ success: false, message: 'Payment verification failed' });
    }
});
   
router.get('/payments', async (req, res) => {
    try {
        const payments = await Payment.find();
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/payment/:id', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
