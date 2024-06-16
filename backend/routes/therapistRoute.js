const express = require("express");
const router = express.Router();

const { loginTherapist, logoutTherapist, getTherapist } = require("../controllers/Admin/therapistCredentials/createCredentials");
const { therapistAppointmentLists, createtherapistAppointmentLists } = require("../controllers/Therapist/therapistAppointmentsController.js")
const{therapistGroupLists,createtherapistGroupLists}=require("../controllers/Therapist/therapistGroupsController.js")

router.route("/loginTherapist").post(loginTherapist);
router.route("/logoutTherapist").get(logoutTherapist);
router.route("/getTherapist").get(getTherapist);

router.route("/createtherapistAppointment").post(createtherapistAppointmentLists);
router.route("/gettherapistAppointmentLists").get(therapistAppointmentLists);
router.route("/createtherapistGroup").post(createtherapistGroupLists);
router.route("/gettherapistGroupLists").get(therapistGroupLists);



module.exports = router;
