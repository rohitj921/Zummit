const asyncHandler = require("express-async-handler");
const therapistAppointments = require("../../models/Therapist/therapistAppointmentsModel.js");

const therapistAppointmentLists = asyncHandler(async (req, res) => {
    try {
        const therapistAppointment = await therapistAppointments.find({});
        res.status(200).json({
            success: true,
            therapistAppointmentData: therapistAppointment,
            message: "Appointments list "
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

const createtherapistAppointmentLists = asyncHandler(async (req, res) => {

    const { therapistAppointmentData } = req.body;
    if (!therapistAppointmentData) {
        return res.status(402).json({ message: "Please fill all fileds" });
    }
    try {
        const therapistAppointment = new therapistAppointments(therapistAppointmentData);
        await therapistAppointment.save();
        res.status(201).json({
            success: true,
            message: "Therapist Appointment created successfully",
            therapistAppointmentData: therapistAppointment
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = { therapistAppointmentLists, createtherapistAppointmentLists };