const expressAsyncHandler = require("express-async-handler");
const Appointment = require("../models/appointment");
const User = require("../models/User");

const requestAppointment = expressAsyncHandler(async (req, res) => {
  try {
    const { requestedTo, date, time, remarks, reason } = req.body;
    const requestingUser = req.user;

    // check if the requesting usre is muturage
    if (req.user.role !== "Umuturage") {
      return res.status(403).json({ message: "Invalid access " });
    }

    // check if requstedT user exists
    const requestedToUser = await User.findOne({
      _id: requestedTo,
      role: { $ne: "Umuturage" },
    });

    if (requestedToUser && requestingUser.role === "Umuturage") {
      const appointment = new Appointment({
        requester: requestingUser._id,
        requestedTo: requestedToUser._id,
        remarks,
        reason,
        date,
        time,
        status: "pending",
      });
      await appointment.save();
      return res.status(201).json({ message: "Arequest created", appointment });
    }
    // create the appointments
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error " });
  }
});

const approveAppointment = expressAsyncHandler(async (req, res) => {
  const appointmentId = req.params.id;
  console.log(appointmentId);
  const { date, remarks } = req.body;

  if (!date) {
    res.status(400).send({ message: "Missing required fields." });
  }

  // check the requesting user is the requested to
  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      res.status(404).send({ message: "Appointment not found." });
    }
    if (req.user._id.toString() !== appointment.requestedTo.toString()) {
      res.status(403).send({ message: "Unauthorized." });
    }
    appointment.status = "approved";
    appointment.remarks = remarks;
    appointment.date = date;
    await appointment.save();

    const requestedByUser = await User.findById(appointment.requester);

    if (!requestedByUser) {
      res.status(404).send({ message: "User not found." });
    }
    requestedByUser.appointments = requestedByUser.appointments || [];
    requestedByUser.appointments.push(appointment);
    await requestedByUser.save();
    res.send({ message: "Appointment approved.", requestedByUser });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error." });
  }
});

const getAppointments = expressAsyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find({ requester: req.user._id });
    console.log(appointments);
    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error fetching data" });
  }
});

const getAppointmentsRequestedTo = expressAsyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.find({ requestedTo: req.user._id });
    res.status(200).send(appointments);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

module.exports = {
  getAppointments,
  getAppointmentsRequestedTo,
  approveAppointment,
  requestAppointment,
};
