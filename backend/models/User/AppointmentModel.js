const mongoose = require("mongoose");

const AppointmentSchema = mongoose.Schema({
  Therapist_id: {
    type: String,
    required: true,
  },
  Therapist_Name: {
    type: String,
    required: true,
  },
  Client_Id: {
    type: String,
    required: true,
  },
  Client_Name: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
  Time: {
    type: String,
    default: new Date().toLocaleTimeString(),
  },
  Therapy_Type: {
    type: String,
    require: true,
  },
  Reason: {
    type: String,
    default: null,
  },
  Price: {
    type: Number,
    required: true,
    default: 499,
  },
  Status: {
    type: String,
    required: true,
    default: "pending",
  },
});

const Appointments = mongoose.model("Appointments", AppointmentSchema);

module.exports = Appointments;
