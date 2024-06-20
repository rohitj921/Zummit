const express=require("express")
const router=express.Router();
const {registerUser, loginUser, logout, getUser,upcomingGroups}=require("../controllers/User/userController");
const { protect } = require("../middleware/authMiddleware");
const { getGroupTherapySessions, createGroupTherapySession } = require("../controllers/User/groupTherapy");
const { getSupportGroupSessions, createSupportGroupSession } = require("../controllers/User/supportgroup");
const {newOrder, verifyPayment } = require("../controllers/User/paymentController/orders")
const { getAllPayments, getPaymentById, getOrderById, getbyClientId, getByTherapistId } = require("../controllers/User/paymentController/paymentDetails");


router.get("/Grouptherapy", getGroupTherapySessions);           
router.post("/Grouptherapy", createGroupTherapySession);

router.get("/Supportgroup", getSupportGroupSessions);
router.post("/Supportgroup", createSupportGroupSession);


router.post('/newOrder', newOrder);
router.post('/verifyPayment', verifyPayment);

router.get('/getAllPayments', getAllPayments);
router.get('/getPaymentById/:id',getPaymentById);
router.get('/getOrderById/:orderId', getOrderById);
router.get('/getbyClientId/:clientId', getbyClientId);
router.get('/getByTherapistId/:therapistId', getByTherapistId);
//Delete Payment Records by Order ID
// router.delete('/deleteOrder/:orderId', deleteOrder)

router.post("/register",registerUser);
router.post("/login",loginUser)
router.get("/logout",logout)
router.get("/getUser",protect,getUser)
router.get("/upcomingGroups",upcomingGroups);
module.exports=router;
