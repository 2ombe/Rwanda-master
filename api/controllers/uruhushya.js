const expressAsyncHandler = require("express-async-handler");
const Event = require("../models/uruhusa");

const createEvent = expressAsyncHandler(async (req, res) => {
  try {
    const {
      name,
      location,
      host,
      startDate,
      endDate,
      startTime,
      impamvu,
      endTime,
    } = req.body;

    const event = new Event({
      name,
      impamvu,
      location,
      host,
      startDate,
      endDate,
      startTime,
      endTime,
    });

    await event.save();

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const updateEvent = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      location,
      host,
      startDate,
      endDate,
      impamvu,
      startTime,
      endTime,
    } = req.body;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.name = name;
    event.location = location;
    event.host = host;
    event.startDate = startDate;
    event.endDate = endDate;
    event.startTime = startTime;
    event.impamvu = impamvu;
    event.endTime = endTime;

    await event.save();

    res.json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const getAllEvents = expressAsyncHandler(async (req, res) => {
  try {
    const events = await Event.find();

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = { createEvent, getAllEvents, updateEvent };
