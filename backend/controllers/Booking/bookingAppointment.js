const Appointments = require("../../models/User/AppointmentModel");


const HandleAppointments = async (req, res) => {
  const {
    Therapist_id,
    Therapist_Name,
    Client_Id,
    Client_Name,
    Therapy_Type,
    Reason,
    Price,
    Status,
  } = req.body;

  // Validate required fields
  if (
    !Therapist_id ||
    !Therapist_Name ||
    !Client_Id ||
    !Client_Name ||
    !Therapy_Type
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await Appointments.create({
      Therapist_id,
      Therapist_Name,
      Client_Id,
      Client_Name,
      Therapy_Type,
      Reason,
      Price,
      Status,
    });
    return res
      .status(201)
      .json({ message: "Appointment created successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Internal server error", details: err.message });
  }
};

module.exports = HandleAppointments;
