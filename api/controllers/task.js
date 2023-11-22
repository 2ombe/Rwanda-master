const expressAsyncHandler = require("express-async-handler");
const Task = require("../models/task");
const createTask = expressAsyncHandler(async (req, res) => {
  const { taskName, description, assignedTo, deadline } = req.body;
  const task = new Task({
    taskName,
    description,
    assignedTo,
    createdBy: req.user,
    deadline: new Date(deadline),
  });
  try {
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const getTasks = expressAsyncHandler(async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: "desc" }).exec();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const updateTask = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  try {
    const task = await Task.findById(id).exec();
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    task.completed = completed;
    task.updatedAt = new Date();
    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { createTask, getTasks, updateTask };
