const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logout,
  getUser,
  upcomingGroups,
} = require("../controllers/User/userController");
const { protect } = require("../middleware/authMiddleware");


const {
  getIndividualBooking,
} = require("../controllers/Booking/BookingSlotsController");
const {
  getTherapistById,
  getAllTherapists,
} = require("../controllers/Booking/therapistDetails");
const {
  getPatientById,
  getAllPatients,
} = require("../controllers/Booking/patientDetails");
const HandleAppointments = require("../controllers/Booking/bookingAppointment");

const { getGroupTherapySessions, createGroupTherapySession } = require("../controllers/User/groupTherapy");
const { getSupportGroupSessions, createSupportGroupSession } = require("../controllers/User/supportgroup");
const { getAllAdminVideos } = require('../controllers/Admin/adminVideoController')


router.get("/Grouptherapy", getGroupTherapySessions);
router.post("/Grouptherapy", createGroupTherapySession);

router.get("/Supportgroup", getSupportGroupSessions);
router.post("/Supportgroup", createSupportGroupSession);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/getUser", protect, getUser);
router.get("/upcomingGroups", upcomingGroups);

router.get("/booking/getAvailableSlotsByTherapist/:id", getIndividualBooking);
router.get("/booking/getTherapistDetails/find/:id", getTherapistById);
router.get("/booking/getTherapistDetails", getAllTherapists);
router.get("/booking/getPatientDetails/:id", getPatientById);
router.get("/booking/getPatientDetails", getAllPatients);
router.post("/booking/appointment", HandleAppointments);


router.post("/register",registerUser);
router.post("/login",loginUser)
router.get("/logout",logout)
router.get("/getUser",protect,getUser)
router.get("/upcomingGroups",upcomingGroups);
router.route("/adminvideos").get(getAllAdminVideos);

module.exports=router;
