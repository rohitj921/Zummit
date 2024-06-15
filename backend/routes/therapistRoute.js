const express = require("express");
const router = express.Router();

const { loginTherapist, logoutTherapist, getTherapist } = require("../controllers/Admin/therapistCredentials/createCredentials");
const { therapistAppointmentLists, createtherapistAppointmentLists } = require("../controllers/Therapist/therapistAppointmentsController.js")

router.route("/loginTherapist").post(loginTherapist);
router.route("/logoutTherapist").get(logoutTherapist);
router.route("/getTherapist").get(getTherapist);

router.route("/createtherapistAppointment").post(createtherapistAppointmentLists);
router.route("/gettherapistAppointmentLists").get(therapistAppointmentLists);



module.exports = router;
