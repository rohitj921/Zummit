const Payment = require('../../models/Payment/paymentModel')


// Get all Payment records

const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find();
        if(!payments){
            return res.status(404).json({ message: 'Payment records not found' });
        }
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get Payment by ID

const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if(!payment){
            return res.status(404).json({ message: 'Payment record not found' });
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Get Order Details by ID

const getOrderById = async (req, res) => {
    try {
        const payment = await Payment.findOne({ orderId: req.params.orderId });
        if(!payment){
            return res.status(404).json({ message: 'Payment record not found for this Order ID' });
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Payment Records by ClientID

const getbyClientId = async (req, res) => {
    try {
        const payment = await Payment.findOne({ clientId: req.params.clientId });
        if(!payment){
            return res.status(404).json({ message: 'Payment records not found for this Client ID' });
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Payment Records by TherapistID

const getByTherapistId = async (req, res) => {
    try {
        const payment = await Payment.findOne({ therapistId: req.params.therapistId });
        if(!payment){
            return res.status(404).json({ message: 'Payment records not found for this Therapist ID' });
        }
        res.json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//Delete Payment Records by Order ID

// const deleteOrder = async (req, res) => {
//     try {
//         const payment = await Payment.findOneAndDelete({ orderId: req.params.orderId });
//         if (payment) {
//             res.json({ success: true, message: 'Payment record deleted successfully', payment });
//         } else {
//             res.status(404).json({ success: false, message: 'Payment record not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Error deleting payment record', error: error.message });
//     }
// };

module.exports = {
    getAllPayments,
    getPaymentById,
    getOrderById,
    getbyClientId,
    getByTherapistId
}

