const express = require("express");
const router = express.Router();
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

router.get("/getAvailableSlotsByTherapist/:id", getIndividualBooking);
router.get("/getTherapistDetails/find/:id", getTherapistById);
router.get("/getTherapistDetails", getAllTherapists);
router.get("/getPatientDetails/:id", getPatientById);
router.get("/getPatientDetails", getAllPatients);
router.post("/appointment", HandleAppointments);

module.exports = router;
