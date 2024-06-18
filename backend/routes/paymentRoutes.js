
const express = require('express');
const router = express.Router();

const {
    newOrder,
    verifyPayment
} = require("../controllers/Payment/ordersController")

const {
    getAllPayments,
    getPaymentById,
    getOrderById,
    getbyClientId,
    getByTherapistId
} = require("../controllers/Payment/paymentDetails");


router.post('/newOrder', newOrder);
router.post('/verify', verifyPayment);


router.get('/getAllPayments', getAllPayments);
router.get('/getPaymentById/:id',getPaymentById);
router.get('/getOrderById/:orderId', getOrderById);
router.get('/getbyClientId/:clientId', getbyClientId);
router.get('/getByTherapistId/:therapistId', getByTherapistId);

//Delete Payment Records by Order ID
// router.delete('/deleteOrder/:orderId', deleteOrder)


module.exports = router;

