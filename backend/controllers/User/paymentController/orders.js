const razorpay = require('../../../config/razorpay');
const crypto = require('crypto');
const { Payment }= require('../../../models/User/paymentModel')

function generateInvoiceNumber() {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (`0${date.getMonth() + 1}`).slice(-2); 
    const day = (`0${date.getDate()}`).slice(-2);
    const timestamp = date.getTime().toString().slice(-4);
    const randomPart = Math.floor(10 + Math.random() * 90); 
    const invoiceNumber = `${year}${month}${day}${timestamp}${randomPart}`;
    return invoiceNumber;
};

const newOrder = async (req, res) => {
    try {
        const { amount, currency, clientName, clientEmail, clientId, therapistName, therapistId, appointmentType, therapyType } = req.body;

        const invoiceNumber = generateInvoiceNumber();
        const invoiceOptions = {
            type: 'invoice',
            description: `Invoice for ${appointmentType} Session`,
            customer: {
                name: clientName,
                email: clientEmail
            },
            line_items: [
                {
                    name: therapyType,
                    description: `${therapistName} - ${appointmentType}`,
                    amount: amount * 100,
                    currency: currency,
                    quantity: 1
                }
            ],
            currency: currency,
            invoice_number: invoiceNumber,
            // terms: 'These are the terms and conditions.',
            notes: {
                therapistName:therapistName,
                appointmentType:appointmentType,
                therapyType:therapyType
            },
            partial_payment: false,
            // expire_by : Math.floor(Date.now() / 1000) + 3600,
            sms_notify: 0,
            email_notify: 0,
            
        };
        const invoice = await razorpay.invoices.create(invoiceOptions);
        const payment = new Payment({

            invoiceId: invoice.id,
            orderId: invoice.order_id,
            receipt: invoice.receipt,
            amount: invoice.amount,
            invoiceUrl: invoice.short_url,
            clientName,
            clientId,
            therapistName,
            therapistId,
            appointmentType,
            therapyType,
        });

        await payment.save();
        res.json({invoice_id: invoice.id ,
                order_id: invoice.order_id,
                receipt : invoice.receipt, 
                amount : invoice.amount,
                currency : invoice.currency
            });
    } catch (error) {
        res.status(500).json({ success: false, message : 'Internal server Error' ,error: error.message });
    }
};

//To verify payment signature 

const verifyPayment = async (req, res) => {

    const {razorpay_payment_id, razorpay_invoice_id, razorpay_invoice_status,  razorpay_invoice_receipt ,razorpay_signature } = req.body;

    if (!razorpay_payment_id || !razorpay_invoice_id || !razorpay_invoice_status ||  !razorpay_invoice_receipt  || !razorpay_signature) {
        return res.status(400).json({ success: false, message: 'Invalid Request  : Missing required fields' });
    }
    const body = razorpay_invoice_id + '|' +razorpay_invoice_receipt + '|' +razorpay_invoice_status + '|' + razorpay_payment_id
    try{
        const expectedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');

        const isAuthentic = expectedSignature === razorpay_signature;

        const payment = await Payment.findOneAndUpdate(
            { invoiceId: razorpay_invoice_id },
            { paymentId: razorpay_payment_id, status: isAuthentic ? 'completed' : 'failed', razorpaySignature : razorpay_signature},
            { new: true }
        );
        if (!payment) {
            return res.status(404).json({ success: false, message: 'Payment not found' });
        }
        if (isAuthentic) {
            const invoiceUrl = payment.invoiceUrl;
            res.json({ success: true, invoiceUrl, message: 'Payment verified successfully' });
        } else {
            res.status(400).json({ success: false, message: 'Payment verification failed' });
        }
    }catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error',error });
    }
};

const updatePaymentStatus = async (req, res) => {

    const { order_Id, payment_Id } = req.body;
    if (!order_Id || !payment_Id) {
        return res.status(400).json({ success: false, message: 'Missing required fields: order_Id, payment_Id' });
    }
    try {
        const payment = await razorpay.payments.fetch(payment_Id);

        if (payment.order_id!==order_Id){
            return res.status(400).json({ success: false, message:'Invalid Request'});
        }
        let status;
        switch (payment.status) {
            case 'captured':
                status = 'completed';
                break;
            case 'failed':
                if (payment.error_code === 'BAD_REQUEST_ERROR' && payment.error_reason === 'payment_cancelled') {
                    status = 'cancelled';
                } else {
                    status = 'failed';
                }
                break;
            default:
                status = payment.status;
            }
        const update = await Payment.findOneAndUpdate(
            { orderId: order_Id },
            { paymentId: payment_Id, status: status },
            { new: true }
        );

      if (!update) {
        return res.status(404).json({ success: false, message: 'Payment not found' });
      }
      res.json({ success: true, message: 'Payment details saved successfully'});
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error',error: error.message  });
    }
  };


module.exports = {
    newOrder,
    verifyPayment,
    updatePaymentStatus
}