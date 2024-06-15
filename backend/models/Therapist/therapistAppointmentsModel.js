const mongoose = require("mongoose");

const therapistAppointmentsModel = mongoose.Schema(
    {
        clientName: {
            type: String,
            required: [true, "please add client name"]
        },
        appointmentTime: {
            type: Date,
            required: [true, "please add joining date"]
        },
        therapyType: {
            type: String,
            required: [true, "please add therapy type"]
        },
        Amount: {
            type: Number,
            required: [true, "please add Amount type"]
        },
        Status: {
            type: String,
            required: [true, "please add Status type"]
        },
        reason: {
            type: String,
            required: [true, "please add reason"]
        }
    },
)

const therapistAppointments = mongoose.model("therapistAppointment", therapistAppointmentsModel);
module.exports = therapistAppointments;